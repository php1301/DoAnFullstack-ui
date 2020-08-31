/* eslint-disable camelcase */
// import { useState } from 'react';
import { useQuery } from 'react-apollo';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import { SINGLE_POST_PAGE } from 'settings/constants';
import { GET_USER_POSTS } from 'apollo-graphql/query/query';
import Loader from 'components/Loader/Loader';

const LISTED_POST_LIMIT = 6;
export default function AgentItemLists({
  // processedData,
  loadMoreData,
  loadingPost,
  deviceType,
  user,
  // userInfo
}) {
  // Mock data thì uncomment dòng dưới
  // const listed_posts = processedData[0] && processedData[0].listed_posts
  //   ? processedData[0].listed_posts
  //   : [];
  //  Đây là query life refresh, giữa các tab
  //  Có thể sử dụng prop userInfo để tận dụng query 1 lần xài cho tất cả tabs
  const {
    loading, error, data,
  } = useQuery(GET_USER_POSTS, {
    variables: {
      uid: user.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <Loader />;
  if (error) return `Error${error} occurred`;
  const listed_posts = data && data.userPosts.listed_posts ? data.userPosts.listed_posts : [];
  const favourite_post = data && data.userPosts.favourite_post ? data.userPosts.favourite_post : [];
  return (
    <SectionGrid
      type="listed"
      link={SINGLE_POST_PAGE}
      columnWidth={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6]}
      deviceType={deviceType}
      data={listed_posts}
      heart={favourite_post}
      totalItem={listed_posts.length}
      limit={LISTED_POST_LIMIT}
      loading={loadingPost}
      handleLoadMore={loadMoreData}
      placeholder={<PostPlaceholder />}
    />
  );
}
