import React from 'react';
import { Field, Form } from 'formik';
import { AntInput } from 'components/UI/Antd/AntdInputWithFormik';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Button from 'components/UI/Antd/Button/Button';

const RenderChangePasswordForm = (props) => {
  const { values, submitCount, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={30}>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="password"
            type="password"
            size="large"
            label="Enter old password"
            submitCount={submitCount}
            value={values.password}
            hasFeedback
          />
        </Col>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="newPassword"
            type="password"
            size="large"
            label="Enter new password"
            submitCount={submitCount}
            value={values.newPassword}
            hasFeedback
          />
        </Col>
        <Col lg={24}>
          <Field
            component={AntInput}
            name="confirmPassword"
            type="password"
            size="large"
            label="Confirm new password"
            submitCount={submitCount}
            value={values.confirmPassword}
            hasFeedback
          />
        </Col>
      </Row>
      <div className="submit-container">
        <Button className="signin-btn" type="primary" htmlType="submit">
          Reset Password
        </Button>
      </div>
    </Form>
  );
};

export default RenderChangePasswordForm;
