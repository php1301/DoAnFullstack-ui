import React, { useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Tooltip } from 'antd';
import {
  LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled,
} from '@ant-design/icons';
import { findIndex } from 'lodash';
import { GET_REVIEWS_LIKE_DISLIKE } from 'apollo-graphql/query/query';
import { LIKE_OR_DISLIKE_REVIEW } from 'apollo-graphql/mutation/mutation';
import { REALTIME_LIKE_DISLIKE } from 'apollo-graphql/subscription/subscription';

// class LikeDislike extends React.Component {
const LikeDislike = ({ id, user }) => {
  const [likeOrDislikeReview] = useMutation(LIKE_OR_DISLIKE_REVIEW, {
    // refetchQueries: () => [
    //   {
    //     query: GET_REVIEWS_LIKE_DISLIKE,
    //     variables: {
    //       id,
    //     },
    //   },
    // ],
  });
  const { subscribeToMore, data, loading } = useQuery(GET_REVIEWS_LIKE_DISLIKE, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: REALTIME_LIKE_DISLIKE,
      variables: {
        reviewID: id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // console.log(prev);
        // console.log(subscriptionData);
        const newData = {
          getReviewsLikeDislike: {
            ...subscriptionData.data.realtimeLikeDislike,
          },
        };
        // console.log(newData);
        return newData;
      },
    });
  }, []);
  if (loading) return '0';
  const { peopleLiked } = data.getReviewsLikeDislike;
  const { peopleDisliked } = data.getReviewsLikeDislike;
  const like = () => {
    // console.log(id);
    // console.log(hotelId);
    // setLikes(1);
    // setDislikes(0);
    likeOrDislikeReview({
      variables: {
        id,
        type: 1,
      },
    });
  };

  const dislike = () => {
    // setLikes(0);
    // setDislikes(1);
    likeOrDislikeReview({
      variables: {
        id,
        type: 2,
      },
    });
  };
  const liked = findIndex(peopleLiked, { id: user.id }) === -1 ? -1 : 1;
  const disliked = findIndex(peopleDisliked, { id: user.id }) === -1 ? -1 : 1;
  // console.log(liked);
  // console.log(disliked);
  return (
    <>
      <span className="comment-helpful">
        <Tooltip title="Like">
          {liked !== -1 ? (
            <LikeFilled
              type="like"
              onClick={like}
            />
          )
            : (
              <LikeOutlined
                type="like"
                onClick={like}
              />
            )}
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {peopleLiked.length}
        </span>
      </span>
      <span className="comment-report">
        <Tooltip title="Dislike">
          {disliked !== -1 ? (
            <DislikeFilled
              type="dislike"
              onClick={dislike}
            />
          )
            : (
              <DislikeOutlined
                type="dislike"
                onClick={dislike}
              />
            )}
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {peopleDisliked.length}
        </span>
      </span>
    </>
  );
};

export default LikeDislike;
