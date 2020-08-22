/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

const Rating = (props) => {
  const {
    rating, ratingCount, type, ratingFieldName,
  } = props;
  //   Render đúng số sao
  let i;
  const ratingView = [];
  // if (rating && rating !== 0) {
  const floorValue = Math.floor(rating);
  for (i = 0; i < 5; i++) {
    if (i < floorValue) {
      ratingView.push(<IoIosStar key={i} />);
    } else {
      ratingView.push(<IoIosStarOutline key={i} />);
    }
  }
  // }
  let listingCondition;
  if (rating && rating === 5) {
    listingCondition = 'Awesome';
  } else if (rating >= 4 && rating < 5) {
    listingCondition = 'Good';
  } else if (rating >= 3 && rating < 4) {
    listingCondition = 'Average';
  } else if (rating >= 2 && rating < 3) {
    listingCondition = 'Bad';
  } else if (rating >= 1) {
    listingCondition = 'Terrible';
  } else {
    listingCondition = 'No Rating Yet';
  }

  let showRatingCount;
  if (ratingCount) {
    showRatingCount = `(${ratingCount})`;
  } else {
    showRatingCount = '';
  }

  return (
    <>
      {/* type bulk truyền từ ProductCard */}
      {type && type === 'bulk' ? (
        <>
          <span>{ratingView}</span>
          <strong>
            {` ${listingCondition}`}
            {' '}
            {`${showRatingCount}`}
          </strong>
        </>
      ) : (
        <>
          <span>{ratingFieldName}</span>
          {' '}
          {ratingView}
        </>
      )}
    </>
  );
};

Rating.propTypes = {
  type: PropTypes.string.isRequired,
  ratingCount: PropTypes.number,
  rating: PropTypes.number,
  ratingFieldName: PropTypes.string,
};

export default Rating;
