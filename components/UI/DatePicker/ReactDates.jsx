/* eslint-disable react/destructuring-assignment */

// Snippet và custom react-dates snippet
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { ReactDatesStyleWrapper } from './ReactDates.style';
/*
 * Để áp dụng GPS enable code dưới [example : Vietnam]
 */
// import moment from 'moment';
// import 'moment/locale/vi';

class ReactDates extends Component {
  constructor(props) {
    super(props);
    const separator = this.props.item && this.props.item.separator
      ? this.props.item.separator
      : '/';
    const dateFormat = this.props.item && this.props.item.format
      ? this.props.item.format
      : 'llll';
    this.state = {
      focusedInput: null,
      startDate: this.props.startDate ? this.props.startDate : null,
      endDate: this.props.endDate ? this.props.endDate : null,
      dateFormat,
      separator,
    };
    this.onDateChangeFunc = this.onDateChangeFunc.bind(this);
    this.onFocusChangeFunc = this.onFocusChangeFunc.bind(this);
    /*
     * For Localization enable this code [example : French language as "fr"]
     */
    // moment.locale('fr');
  }

  render() {
    return (
      <div />
    );
  }
}

export default ReactDates;
