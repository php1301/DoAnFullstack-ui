/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { Formik } from 'formik';
import { IoIosArrowBack } from 'react-icons/io';
import { Progress } from 'antd';
// FormStepper show các step đang làm của action base on progressbar và number của step
// Solution khác https://ant.design/components/steps/
class PercentageCalculator extends React.Component {
  render() {
    const { formchild, pageStack, lastPage } = this.props;
    const original = formchild ? formchild.length : 0;
    let value = 0;

    if (original !== pageStack) {
      value = Math.floor((pageStack * 100) / original);
    } else if (original === pageStack) {
      value = 100;
    } else {
      value = 0;
    }

    return (
      <>
        {lastPage ? (
          <Progress percent={100} showInfo={false} />
        ) : (
          <Progress percent={value} showInfo={false} />
        )}
      </>
    );
  }
}

// tham khảo từ https://stackoverflow.com/questions/53357934/react-js-form-how-to-include-all-values-n-final-page
class FormStepper extends Component {
  // children là các formcon
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = (values) => {
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));
  };

  previous = () => this.setState((state) => ({
    page: Math.max(state.page - 1, 0),
  }));

  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  // eslint-disable-next-line consistent-return
  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;

    if (isLastPage) {
      return onSubmit(values, bag);
    }
    bag.setTouched({});
    bag.setSubmitting(false);
    this.next(values);
  };

  render() {
    const { children, validationSchema } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <>
        <PercentageCalculator
          formchild={this.props.children}
          pageStack={page}
          lastPage={isLastPage}
        />
        <Formik
          initialValues={values}
          enableReinitialize={false}
          validate={this.validate}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
          render={({
            renderValues, handleSubmit, isSubmitting, handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="steps-content">{activePage}</div>
              <div className="steps-action">
                <div className="inner-wrapper">
                  {page > 0 && (
                  <button
                    type="button"
                    className="back-step-btn"
                    onClick={this.previous}
                  >
                    <IoIosArrowBack />
                    {' '}
                    Back
                  </button>
                  )}

                  {!isLastPage && (
                  <button className="next-step-btn" type="submit">
                    Next
                  </button>
                  )}
                  {isLastPage && (
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  )}
                </div>
              </div>
            </form>
          )}
        />
      </>
    );
  }
}
export default FormStepper;
