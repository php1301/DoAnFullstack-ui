/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */

// Snippet và custom react-dates snippet
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { ReactDatesStyleWrapper } from './ReactDates.style';
/*
 * Để áp dụng GPS enable code dưới [example : Vietnam]
 */
// import moment from 'moment';
// import 'moment/locale/vi';

class DateRangePickerBox extends Component {
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

  onDateChangeFunc = ({ startDate, endDate }) => {
    const { dateFormat } = this.state;
    this.setState({ startDate, endDate });
    if (startDate !== null && endDate !== null) {
      this.props.updateSearchData({
        setStartDate: startDate.format(dateFormat),
        setEndDate: endDate.format(dateFormat),
      });
    }
  };

  onFocusChangeFunc = (focusedInput) => this.setState({ focusedInput });

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    // DateRangePickerBox props list
    const {
      className,
      startDateId,
      endDateId,
      startDatePlaceholderText,
      endDatePlaceholderText,
      disabled,
      showClearDates,
      isRTL,
      orientation,
      anchorDirection,
      withPortal,
      withFullScreenPortal,
      small,
      block,
      numberOfMonths,
      regular,
      noBorder,
    } = this.props;

    // Add all classs to an array **************
    const addAllClasses = ['date_picker'];
    // className prop checking **************
    if (className) {
      addAllClasses.push(className);
    }

    // React-Dates DateRangePicker Props List
    const defaultCalendarProps = {
      startDateId: startDateId || 'start_unique_id',
      endDateId: endDateId || 'end_date_unique_id',
      startDate,
      endDate,
      focusedInput,
      onFocusChange: this.onFocusChangeFunc,
      onDatesChange: this.onDateChangeFunc,
      startDatePlaceholderText,
      endDatePlaceholderText,
      disabled,
      isRTL,
      showClearDates: showClearDates || false,
      orientation,
      anchorDirection,
      withPortal,
      withFullScreenPortal,
      small,
      numberOfMonths: numberOfMonths || 2,
      block,
      regular,
      noBorder,
    };

    return (
      <ReactDatesStyleWrapper className={addAllClasses.join(' ')}>
        <DateRangePicker {...defaultCalendarProps} />
      </ReactDatesStyleWrapper>
    );
  }
}

DateRangePickerBox.propTypes = {
  /** startDateId của the date-picker field */
  startDateId: PropTypes.string.isRequired,
  /** endDateId của the date-picker field */
  endDateId: PropTypes.string.isRequired, //
  /** startDatePlaceholderText của the date-picker field */
  startDatePlaceholderText: PropTypes.string,
  /** endDatePlaceholderText của the date-picker field */
  endDatePlaceholderText: PropTypes.string,
  /** disabled của the date-picker field */
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['START_DATE', 'END_DATE']),
  ]),

  /** showClearDates của the date-picker field */
  showClearDates: PropTypes.bool,
  /** isRTL của the date-picker field */
  isRTL: PropTypes.bool,
  /** orientation của the date-picker field */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** anchorDirection của the date-picker field */
  anchorDirection: PropTypes.oneOf(['left', 'right']),
  /** withPortal của the date-picker field */
  withPortal: PropTypes.bool,
  /** withFullScreenPortal của the date-picker field */
  withFullScreenPortal: PropTypes.bool,
  /** small của the date-picker field */
  small: PropTypes.bool,
  /** numberOfMonths của the date-picker field */
  numberOfMonths: PropTypes.number,
  /** block của the date-picker field */
  block: PropTypes.bool,
  /** regular của the date-picker field */
  regular: PropTypes.bool,
  /** noBorder của the date-picker field */
  noBorder: PropTypes.bool,
  /** updateSearchData của the date-picker field để gửi data của component đến parent component */
  updateSearchData: PropTypes.func,
};
export default DateRangePickerBox;
