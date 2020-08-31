import { useState, useMemo } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { toast } from 'react-toastify'
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import Input from 'components/UI/Antd/Input/Input';
import Button from 'components/UI/Antd/Button/Button';
import Table from 'components/UI/Antd/Table/Table';
import Tag from 'components/UI/Antd/Tag/Tag';
import {
  GET_HOTEL_MANAGER_COUPONS,
} from 'apollo-graphql/query/query';
import {
  DELETE_COUPONS,
} from 'apollo-graphql/mutation/mutation';
import Loader from 'components/Loader/Loader';

const CouponTable = () => {
  const [checkedBox, setCheckedBox] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [deleteCoupons] = useMutation(DELETE_COUPONS, {
    onCompleted: () =>{
      setTimeout(()=>{
        setLoadingButton(false);
        setCheckedBox([]);
      }, 3000)
      toast.success('Delelted selection',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
    },
    refetchQueries:()=>[{
      query: GET_HOTEL_MANAGER_COUPONS,
    }]

  })
  const { data, loading, error } = useQuery(GET_HOTEL_MANAGER_COUPONS,{
    fetchPolicy: 'cache-and-network',
  });

  const dataMemo = useMemo(()=> {
    // console.log("changed")
    if (loading || error) return <Loader />;
    return data.getHotelManagerCoupons
  },[loading,error,data])

  if (loading) return <Loader />;
  if (error) return `Error ${error}`;
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => { handleSearch(selectedKeys, confirm, dataIndex); }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <>
          <Button
            type="primary"
            onClick={() => { handleSearch(selectedKeys, confirm, dataIndex); }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => { handleReset(clearFilters);} } size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => searchInput.select(), 100);
    //   }
    // },
    render: text =>
    searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  async function handleDelelteCoupons(){
    setLoadingButton(true);
    try{
      await deleteCoupons({
        variables: {
          id: checkedBox,
        }
      })
    }
    catch(e) {
      toast.error(e.message,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const rowSelection = {
    selectedRowKeys: checkedBox,
    onChange: (selectedRowKeys) => {
      // console.log('selectedRows: ', selectedRowKeys);
      setCheckedBox(selectedRowKeys);
    },
  };
  //   Coupon type: 1 - %, 2 - Number, 3 - No
  const columns = [
    {
      title: 'Coupon Name',
      dataIndex: 'couponName',
      key: 'couponName',
      sorter: (a, b) => a.couponName.localeCompare(b.couponName),
      ...getColumnSearchProps('couponName'),
    },
    {
      title: 'Coupon Discount Type',
      dataIndex: 'couponType',
      key:'couponType',
      sorter: (a, b) => a.couponType - b.couponType,
      onFilter: (value, record) => record.couponType === value,
      filters: [
        {
          text: '% DISCOUNT',
          value: 1,
        },
        {
          text: 'NUMBER DISCOUNT',
          value: 2,
        },
      ],
      render: (couponType) => (
        <>
          <Tag color={couponType === 1 ? 'green' : 'geekblue'}>
            {couponType === 1 ? '% DISCOUNT' : 'NUMBER DISCOUNT'}
          </Tag>
        </>
      ),
    },
    {
      title: 'Coupon Value',
      dataIndex: 'couponValue',
      key:'couponValue',
      sorter: (a, b) => a.couponType - b.couponType,

    },
    {
      title: 'Coupon Quantity',
      dataIndex: 'couponQuantity',
      key:'couponQuantity',
      sorter: (a, b) => a.couponType - b.couponType,
    },
    {
      title: 'Coupon Start Date',
      dataIndex: 'couponStartDate',
      key: 'couponStartDate',
      sorter: (a, b) => moment(a.couponStartDate).unix() - moment(b.couponStartDate).unix(),
    },
    {
      title: 'Coupon End Date',
      dataIndex: 'couponEndDate',
      key: 'couponEndDate',
      sorter: (a, b) => moment(a.couponEndDate).unix() - moment(b.couponEndDate).unix(),
    },
  ];
  const hasSelected = checkedBox.length > 0;
  return (
    ((dataMemo && dataMemo.length > 0 && (
    <div className="coupon_table">
      <Button type="danger" onClick={handleDelelteCoupons} disabled={!hasSelected} loading={loadingButton}>
        Delete selected
      </Button>
      <Table
        rowKey={(record) => record.couponId}
        pagination={{defaultPageSize: 5}}
        scroll={{ x: 'max-content' }}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        dataSource={dataMemo}
      />
    </div>
    ) || 'No data available'))
  )
};

export default CouponTable;
