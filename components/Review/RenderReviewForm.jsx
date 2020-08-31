/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Form, Field } from 'formik';
import {
  AntInput,
  AntTextArea,
  AntRate,
} from 'components/UI/Antd/AntdInputWithFormik';
import {
  RadioGroupComp,
  PhotoUploadComponent,
  CheckBoxComp,
} from './ReviewFormComponent';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Button from 'components/UI/Antd/Button/Button';

import ReviewFormWrapper, {
  GroupTitle,
  Label,
  FormGroup,
  Description,
  TripType,
  RadioGroup,
  UploadPhoto,
} from './RenderReviewForm.style';
import { MdStar } from 'react-icons/md';

export default function RenderReviewForm({
  handleSubmit,
  values,
  submitCount,
}) {
  return (
    <ReviewFormWrapper>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Field
          component={AntRate}
          name="ratings"
          label="Overall Ratings"
          submitCount={submitCount}
          hasFeedback
          defaultValue={3}
          character={<MdStar />}
          className="overall_rating_stars  overall_rating_stars1"
          style={{ fontSize: 32, color: '#008489' }}
        />
        <Field
          component={AntInput}
          name="reviewTitle"
          type="text"
          label="Title Of Your Review"
          placeholder="Summarize your visit  or highlight an interseting details"
          submitCount={submitCount}
          hasFeedback
        />
        <Field
          component={AntTextArea}
          name="reviewDetails"
          type="text"
          label="Details Of Your Review"
          placeholder="Tell people about your experience: your room, location, amenities?"
          submitCount={submitCount}
          hasFeedback
          rows={4}
        />
        <TripType>
          <Label>What Sort of trip was this?</Label>
          <Field
            component={RadioGroupComp}
            name="tripType"
            dataOptions={[
              { label: 'Business', value: 'business' },
              { label: 'Couples', value: 'couple' },
              { label: 'Family', value: 'family' },
              { label: 'Friends', value: 'friend' },
              { label: 'Solo', value: 'solo' },
            ]}
            submitCount={submitCount}
            hasFeedback
            rows={4}
          />
        </TripType>

        <FormGroup>
          <GroupTitle>
            Could You Say a Little More About It?
            {' '}
            <span>(optional)</span>
          </GroupTitle>
          <Description>
            We'd love your opinion ! Anything you can share will help other
            travelers choose their perfect hotel . Thanks
          </Description>
        </FormGroup>
        <RadioGroup>
          <Row>
            <Col lg={10}>
              <Label>Is this a quaint hotel?</Label>
            </Col>
            <Col lg={14}>
              <Field
                component={RadioGroupComp}
                name="quaint"
                dataOptions={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'Not Sure', value: 'not-sure' },
                ]}
                values={values.quaint}
                submitCount={submitCount}
                hasFeedback
              />
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Label>Does This Hotel offer rooms with great views?</Label>
            </Col>
            <Col lg={14}>
              <Field
                component={RadioGroupComp}
                name="roomViews"
                dataOptions={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'Not Sure', value: 'not-sure' },
                ]}
                values={values.quaint}
                submitCount={submitCount}
                hasFeedback
              />
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Label>Does This Hotel have an indoor pool?</Label>
            </Col>
            <Col lg={14}>
              <Field
                component={RadioGroupComp}
                name="indoorPool"
                dataOptions={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'Not Sure', value: 'not-sure' },
                ]}
                values={values.quaint}
                submitCount={submitCount}
                hasFeedback
              />
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Label>Is this a trendy hotel?</Label>
            </Col>
            <Col lg={14}>
              <Field
                component={RadioGroupComp}
                name="isTrendy"
                dataOptions={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'Not Sure', value: 'not-sure' },
                ]}
                values={values.quaint}
                submitCount={submitCount}
                hasFeedback
              />
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Label>Is this a romantic hotel?</Label>
            </Col>
            <Col lg={14}>
              <Field
                component={RadioGroupComp}
                name="isRomantic"
                dataOptions={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'Not Sure', value: 'not-sure' },
                ]}
                values={values.quaint}
                submitCount={submitCount}
                hasFeedback
              />
            </Col>
          </Row>
        </RadioGroup>
        <Row type="flex" justify="space-between">
          <Col>
            <Field
              component={AntRate}
              name="serviceRatings"
              label="Service"
              submitCount={submitCount}
              character={<MdStar />}
              className="overall_rating_stars"
              style={{ fontSize: 32, color: '#008489' }}
            />
          </Col>
          <Col>
            <Field
              component={AntRate}
              name="roomsRatings"
              label="Rooms"
              submitCount={submitCount}
              character={<MdStar />}
              className="overall_rating_stars"
              style={{ fontSize: 32, color: '#008489' }}
            />
          </Col>
          <Col>
            <Field
              component={AntRate}
              name="cleanlinessRatings"
              label="Cleanliness"
              submitCount={submitCount}
              character={<MdStar />}
              className="overall_rating_stars"
              style={{ fontSize: 32, color: '#008489' }}
            />
          </Col>
          <Col>
            <Field
              component={AntRate}
              name="foodRatings"
              label="Food"
              submitCount={submitCount}
              character={<MdStar />}
              className="overall_rating_stars"
              style={{ fontSize: 32, color: '#008489' }}
            />
          </Col>
        </Row>
        <Field
          component={AntInput}
          name="tips"
          type="text"
          label="Add a tip to help travelers choose a good room"
          placeholder="E. g. Best views, quieter floors, accessiblity, etc."
          submitCount={submitCount}
          hasFeedback
        />
        <UploadPhoto>
          <Label> Do You have photos to share? (Optional)</Label>
          <Label>Để hạn chế bandwidth của AWS bị exceeded nên chỉ cho upload mock data</Label>
          <Label>Xóa 1 tấm ảnh ở dưới mock để upload(Test upload ảnh AWS trong Profile)</Label>
          <Field
            component={PhotoUploadComponent}
            name="reviewPhotos"
            type="file"
            hasFeedback
            rows={4}
          />
        </UploadPhoto>
        <Label>Terms and Conditions</Label>
        <Field
          component={CheckBoxComp}
          name="termsAndCondition"
          checkBoxContent="I certify that this review is based on my own experience and is my
          genuine opinion of this hotel, and that I have no personal or business
          relationship with this establishment, and have not been offered any
          incentive or payment originating from the establishment to write this
          review. I understand that TripFinder has a zero-tolerance policy on
          fake reviews."
          hasFeedback
          rows={4}
        />

        <div className="submit-container">
          <Button htmlType="submit" type="primary" className="fill_button">
            Submit Your Review
          </Button>
        </div>
      </Form>
    </ReviewFormWrapper>
  );
}
