import React, { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import moment from 'moment';
import Loader from 'components/Loader/Loader';
import Table from 'components/UI/Antd/Table/Table';
import Tag from 'components/UI/Antd/Tag/Tag';
import {
  GET_HOTEL_COUPONS,
} from 'apollo-graphql/query/query';

const OffersTable = ({ id }) => {
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
  return (
    ((offers.length > 0 && (
    <Table
      pagination={{ defaultPageSize: 5 }}
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={offers}
    />
    )) || 'No offers available')
  );
};
export default OffersTable;
