/* eslint-disable no-nested-ternary */
import React from 'react';
import ErrorPage from 'container/404/404';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return <ErrorPage error={statusCode} />;
  }
}
export default Error;
