/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { AntInput, AntTextArea } from 'components/UI/Antd/AntdInputWithFormik';
// import InputBox from './InputBox';
import { BillingFormWrapper, InputBoxWrapper } from 'container/Payment/Payment.style';
import IntlMessages from 'library/helpers/i18n';


const required = (value) => (value ? undefined : 'Required');
const billingFormValidationSchema = () => Yup.object().shape({
  billingEmail: Yup.string()
    .email('Please enter a valid email'),
});
const BillingForm = ({
  first_name, last_name, email, billingFormRef,
}) => {
  const billingFormValue = {
    billingFirstName: first_name,
    billingLastName: last_name,
    billingEmail: email,
    billingCompany: '',
    billingMobile: '',
    billingNote: '',
  };
  return (
    <Formik
      innerRef={billingFormRef}
      initialValues={billingFormValue}
      validationSchema={billingFormValidationSchema}
    >
      <BillingFormWrapper className="isoBillingForm">
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>
              <IntlMessages id="checkout.billingform.firstname" />
              <span style={{ color: 'red' }} className="asterisk">*</span>
            </label>
            <Field
              component={AntInput}
              name="billingFirstName"
              type="text"
              validate={required}
              placeholder="Write your First Name here"
              hasFeedback
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>
              <IntlMessages id="checkout.billingform.lastname" />
              <span style={{ color: 'red' }} className="asterisk">*</span>
            </label>
            <Field
              component={AntInput}
              name="billingLastName"
              type="text"
              validate={required}
              placeholder="Write your hotel name here"
              hasFeedback
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>
              <IntlMessages id="checkout.billingform.company" />
            </label>
            <Field
              component={AntInput}
              name="billingCompany"
              type="text"
              placeholder="Write your Billing Company here"
              hasFeedback
            />
          </InputBoxWrapper>
        </div>

        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>
              <IntlMessages id="checkout.billingform.email" />
              <span style={{ color: 'red' }} className="asterisk">*</span>
            </label>
            <Field
              component={AntInput}
              name="billingEmail"
              type="text"
              validate={required}
              placeholder="Write your Billing Email here"
              hasFeedback
            />
          </InputBoxWrapper>
          <InputBoxWrapper className="isoInputBox">
            <label>
              <IntlMessages id="checkout.billingform.mobile" />
            </label>
            <Field
              component={AntInput}
              name="billingNumber"
              type="number"
              placeholder="Write your Billing Contact Number here"
              hasFeedback
            />
          </InputBoxWrapper>
        </div>
        <div className="isoInputFieldset">
          <InputBoxWrapper className="isoInputBox">
            <label>
              <h3>Add note for Hotel Manager</h3>
            </label>
            <Field
              component={AntTextArea}
              name="billingNote"
              type="text"
              placeholder="Write Note for Hotel Manager"
              hasFeedback
            />
          </InputBoxWrapper>
        </div>
      </BillingFormWrapper>
    </Formik>
  );
};
export default BillingForm;
