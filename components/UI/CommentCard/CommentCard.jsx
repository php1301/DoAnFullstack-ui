/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Popover, Modal } from 'antd';
import Card from '../Antd/Card/Card';
import moment from 'moment';
import LikeDislike from './LikeDislike';
import Rating from '../Rating/Rating';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { singleReview, authorRating } = this.props;
    const { visible } = this.state;
    const reviewAuthorFirstName = singleReview
      ? singleReview.reviewAuthorFirstName
      : '';
    const reviewAuthorLastName = singleReview
      ? singleReview.reviewAuthorLastName
      : '';
    const authorName = reviewAuthorFirstName + ' ' + reviewAuthorLastName;
    const content = singleReview ? singleReview.reviewText : '';
    const justAdded = singleReview && singleReview.justAdded || null;
    const reviewTitle = singleReview ? singleReview.reviewTitle : '';
    const commentDate = singleReview ? singleReview.reviewDate : '';
    const postTime = new Date(commentDate).getTime();
    const authorAvatar = singleReview ? singleReview.reviewAuthorPic : '';
    const reviewRating = singleReview ? singleReview.reviewFields : '';
    const reviewPics = singleReview && singleReview.reviewPics ? singleReview.reviewPics : '';
    const reviewOptional = singleReview && singleReview.reviewOptional ? singleReview.reviewOptional : '';
    const reviewTips = singleReview && singleReview.reviewTips ? singleReview.reviewTips : '';
    return (
      <div className={`comment-area ${justAdded ? 'comment-just-now' : ''}`}>
        <div className="comment-wrapper">
          <div className="comment-header">
            <div className="avatar-area">
              <div className="author-avatar">
                <img src={authorAvatar} alt={authorName} />
              </div>
              <div className="author-info">
                <h3 className="author-name">{authorName}</h3>
                {authorRating && (
                  <div className="author-rating">{authorRating}</div>
                )}
                <div className="comment-date">
                  <Popover
                    placement="bottom"
                    content={moment(commentDate).format(
                      'dddd, MMMM Do YYYY, h:mm:ss a'
                    )}
                  >
                    <span>
                      Reviewed - {moment(postTime).fromNow()  === 'Invalid date' 
                    ? 'Just now' 
                    : moment(postTime).fromNow()}
                    </span>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="rating-area">
              <LikeDislike />
            </div>
          </div>
          <div className="comment-body">
            <h4>{reviewTitle}</h4>
            <p>{content}</p>
            <h5>{`*Review tips:${reviewTips}*`}</h5>
            {reviewPics[0] ? (<Card className="image-comment">
              {reviewPics && reviewPics.map((i) => (
                <>
                  <Card.Grid onClick={this.showModal} style={{ width: '33.33%' }}>
                    <img
                      alt={i.url}
                      src={i.url}
                    />
                  </Card.Grid>
                  <Modal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable
                  >
                    <img src={i.url} style={{ width: '100%' }} alt={i.url} />
                  </Modal>
                </>
            ))}
            </Card>): ''}
          </div>
          <div className="comment-rating">
            {reviewRating && reviewRating.length !== 0
              ? reviewRating.map((singleReviewRating, i) => {
                  return (
                    <div className="rating-widget" key={i}>
                      <Rating
                        key={i}
                        rating={singleReviewRating.rating}
                        ratingFieldName={singleReviewRating.ratingFieldName}
                        type="individual"
                      />
                    </div>
                  );
                })
              : ''}
          </div>
          <br />
          <div className="comment-rating">
            {reviewOptional && reviewOptional.length !== 0
              ? reviewOptional.map((singleReviewOptional, i) => {
                  return (
                    <div className="rating-widget" key={i}>
                      <div className="review-field">
                        <h3 style={{
                          backgroundColor: '#008489',
                        borderColor: '#008489',
                        borderRadius: '3px',
                        color: 'white',
                        padding: '6px',
                        textAlign: 'center',
                        }}
                        >
                          {singleReviewOptional.optionField}
                        </h3>
                        <h4 style={{ textAlign: 'center', }}>
                          {singleReviewOptional.option === 'not-sure' ? 'Not sure' : (
                          singleReviewOptional.option === 'yes' ? 'Yes' : (
                            singleReviewOptional.option === 'no' ? 'No' : ''
                          )
                        )}
                        </h4>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    );
  }
}
