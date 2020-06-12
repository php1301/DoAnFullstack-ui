import React from 'react';
import { Field, Form } from 'formik';
import { MdLockOpen } from 'react-icons/md';
import { AntInput } from 'components/UI/Antd/AntdInputWithFormik';
import Button from 'components/UI/Antd/Button/Button';

import FormWrapper from './RenderForgetPasswordForm.style';

const RenderForgetPassWordForm = (props) => {
  const { values, submitCount, handleSubmit } = props;
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Field
          component={AntInput}
          name="email"
          type="text"
          size="large"
          placeholder="Email"
          submitCount={submitCount}
          value={values.email}
          hasFeedback
        />
        <Button
          className="signin-btn"
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: '100%' }}
        >
          <MdLockOpen />
          Send Email
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default RenderForgetPassWordForm;
