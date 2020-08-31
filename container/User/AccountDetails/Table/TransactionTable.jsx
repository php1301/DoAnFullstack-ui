import { useState, useMemo } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { toast } from 'react-toastify'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Table from 'components/UI/Antd/Table/Table';
import Input from 'components/UI/Antd/Input/Input';
import Button from 'components/UI/Antd/Button/Button';
import Tag from 'components/UI/Antd/Tag/Tag';
import Heading from 'components/UI/Heading/Heading';
import {
  GET_TRANSACTIONS_HAVING,
} from 'apollo-graphql/query/query';
import {
  PROCESS_TRANSACTION,
} from 'apollo-graphql/mutation/mutation';
import Loader from 'components/Loader/Loader';

const TransactionTable = () => {
  const [checkedBox, setCheckedBox] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingRefetch, setLoadingRefetch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [processTransactions] = useMutation(PROCESS_TRANSACTION, {
    onCompleted: () => {
      setCheckedBox([])
      toast.success('Task succesfully',
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
    refetchQueries: () => [{
      query: GET_TRANSACTIONS_HAVING
    }]
  });
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS_HAVING, {
    fetchPolicy: 'cache-and-network',
  });
  const dataMemo = useMemo(()=> {
    if (loading || error) return <Loader />;
    return data.getTransactionsHaving
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
  const columns = [
    {
      title: 'TXID',
      dataIndex: 'TXID',
      key: 'TXID',
      sortOrder: sortedInfo && sortedInfo.columnKey === 'TXID' && sortedInfo.order,
      sorter: (a, b) => a.TXID.localeCompare(b.TXID),
      ...getColumnSearchProps('TXID'),
    },
    {
      title: 'Hotel Name',
      dataIndex: 'transactionHotelName',
      key: 'transactionHotelName',
      sortOrder: sortedInfo && sortedInfo.columnKey === 'transactionHotelName' && sortedInfo.order,
      sorter: (a, b) => a.transactionHotelName.localeCompare(b.transactionHotelName),
    },
    {
      title: 'Price',
      dataIndex: 'transactionPrice',
      key:'transactionPrice',
      transactionCouponValue: 'transactionPrice',
      defaultSortOrder: 'descend',
      sortOrder: sortedInfo && sortedInfo.columnKey === 'transactionPrice' && sortedInfo.order,
      sorter: (a, b) => a.transactionPrice - b.transactionPrice,
    },
    {
      title: 'Email',
      dataIndex: 'transactionAuthorEmail',
      key: 'transactionAuthorEmail',
      ...getColumnSearchProps('transactionAuthorEmail'),
    },
    {
      title: 'Coupon Type',
      dataIndex: 'transactionCouponType',
      key: 'transactionCouponType',
      filteredValue: (filteredInfo && filteredInfo.transactionCouponType) || null,
      sortOrder: sortedInfo && sortedInfo.columnKey === 'transactionCouponType' && sortedInfo.order,
      sorter: (a, b) => a.transactionCouponType - b.transactionCouponType,
      onFilter: (value, record) => record.transactionCouponType === value,
      filters: [
        {
          text: '% DISCOUNT',
          value: 1,
        },
        {
          text: 'NUMBER DISCOUNT',
          value: 2,
        },
        {
          text: 'NO COUPON',
          value: 3,
        },
      ],
      render: (couponType) => (
        <>
          <Tag color={(couponType === 1 && 'green') || (couponType === 2 && 'geekblue') || (couponType === 3 && 'volcano')}>
            {(couponType === 1 && '% DISCOUNT') || (couponType === 2 && 'NUMBER DISCOUNT') || (couponType === 3 && 'NO COUPON')}
          </Tag>
        </>
      ),
    },
    {
      title: 'Coupon Value',
      dataIndex: 'transactionCouponValue',
      key: 'transactionCouponValue',
      align: 'center',
      defaultSortOrder: 'descend',
      sortOrder: sortedInfo && sortedInfo.columnKey === 'transactionCouponValue' && sortedInfo.order,
      sorter: (a, b) => a.transactionCouponValue - b.transactionCouponValue,
    },
    {
      title: 'Hotel Type',
      dataIndex: 'transactionHotelType',
      key: 'transactionHotelType',
      align: 'center',
      filteredValue: (filteredInfo && filteredInfo.transactionHotelType) || null,
      sortOrder: sortedInfo && sortedInfo.columnKey === 'transactionHotelType' && sortedInfo.order,
      sorter: (a, b) => a.transactionHotelType.localeCompare(b.transactionHotelType),
      onFilter: (value, record) => record.transactionHotelType.indexOf(value) === 0,
      filters: [
        {
          text: 'Hotel',
          value: 'Hotel',
        },
        {
          text: 'Villa',
          value: 'Villa',
        },
        {
          text: 'Resort',
          value: 'Resort',
        },
        {
          text: 'Duplex',
          value: 'Duplex',
        },
        {
          text: 'Cottage',
          value: 'Cottage',
        },
        {
          text: 'Landscape',
          value: 'Landscape',
        },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'transactionStatus',
      align: 'center',
      filteredValue: (filteredInfo && filteredInfo.transactionStatus) || null,
      onFilter: (value, record) => record.transactionStatus.indexOf(value) === 0,
      filters: [
        {
          text: 'PENDING',
          value: 'PENDING',
        },
        {
          text: 'DONE',
          value: 'DONE',
        },
        {
          text: 'CANCELLED',
          value: 'CANCELLED',
        },
      ],
      render: (status) => (
        <>
          <Tag color={
          (status === 'PENDING' && 'gray') 
          || (status === 'DONE' && 'geekblue')
          || (status === 'CANCELLED' && 'magenta')}>
            {status}
          </Tag>
        </>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (record) => (
    //     <div>
    //       <a>
    //         Invite
    //         {' '}
    //         {record.name}
    //       </a>
    //       <a style={{ marginLeft: '5px', color: 'red' }}>Delete</a>
    //     </div>
    //   ),
    // },
  ];
  const rowSelection = {
    selectedRowKeys: checkedBox,
    onChange: (selectedRowKeys) => {
      // console.log('selectedRows: ', selectedRowKeys);
      setCheckedBox(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.transactionStatus !== 'PENDING'
    }),
  };
  // const dataMock = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     chinese: 98,
  //     math: 60,
  //     english: 70,
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     chinese: 98,
  //     math: 66,
  //     english: 89,
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     chinese: 98,
  //     math: 90,
  //     english: 70,
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     chinese: 88,
  //     math: 99,
  //     english: 89,
  //   },
  // ];
  
  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const start = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setCheckedBox([]);
      setLoadingButton(false);
    }, 1000);
  };
  async function handleProcessTransaction(type){
    try {
      if(type === 3){
        await processTransactions({
          variables:{
            type,
          }
        })
      }
      if(type === 1 || type === 2){
        type === 1 ? setLoadingButton(true) : setLoadingDelete(true)
        await processTransactions({
          variables:{
            type,
            id: checkedBox,
          }
        })
      }
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
    finally{
      if(type !==3) type === 1 ? setLoadingButton(false) : setLoadingDelete(false)
    }
  }
  const handleRefetch = () => {
    setLoadingRefetch(true);
    refetch()
    setTimeout(()=>{
     setLoadingRefetch(false);
    }, 3000)
  }
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const expandedRowRender = (record) => {
    const nestedColumns = [
      {
        title: 'Stripe ID',
        key: 'transactionStripeId',
        dataIndex: 'transactionStripeId',
      },
      {
        title: 'Fullname',
        key: 'transactionAuthorName',
        dataIndex: 'transactionAuthorName',
      },
      {
        title: 'Author ID',
        key: 'transactionAuthorId',
        dataIndex: 'transactionAuthorId',
      },
      {
        title: 'Note',
        key: 'transactionAuthorNote',
        dataIndex: 'transactionAuthorNote',
      },
      {
        title: 'Check In',
        key: 'transactionStartDate',
        dataIndex: 'transactionStartDate',
      },
      {
        title: 'Check Out',
        key: 'transactionStartDate',
        dataIndex: 'transactionEndDate',
      },
      {
        title: 'Hotel Address',
        key: 'transactionLocationFormattedAddress',
        dataIndex: 'transactionLocationFormattedAddress',
      },
      {
        title: 'Latitude',
        key: 'transactionLocationLat',
        dataIndex: 'transactionLocationLat',
      },
      {
        title: 'Longitude',
        key: 'transactionLocationLng',
        dataIndex: 'transactionLocationLng',
      },
    ];
    return (
      <div className="transaction_table">
        {!data.getTransactionsHaving && ('Dòng chữ này xuất hiện để hiện mockData vì không có data từ server')}
        <Table
          bordered
          title={() => 'Details Information'}
          scroll={{ x: true }}
          pagination={{ defaultPageSize: 5 }}
          columns={nestedColumns}
          dataSource={record}
        />
      </div>
    );
  };
 
  let total = 0;
  data.getTransactionsHaving.map((i) => {
    total += i.transactionPrice;
  });
  const hasSelected = checkedBox.length > 0;
  return (
    (( dataMemo && dataMemo.length > 0 && (
    <div style={{ marginBottom: '50px' }} className="transaction_table">
      <p>{hasSelected ? `Selected ${checkedBox.length} ${checkedBox.length > 1 ? 'Transactions' : 'Transaction'}` : ''}</p>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
      <Button type="primary" onClick={()=>{ handleProcessTransaction(1); }} disabled={!hasSelected} loading={loadingButton}>
        Confirm
      </Button>
      <Button type="danger" onClick={()=>{ handleProcessTransaction(2); }} disabled={!hasSelected} loading={loadingDelete}>
        Denied
      </Button>
      <Button type="danger" onClick={()=>{ handleProcessTransaction(3); }} disabled={!hasSelected}>
        Pending
      </Button>
      <Button type="primary" onClick={handleRefetch} loading={loadingRefetch}>
        Refetch
      </Button>
      <Table
        rowKey={(record) => record.TXID}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        expandable={{
          expandedRowRender: (record) => expandedRowRender([record]),
        }}
        onChange={handleChange}
        bordered
        pagination={{defaultPageSize: 5}}
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={dataMemo}
      />
      <Heading as="h4" content={`Total: ${total}$.00`} />
    </div>
    ) || 'No data available'))
  );
};

export default TransactionTable;
