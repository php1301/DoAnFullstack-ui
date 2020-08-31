import React from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RenderForgetPasswordForm from 'components/ForgetPassword/RenderForgetPassswordForm';
import { FORGET_PASSWORD } from 'apollo-graphql/mutation/mutation';

export default function ForgetPassWordForm() {
  const [forgetPassword] = useMutation(FORGET_PASSWORD, {
    onCompleted: () => {
      toast.success('Email for resetting password sent!', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
  const initialValues = {
    email: '',
  };

  const getPasswordFormValidationSchema = () => Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .required('Must enter Email'),
  });

  const handleSubmit = async (formProps) => {
    const { email } = formProps;
    try {
      await forgetPassword({
        variables: {
          email,
        },
      });
    } catch (e) {
      toast.error(e.message.slice(15), {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={getPasswordFormValidationSchema}
    >
      {RenderForgetPasswordForm}
    </Formik>
  );
}
