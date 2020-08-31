import React, { useContext } from 'react';
import {useMutation} from 'react-apollo';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RenderCreateOrUpdateForm from 'components/User/RenderCreateOrUpdateForm';
import { dateFormat } from 'library/helpers/validators/fieldFormats';
import {AuthContext} from 'context/AuthProvider';
import { FormTitle } from './UserAccountSettings.style';
import { GET_USER_INFO } from 'apollo-graphql/query/query';
import {UPDATE_PROFILE} from 'apollo-graphql/mutation/mutation';
import { isEqual } from 'lodash';


export default function UserCreateOrUpdateForm (props){

  const {addItem} = useContext(AuthContext);
  const [updateProfile] = useMutation(UPDATE_PROFILE,{
    refetchQueries: () => [
      {
        query: GET_USER_INFO,
        variables: {
          id: user.id,
        },
      },
    ],
  }) 
  const {payloadUser} = props
  const initialValues =  {
    // key match name của Field bên RenderCreateOrUpdateForm
  firstName: props.user.first_name ?? '',
  lastName: props.user.last_name ?? '',
  agentGender: props.user.gender ?? '',
  phone_number: props.user.cellNumber ?? '',
  preferredLanguage: 'English',
  Facebook: props.user.social_profile && props.user.social_profile.facebook || '',
  Twitter: props.user.social_profile && props.user.social_profile.twitter || '',
  Instagram: props.user.social_profile && props.user.social_profile.instagram || '',
  // Đang nhập location của user dạng mảng
  location: [props.user.agent_location] ?? '',
  describeYourself: props.user.content ?? '',
  dateOfBirthday: props.user.date_of_birth ? moment(props.user.date_of_birth) : moment(),
  genderOptions: ['Male', 'Female', 'Other'],
  languageOptions: ['English', 'Spanish', 'French', 'Russian'],
};

const userProfileBuildValidationSchema = () => {
    const maxDate = moment();
    const date = new Date(maxDate);
    return Yup.object().shape({
      firstName: Yup.string().required('First Name is Required!'),
      lastName: Yup.string().required('Last Name is Required!'),
      phone_number: Yup.number().required('Phone number is Required!'),
      dateOfBirthday: Yup.date()
        .default(date)
        .max(
          maxDate,
          `Date of Birth should not be equal or later than ${maxDate}`
        )
        .required('Date of Birth date required'),
      preferredLanguage: Yup.string()
        .oneOf(['English', 'Spanish', 'French', 'Russian'])
        .required('Please choose your preferred language'),
      agentGender: Yup.string()
        .oneOf(['Male', 'Female', 'Other'])
        .required('Please select Gender information'),
    });
};

async function handleSubmit(formProps){

    const {
        firstName,
        lastName,
        // email,
        agentGender,
        phone_number,
        preferredLanguage,
        // address,
        describeYourself,
        dateOfBirthday,
        Facebook,
        Instagram,
        Twitter,
        location,
      } = formProps;
      // Có thể xài .reduce thay thế
      if(isEqual(formProps, initialValues)){
        return toast.error('Must change at least 1 field', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }

      const selectedDate = moment(dateOfBirthday).format(dateFormat);
      try {
        await updateProfile({
        variables:{
          profile:{
            first_name: firstName,
            last_name: lastName,
            gender: agentGender,
            cellNumber: phone_number,
            content: describeYourself,
            date_of_birth: selectedDate,
          },
          social:{
            facebook: Facebook,
            instagram: Instagram,
            twitter: Twitter,
          },
          location: {
              lat:location[0].lat,
              lng:location[0].lng,
              formattedAddress:location[0].formattedAddress,
              zipcode:location[0].zipcode,
              city:location[0].city,
              state_long:location[0].state_long,
              state_short:location[0].state_short,
              country_long:location[0].country_long,
              country_short:location[0].country_short,
          },
          
        }
      })
      toast.success('Profile Updated! 🦄 ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      payloadUser.first_name = firstName
      payloadUser.last_name = lastName
      addItem('user', payloadUser)
      }
    catch(e){
      toast.error(e.message.slice(15), {
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
      const {user} = props
      return(
        <>
          <FormTitle>Basic Information</FormTitle>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={userProfileBuildValidationSchema}
            isSubmitting
          >
            {props=>(<RenderCreateOrUpdateForm user={user} {...props}/>)}
          </Formik>
        </>
      )
    }
      