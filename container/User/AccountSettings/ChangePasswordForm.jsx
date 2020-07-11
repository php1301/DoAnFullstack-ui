import React, { useContext } from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RenderChangePasswordForm from 'components/ChangePassword/RenderChangePasswordForm';
import { AuthContext } from 'context/AuthProvider';
import {
  UPDATE_PASSWORD,
} from 'apollo-graphql/mutation/mutation';
import { FormTitle } from './UserAccountSettings.style';

export default function ChangePassWord() {
  const { logOut } = useContext(AuthContext);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const getChangePassWordValidationSchema = () => Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password has to be longer than 6 characters!')
      .max(20, 'Too Long!')
      .required('Old Password is required!'),
    newPassword: Yup.string()
      .min(6, 'Password has to be longer than 6 characters!')
      .max(20, 'Too Long!')
      .required('New Password is required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords are not the same!')
      .required('Password confirmation is required'),
  });

  async function handleSubmit(formProps) {
    const { password, newPassword, confirmPassword } = formProps;
    try {
      await updatePassword({
        variables: {
          password: {
            oldPassword: password,
            newPassword,
            confirmPassword
            ,
          },
        },
      });
      toast.success('Password Updated! 🦄 You will be logged out for security purpose ', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        logOut('/login');
      }, 6000);
    } catch (e) {
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

  return (
    <>
      <FormTitle>Change Password</FormTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getChangePassWordValidationSchema}
      >
        {RenderChangePasswordForm}
      </Formik>
    </>
  );
}
