/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Button from 'components/UI/Antd/Button/Button';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import DatePickerRange from 'components/UI/DatePicker/ReactDates';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import ReservationFormWrapper, {
  FormActionArea,
  FieldWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Reservation.style';

const RenderReservationForm = ({
  id, guestRoom, bedRoom, title, price, agentId, propertyType, lat, lng, address,
}) => {
  // form state
  const [formState, setFormState] = useState({
    startDate: null,
    endDate: null,
    room: 0,
    guest: 0,
  });

  // handle room guest increment decrement
  const handleIncrement = (type) => {
    setFormState({
      ...formState,
      [type]: formState[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (formState[type] <= 0) {
      return false;
    }
    setFormState({
      ...formState,
      [type]: formState[type] - 1,
    });
    return true;
  };

  const handleIncDecOnChnage = (e, type) => {
    const currentValue = e.target.value;

    setFormState({
      ...formState,
      [type]: currentValue,
    });
  };

  // handle date data lúc update
  const updateSearchDataFunc = (value) => {
    setFormState({
      ...formState,
      startDate: value.setStartDate,
      endDate: value.setEndDate,
    });
  };
  const calculateDaysLeft = (startDate, endDate) => {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, 'days');
  };
  const secret = uuidv4();
  const query = {
    id,
    title,
    secret,
    startDate: formState.startDate || 0,
    endDate: formState.endDate || 0,
    price,
    agentId,
    propertyType,
    lat,
    lng,
    address,
    room: (formState.room && parseInt(formState.room, 10)) || 0,
    guest: (formState.guest && parseInt(formState.guest, 10)) || 0,
    range: calculateDaysLeft(formState.startDate, formState.endDate),
    bedRoom: bedRoom && parseInt(bedRoom, 10),
    guestRoom: guestRoom && parseInt(guestRoom, 10),
  };
  // handleSubmit data mock
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.startDate !== 0 && query.endDate !== 0 && query.room !== 0 && query.guest !== 0) {
      Cookies.set('secret', secret);
      Router.push({
        pathname: '/payment',
        query,
      });
    } else {
      toast.error("Please fill out all Reservation's fields ", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <ReservationFormWrapper className="form-container" onSubmit={handleSubmit}>
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Dates" />
        <DatePickerRange
          startDateId="checkin-Id"
          endDateId="checkout-id"
          startDatePlaceholderText="Check In"
          endDatePlaceholderText="Check Out"
          updateSearchData={(value) => updateSearchDataFunc(value)}
          numberOfMonths={1}
          small
        />
      </FieldWrapper>
      <FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Guests" />
        <ViewWithPopup
          key={200}
          noView
          className={formState.room || formState.guest ? 'activated' : ''}
          view={(
            <Button type="default">
              <span>
                Room
                {formState.room > 0 && `: ${formState.room}`}
              </span>
              <span>-</span>
              <span>
                Guest
                {formState.guest > 0 && `: ${formState.guest}`}
              </span>
            </Button>
          )}
          popup={(
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Room</strong>
                <InputIncDec
                  id="room"
                  increment={() => handleIncrement('room')}
                  decrement={() => handleDecrement('room')}
                  onChange={(e) => handleIncDecOnChnage(e, 'room')}
                  value={formState.room}
                />
              </ItemWrapper>

              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  id="guest"
                  increment={() => handleIncrement('guest')}
                  decrement={() => handleDecrement('guest')}
                  onChange={(e) => handleIncDecOnChnage(e, 'guest')}
                  value={formState.guest}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          )}
        />
      </FieldWrapper>
      <FormActionArea>
        <Button htmlType="submit" type="primary">
          BOOK NOW
        </Button>
      </FormActionArea>
    </ReservationFormWrapper>
  );
};

export default RenderReservationForm;
