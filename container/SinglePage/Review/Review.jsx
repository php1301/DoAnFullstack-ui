import React, {
  Fragment, useState,
} from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { IoIosStar, IoIosStarOutline, IoIosArrowDown } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import Row from 'components/UI/Antd/Grid/Row';
import CommentCard from 'components/UI/CommentCard/CommentCard';
import Col from 'components/UI/Antd/Grid/Col';
import Pagination from 'components/UI/Antd/Pagination/Pagination';
import Button from 'components/UI/Antd/Button/Button';
import Input from 'components/UI/Antd/Input/Input';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import Divider from 'components/UI/Antd/Divider/Divider';
import Modal from 'components/UI/Antd/Modal/Modal';
import Rating from 'components/UI/Rating/Rating';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import ReviewForm from 'components/Review/ReviewCreateForm';
// import { ReviewContext } from 'context/ReviewProvider';
import ReviewWrapper, {
  HeaderSection,
  RatingStatus,
  FilterElement,
  RatingSearch,
  RatingWrapper,
  TextButton,
  ModalTitle,
} from './Review.style';
import { Element } from 'react-scroll';

// https://ant.design/components/input/
const { Search } = Input;

const CommentBox = (props) => {
  const {
    reviews, minValue, maxValue, user,
  } = props;
  // console.log(reviews);
  const dataToRender = reviews.slice(minValue, maxValue);
  return (reviews && reviews.length !== 0
    ? (
      dataToRender.map((singleReview) => (
        <Fragment key={uuidv4()}>
          <Divider key={uuidv4()} />
          <CommentCard key={uuidv4()} user={user} singleReview={singleReview} />
        </Fragment>
      ))) : (<Heading content="No reviews found" key={uuidv4()} />)
  );
};

const Review = (props) => {
  const {
    ratingCount,
    rating,
    reviews,
    statusHeadingStyle,
    filterHeadingStyle,
    ratingLabelStyle,
    ratingCountStyle,
    hotelId,
    user,
    isLoggedIn,
  } = props;

  // const { stateReviews, dispatch } = useContext(ReviewContext);
  const [state, setState] = useState({
    visible: false,
    languageModal: false,
  });
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(2);
  const showModal = () => {
    // eslint-disable-next-line no-unused-expressions
    isLoggedIn ? setState({ ...state, visible: true }) : Router.push({
      pathname: '/login',
      query: { prev: window.location.pathname },
    });
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
  };

  const handleLanguageModal = () => {
    setState({ ...state, languageModal: true });
  };

  const cancelLanguageModal = () => {
    setState({ ...state, languageModal: false });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(2);
    } else {
      setMinValue(value * 2 - 2);
      setMaxValue(value * 2);
    }
    console.log(value, minValue, maxValue);
  };
  // useEffect(() => {
  //   subscribeToNewComments;
  // }, [stateReviews]);
  return (
    <Element name="reviews" className="reviews">
      <ReviewWrapper>
        <HeaderSection>
          <RatingStatus>
            <Heading
              content={`${reviews.length} Reviews`}
              {...statusHeadingStyle}
            />
            <Rating rating={rating} ratingCount={ratingCount} type="bulk" />
          </RatingStatus>
          <RatingSearch>
            <Search
              placeholder="Search reviews"
              onSearch={(value) => console.log(value)}
            />
            <Button type="primary" onClick={showModal}>
              Write a Review
            </Button>
            <Modal
              visible={state.visible}
              onCancel={handleCancel}
              footer={null}
              width="100%"
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              wrapClassName="review_modal"
            >
              <ModalTitle>Write your review here</ModalTitle>
              <ReviewForm
                hotelId={hotelId}
                state={state}
                setState={setState}
                // dispatch={dispatch}
                user={user}
              />
            </Modal>
          </RatingSearch>
        </HeaderSection>
        <Row gutter={20}>
          <Col sm={12} lg={9}>
            <Heading content="Traveler Ratings" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Exccellent" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <Text content="172" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Very Good" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <Text content="92" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Average" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <Text content="34" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Poor" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <Text content="11" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}
          </Col>

          <Col sm={12} lg={5}>
            <Heading content="Traveler Type" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Families" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Couples" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Solo" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Business" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}
          </Col>

          <Col sm={12} lg={5}>
            <Heading content="Time Of Year" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Jan-Mar" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Apr-Jun" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Jul-Sep" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Oct-Dec" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}
          </Col>

          <Col sm={12} lg={5}>
            <Heading content="Languages" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="All Languages" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="English" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="Spanish" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <TextButton onClick={handleLanguageModal}>
              More Language
              {' '}
              <IoIosArrowDown />
            </TextButton>

            <Modal
              width={320}
              visible={state.languageModal}
              onCancel={cancelLanguageModal}
              footer={null}
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              wrapClassName="language_modal"
            >
              <Heading content="Languages" {...filterHeadingStyle} />
              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="All Languages"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="English" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="Chinese (Sim.)"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="Chinese (Trad.)"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="Spanish" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="German" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="Italian" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="French" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="Russian" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}
            </Modal>
            {/* End of Text Button */}
          </Col>
        </Row>
        <CommentBox
          reviews={reviews}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          minValue={minValue}
          maxValue={maxValue}
          user={user}
        />
        <Pagination
          hideOnSinglePage
          total={reviews.length}
          defaultPageSize={2} // props nay thi mac nhien la 10/trang -> paginate khi 10 cmt tro len
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${reviews.length} Comments`}
          onChange={handleChange}
        />
      </ReviewWrapper>
    </Element>
  );
};

Review.propTypes = {
  statusHeadingStyle: PropTypes.object,
  filterHeadingStyle: PropTypes.object,
  ratingLabelStyle: PropTypes.object,
  ratingCountStyle: PropTypes.object,
};

Review.defaultProps = {
  statusHeadingStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    mr: '5px',
  },
  filterHeadingStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1.2',
    mb: '0.5em',
  },
  ratingLabelStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    flex: '1',
  },
  ratingCountStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    ml: '8px',
  },
};

export default Review;
