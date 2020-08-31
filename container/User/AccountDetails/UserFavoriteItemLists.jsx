/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import { SINGLE_POST_PAGE } from 'settings/constants';
import { GET_USER_POSTS } from 'apollo-graphql/query/query';
import Loader from 'components/Loader/Loader';

const FAVOURITE_POST_LIMIT = 6;
export default function AgentFavItemLists({
  // processedData,
  loadMoreData,
  loadingPost,
  deviceType,
  user,
  // userInfo,
}) {
  // const favourite_post = processedData[0] && processedData[0].favourite_post
  //   ? processedData[0].favourite_post
  //   : [];
  const { loading, error, data } = useQuery(GET_USER_POSTS, {
    variables: {
      uid: user.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Loader />;

  // Query 1 lần có được từ props userInfo
  // const favourite_post = userInfo && userInfo.favourite_post ? userInfo.favourite_post : [];

  // Query từng tab - live update
  const favourite_post = data && data.userPosts.favourite_post ? data.userPosts.favourite_post : [];
  return (
    <SectionGrid
      link={SINGLE_POST_PAGE}
      columnWidth={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6]}
      deviceType={deviceType}
      type="favorite"
      data={favourite_post}
      heart={favourite_post}
      totalItem={favourite_post.length}
      limit={FAVOURITE_POST_LIMIT}
      loading={loadingPost}
      handleLoadMore={loadMoreData}
      placeholder={<PostPlaceholder />}
    />
  );
}
