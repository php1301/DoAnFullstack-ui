import React from 'react';
import { Form, Field } from 'formik';
import {
  AntDatePicker,
  AntInput,
  AntSelect,
  AntTextArea,
} from 'components/UI/Antd/AntdInputWithFormik';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Button from 'components/UI/Antd/Button/Button';
import { FormMapComponent } from 'components/AddHotel/RenderLocationInputForm';

export default function RenderCreateOrUpdateForm({
  handleSubmit,
  values,
  submitCount,
  user,
}) {
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Row gutter={30}>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="firstName"
            type="text"
            label="First Name"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="lastName"
            type="text"
            label="Last Name"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col lg={12}>
          <Field
            component={AntDatePicker}
            name="dateOfBirthday"
            label="Date Of Birth"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
        <Col lg={12}>
          <Row gutter={30}>
            <Col md={12}>
              <Field
                component={AntSelect}
                name="agentGender"
                label="I Am"
                defaultValue={values.agentGender}
                selectOptions={values.genderOptions}
                submitCount={submitCount}
                tokenSeparators={[',']}
                hasFeedback
              />
            </Col>
            <Col md={12}>
              <Field
                component={AntSelect}
                name="preferredLanguage"
                label="Preferred Language"
                defaultValue={values.preferredLanguage}
                selectOptions={values.languageOptions}
                submitCount={submitCount}
                tokenSeparators={[',']}
                hasFeedback
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={30}>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="Facebook"
            type="text"
            label="Facebook Profile"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="Instagram"
            type="text"
            label="Instagram Profile"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="Twitter"
            type="text"
            label="Twitter Profile"
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
        <Col lg={12}>
          <Field
            component={AntInput}
            name="phone_number"
            type="number"
            label="Phone Number"
            defaultValue={user.cellNumber ?? ''}
            submitCount={submitCount}
            hasFeedback
          />
        </Col>
      </Row>
      {/* <Field
        component={AntInput}
        name="address"
        type="text"
        label="Where You Live"
        submitCount={submitCount}
        hasFeedback
      /> */}
      <Field
        component={AntTextArea}
        name="describeYourself"
        type="text"
        label="Describe Yourself (Optional)"
        placeholder="Write Something..."
        submitCount={submitCount}
        hasFeedback
        defaultValue={user.content}
        rows={4}
      />
      <Field
        locationType={`Current: ${user.agent_location ? user.agent_location.formattedAddress : ''}` || 'Enter your location (Optional)'}
        current={user.agent_location}
        component={FormMapComponent}
        type="text"
        name="location"
        label="Choose Location"
        hasFeedback
      />
      <div className="submit-container">
        <Button htmlType="submit" type="primary">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
