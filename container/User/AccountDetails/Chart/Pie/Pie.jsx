/* eslint-disable camelcase */
import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { Pie } from 'react-chartjs-2';
import { GET_USER_POSTS } from 'apollo-graphql/query/query';
import { processPieData } from './PieConfig';
import Loader from 'components/Loader/Loader';
import Button from 'components/UI/Antd/Button/Button';

const PieChart = ({ user }) => {
  const [fetch, setFetch] = useState(false);
  const {
    loading, error, data,
  } = useQuery(GET_USER_POSTS, {
    variables: {
      uid: user.id,
    },
    fetchPolicy: 'cache-and-network',
  });


  const listed_posts = useMemo(() => {
    if (loading || error) return <Loader />;
    // console.log('changed');
    // return data && data.userPosts.listed_posts
    //   ? data.userPosts.listed_posts : [];
    return processPieData(data.userPosts.listed_posts);
  }, [loading, error, data, fetch]);

  if (loading) return <Loader />;
  if (error) return `Error${error} occurred`;


  return (
    <>
      <Button type="primary" onClick={() => { setFetch(!fetch); }}>
        Refetch
      </Button>
      <Pie data={listed_posts} />
    </>
  );
};
export default PieChart;
