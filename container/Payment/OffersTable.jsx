import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import moment from 'moment';
import { TagFilled } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import Table from 'components/UI/Antd/Table/Table';
import Button from 'components/UI/Antd/Button/Button';
import Tag from 'components/UI/Antd/Tag/Tag';
import {
  GET_HOTEL_COUPONS,
} from 'apollo-graphql/query/query';
import {
  CHECK_COUPON,
} from 'apollo-graphql/mutation/mutation';

const OffersTable = ({ id, setCouponUsed, total }) => {
  const [radioBox, setRadioBox] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabled, setDisabled] = useState(null);
  const [checkCoupon] = useMutation(CHECK_COUPON, {
    onCompleted: (data) => {
      setTimeout(() => {
        setLoadingButton(false);
        setCouponUsed(data.checkCoupon);
        setRadioBox([]);
        setDisabled(true);
        toast.success('Coupon Code Applied Succesfully 🎉🎉🎉',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }, 3000);
    },
  });
  const { data, loading, error } = useQuery(GET_HOTEL_COUPONS, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const offers = useMemo(() => {
    if (loading || error) return <Loader />;
    return data.getHotelCoupons;
  }, [loading, error, data]);
  if (loading) return <Loader />;
  if (error) return `Error${error} occurred`;
  const columns = [
    {
      title: 'Coupon Name',
      dataIndex: 'couponName',
      key: 'couponName',
      sorter: (a, b) => a.couponName.localeCompare(b.couponName),
    },
    {
      title: 'Status',
      dataIndex: 'couponEndDate',
      key: 'couponEndDateStatus',
      sorter(a, b) {
        const date = new Date(a.couponEndDate);
        const endDate = new Date(b.couponEndDate);
        return endDate - date;
      },
      render(couponType, record) {
        // Argument thứ 2 là record hiện giờ
        // const q = new Date();
        // const m = q.getMonth() + 1;
        // const d = q.getDay();
        // const y = q.getFullYear();
        const date = new Date();
        const endDate = new Date(couponType);
        return (
          <>
            <Tag color={(record.couponQuantity === 0 && 'purple') || (endDate > date ? 'cyan' : 'volcano')}>
              {(record.couponQuantity === 0 && 'OUT OF STOCK') || (endDate > date ? 'AVAILABLE' : 'EXPIRED')}
            </Tag>
          </>
        );
      },
    },
    {
      title: 'Coupon Discount Type',
      dataIndex: 'couponType',
      key: 'couponType',
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
      key: 'couponValue',
      sorter: (a, b) => a.couponType - b.couponType,
    },
    {
      title: 'Description',
      dataIndex: 'couponDescription',
      key: 'couponDescription',
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
  async function start() {
    try {
      setLoadingButton(true);
      await checkCoupon({
        variables: {
          hotelId: id,
          couponName: radioBox[0],
        },
      });
    } catch (e) {
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
  const date = new Date();
  const rowSelection = {
    selectedRowKeys: radioBox,
    onChange: (selectedRowKeys) => {
      setRadioBox(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: disabled
      || (record.couponQuantity === 0)
      || (record.couponType === 2 && total <= record.couponValue)
      || ((new Date(record.couponEndDate)) < date),
    }),
    // },console.log(new Date(record.couponEndDate) > date)),
  };
  const hasSelected = radioBox.length > 0;
  return (
    ((offers && offers.length > 0 && (
      <>
        <Button type="primary" onClick={start} disabled={disabled || !hasSelected} loading={loadingButton}>
          {!disabled ? 'Use this coupon' : 'Coupon Code Applied Succesfully'}
        </Button>
        <Table
          rowClassName={(record) => (disabled
            || (record.couponQuantity === 0)
            || ((new Date(record.couponEndDate)) < date)
            || (record.couponType === 2 && total <= record.couponValue))
            && 'disabled-row'}
          rowKey={(record) => record.couponName}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          title={() => (
            <>
              <TagFilled style={{ fontSize: '20px', color: '#bcbcd8' }} />
              : Not available for this transaction
            </>
          )}
          pagination={{ defaultPageSize: 5 }}
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={offers}
        />
      </>
    )) || 'No offers available')
  );
};
export default OffersTable;
