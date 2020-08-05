import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { MAKE_REVIEWS } from 'apollo-graphql/mutation/mutation';
import RenderReviewForm from './RenderReviewForm';

export default function ReviewCreateForm(props) {
  const {
    hotelId, setState, state, dispatch, user,
  } = props;
  const [makeReviews] = useMutation(MAKE_REVIEWS);
  const initialValues = {
    reviewTitle: '',
    reviewDetails: '',
    tripType: '',
    ratings: 5,
    roomsRatings: 5,
    serviceRatings: 5,
    cleanlinessRatings: 5,
    foodRatings: 5,
    tips: '',
    termsAndCondition: false,
    quaint: '',
    roomViews: '',
    indoorPool: '',
    isTrendy: '',
    isRomantic: '',
    reviewPhotos: [], // Special
  };

  const ReviewValidationSchema = () => Yup.object().shape({
    reviewTitle: Yup.string().required('Title is Required!'),
    reviewDetails: Yup.string().required('Details is Required!'),
    tripType: Yup.string().required('Trip Type is Required!'),
    ratings: Yup.number().required('Rating  is Required!'),
    roomsRatings: Yup.number().required('Room rating is Required!'),
    serviceRatings: Yup.number().required('Service rating is Required!'),
    cleanlinessRatings: Yup.number().required('Cleanness rating is Required!'),
    foodRatings: Yup.number().required('Food rating is Required!'),
    termsAndCondition: Yup.boolean().required(
      'Terms and condition acceptence  is Required!',
    ),
    quaint: Yup.string()
      .oneOf(['yes', 'no', 'not-sure'])
      .required('Please select this information'),
    roomViews: Yup.string()
      .oneOf(['yes', 'no', 'not-sure'])
      .required('Please select this information'),
    indoorPool: Yup.string()
      .oneOf(['yes', 'no', 'not-sure'])
      .required('Please select this information'),
    isTrendy: Yup.string()
      .oneOf(['yes', 'no', 'not-sure'])
      .required('Please select this information'),
    isRomantic: Yup.string()
      .oneOf(['yes', 'no', 'not-sure'])
      .required('Please select this information'),
  });

  async function handleSubmit(formProps) {
    const {
      reviewTitle,
      reviewDetails,
      tripType,
      ratings,
      roomsRatings,
      serviceRatings,
      cleanlinessRatings,
      foodRatings,
      tips,
      // termsAndCondition,
      quaint,
      roomViews,
      indoorPool,
      isTrendy,
      isRomantic,
      reviewPhotos,
    } = formProps;
    const reviewRating = [
      {
        rating: roomsRatings,
        ratingFieldName: 'Room rating',
      },
      {
        rating: serviceRatings,
        ratingFieldName: 'Service rating',
      },
      {
        rating: cleanlinessRatings,
        ratingFieldName: 'Cleanliness rating',
      },
      {
        rating: foodRatings,
        ratingFieldName: 'Food rating',
      },
    ];
    const reviewOptionals = [
      {
        option: quaint,
        optionField: 'Quaint',
      },
      {
        option: roomViews,
        optionField: 'Room Views',
      },
      {
        option: indoorPool,
        optionField: 'Indoor Pool',
      },
      {
        option: isTrendy,
        optionField: 'Trendy',
      },
      {
        option: isRomantic,
        optionField: 'Romantic',
      },
    ];
    const reviewPics = reviewPhotos.map((i) => _.pick(i, ['url']));
    const reviewOverall = (ratings + roomsRatings
      + serviceRatings + cleanlinessRatings + cleanlinessRatings) / 5;
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        reviewTitle,
        reviewText: reviewDetails,
        sortOfTrip: tripType,
        reviewAuthorFirstName: user.first_name,
        reviewAuthorLastName: user.last_name,
        reviewAuthorEmail: user.email,
        reviewOverall,
        reviewAuthorPic: user.profile_pic_main,
        reviewTips: tips,
        reviewPics,
        justAdded: true,
        reviewDate: 'Just now', // Co the xai moment nhung anh huong perfomance
        reviewOptional: reviewOptionals,
        reviewFields: reviewRating,
      },
    });
    try {
      await makeReviews({
        variables: {
          reviews: {
            reviewOverall,
            reviewTitle,
            reviewText: reviewDetails,
            reviewTips: tips,
            sortOfTrip: tripType,
            reviewFieldInput: reviewRating,
            reviewOptionals,
            reviewPics,
          },
          hotelId,
        },
      });
      setTimeout(() => {
        setState({ ...state, visible: false });
        toast.success('Your review has been made',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }, 2000);
      // setTimeout(() => {
      //   router.reload();
      // }, 6000);
    } catch (e) {
      toast.error(e,
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
    // alert(
    //   `Review Submission Form: \n
    // Review Title: ${reviewTitle} \n
    // Review Details : ${reviewDetails} \n
    // Trip Type : ${tripType} \n
    // Ratings : ${ratings} \n
    // Room Ratings : ${roomsRatings} \n
    // Service Ratings : ${serviceRatings} \n
    // Cleanness : ${cleanlinessRatings} \n
    // Food Rating : ${foodRatings} \n
    // Tips for other : ${tips} \n
    // Is this a quaint hotel ? : ${quaint} \n
    // Does This Hotel offer rooms with great views ? : ${roomViews} \n
    // Does This Hotel have an indoor pool ? : ${indoorPool} \n
    // Is this a trendy hotel ? : ${isTrendy} \n
    // Is this a romantic hotel ? : ${isRomantic} \n
    // Agreed on Terms and Condition ? : ${termsAndCondition} \n`,
    // );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ReviewValidationSchema}
    >
      {RenderReviewForm}
    </Formik>
  );
}
