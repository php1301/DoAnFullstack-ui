/* eslint-disable no-const-assign */
import React, { useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { createBrowserHistory } from 'history';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import Slider from 'components/UI/Antd/Slider/Slider';
import Button from 'components/UI/Antd/Button/Button';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';

import { SearchContext } from 'context/SearchProvider';
import { setStateToUrl } from 'library/helpers/url_handler';
import {
  priceInit,
  calendarItem,
  getAmenities,
  getPropertyType,
} from '../SearchParams';
import CategroySearchWrapper, {
  RoomGuestWrapper,
  ItemWrapper,
  ActionWrapper,
} from './CategorySearch.style';

const history = process.browser ? createBrowserHistory() : 'false';
const location = process.browser && window.location;

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'amenities':
      return { ...state, amenities: action.payload };
    case 'property':
      return { ...state, property: action.payload };
    case 'date_range':
      return {
        ...state,
        setStartDate: action.payload.setStartDate,
        setEndDate: action.payload.setEndDate,
      };
    case 'price':
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    case 'roomGuestReset':
      return {
        ...state,
        room: action.payload.room,
        guest: action.payload.guest,
      };
    case 'reset':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
// eslint-disable-next-line no-unused-vars
const CategorySearch = (props) => {
  const { state, dispatch } = useContext(SearchContext);
  const initialState = {
    amenities: state.amenities ?? [],
    property: state.property ?? [],
    setStartDate: state.setStartDate ?? null,
    setEndDate: state.setEndDate ?? null,
    minPrice: parseInt(state.minPrice, 10) ?? 0,
    maxPrice: parseInt(state.maxPrice, 10) ?? 100,
    location_lat: state.location_lat ?? null,
    location_lng: state.location_lng ?? null,
    room: parseInt(state.room, 10) || 0,
    guest: parseInt(state.guest, 10) || 0,
  };

  // bắn hành state đến reducer
  const [current, dispatchCurrent] = useReducer(searchReducer, initialState);

  // trả state
  const [countRoom, setRoom] = useState(current.room);
  const [countGuest, setGuest] = useState(current.guest);

  // data handling
  const onChange = (value, type) => {
    let query = {};
    const modifiedCurrent = current;

    Object.keys(modifiedCurrent).forEach((key) => {
      switch (key) {
        case 'date_range':
          delete modifiedCurrent.date_range;
          break;
        case 'price':
          delete modifiedCurrent.price;
          break;
        default:
          break;
      }
    });

    if (type === 'date_range') {
      query = {
        ...current,
        setStartDate: value.setStartDate,
        setEndDate: value.setEndDate,
      };
      dispatchCurrent({ type, payload: value });
    } else if (type === 'price') {
      query = {
        ...current,
        minPrice: value ? value[0] : 0,
        maxPrice: value ? value[1] : 100,
      };
      dispatchCurrent({ type, payload: query });
    } else if (type === 'reset') {
      // Reset lại CategorySearch
      setRoom(0);
      setGuest(0);
      query = {
        ...current,
        setStart: null,
        setEndDate: null,
        room: 0,
        guest: 0,
        amenities: [],
        property: [],
        minPrice: 0,
        maxPrice: 100,
        location_lat: null,
        location_lng: null,
      };
      dispatchCurrent({ type, payload: query });
    } else {
      // value của previous search
      query = {
        ...current,
        [type]: value,
      };
      dispatchCurrent({ type, payload: value });
    }
    const params = setStateToUrl(query);
    dispatch({
      type: 'UPDATE',
      payload: {
        ...current, ...query,
      },
    });
    history.push({
      ...location,
      search: params,
    });
  };

  const handleRoomGuestApply = () => {
    const query = {
      ...current,
      room: countRoom,
      guest: countGuest,
    };
    const params = setStateToUrl(query);
    history.push({
      ...location,
      search: params,
    });
  };

  const handleRoomGuestCancel = () => {
    setRoom(0);
    setGuest(0);
    const query = {
      ...current,
      room: 0,
      guest: 0,
    };
    // lợi dụng action roomGuestReset
    dispatchCurrent({ type: 'roomGuestReset', payload: query });
    const params = setStateToUrl(query);
    history.push({
      ...location,
      search: params,
    });
  };
  // gắn class cho datePicker và price
  const dateRangeActivateClass = current
  && current.setStartDate !== undefined && current.setEndDate !== undefined
  && current.setStartDate !== null && current.setEndDate !== null
    ? 'activated'
    : '';
  const priceRangeActivateClass = current
    && current.minPrice !== undefined && current.maxPrice !== undefined
    && current.minPrice === 0 && current.maxPrice === 100
    ? ''
    : 'activated';

  let amenitiesLength = 0;
  let propertyLength = 0;
  let amenities = [];
  let property = [];
  if (current && current.amenities && typeof current.amenities === 'string') {
    amenities = current.amenities.split(',');
    amenitiesLength = amenities.length;
  } else if (current && current.amenities && current.amenities.length) {
    // Không phải mảng string
    amenities = current.amenities;
    amenitiesLength = current.amenities.length;
  }

  if (current && current.property && typeof current.property === 'string') {
    property = current.property.split(',');
    propertyLength = property.length;
  } else if (current && current.property && current.property.length) {
    property = current.property;
    propertyLength = current.property.length;
  }

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={amenitiesLength ? 'activated' : ''}
        key={getAmenities.id}
        noView
        view={(
          <Button type="default">
            {getAmenities.name}
            {amenitiesLength > 0 && `: ${amenitiesLength}`}
          </Button>
      )}
        popup={(
          <Checkbox.Group
            options={getAmenities.options}
            defaultValue={amenities}
            onChange={(value) => onChange(value, 'amenities')}
          />
      )}
      />

      <ViewWithPopup
        className={propertyLength ? 'activated' : ''}
        key={getPropertyType.id}
        noView
        view={(
          <Button type="default">
            {getPropertyType.name}
            {propertyLength > 0 && `: ${propertyLength}`}
          </Button>
      )}
        popup={(
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={(value) => onChange(value, 'property')}
          />
      )}
      />

      <ViewWithPopup
        className={dateRangeActivateClass}
        key={400}
        noView
        view={<Button type="default">Choose Date</Button>}
        popup={(
          <DateRangePickerBox
            startDateId="startDate-id-category"
            endDateId="endDate-id-category"
            startDate={
            current.setStartDate ? moment(current.setStartDate) : null
          }
            endDate={current.setEndDate ? moment(current.setEndDate) : null}
            numberOfMonths={1}
            small
            item={calendarItem}
            updateSearchData={(value) => onChange(value, 'date_range')}
          />
      )}
      />

      <ViewWithPopup
        className={priceRangeActivateClass}
        key={300}
        noView
        view={(
          <Button type="default">
            {current.minPrice > 0 || current.maxPrice < 100
              ? `Price Range: ${current.minPrice}, ${current.maxPrice}`
              : 'Price per night'}
          </Button>
      )}
        popup={(
          <Slider
            range
            marks={priceInit}
            min={0}
            max={100}
            defaultValue={[current.minPrice, current.maxPrice]}
            onAfterChange={(value) => onChange(value, 'price')}
          />
      )}
      />

      <ViewWithPopup
        key={200}
        noView
        className={countRoom || countGuest ? 'activated' : ''}
        view={(
          <Button type="default">
            Room
            {' '}
            {countRoom > 0 && `: ${countRoom}`}
            , Guest
            {countGuest > 0 && `: ${countGuest}`}
          </Button>
      )}
        popup={(
          <RoomGuestWrapper>
            <ItemWrapper>
              <strong>Room</strong>
              <InputIncDec
                id="room"
                increment={() => setRoom((count) => count + 1)}
                decrement={() => setRoom((count) => count > 0 && count - 1)}
                onChange={(e) => setRoom(e.target.value)}
                value={countRoom}
              />
            </ItemWrapper>

            <ItemWrapper>
              <strong>Guest</strong>
              <InputIncDec
                id="guest"
                increment={() => setGuest((count) => count + 1)}
                decrement={() => setGuest((count) => count > 0 && count - 1)}
                onChange={(e) => setGuest(e.target.value)}
                value={countGuest}
              />
            </ItemWrapper>

            <ActionWrapper>
              {countRoom || countGuest ? (
                <Button type="default" onClick={handleRoomGuestCancel}>
                  Cancel
                </Button>
              ) : (
                ''
              )}
              <Button type="primary" onClick={handleRoomGuestApply}>
                Apply
              </Button>
            </ActionWrapper>
          </RoomGuestWrapper>
      )}
      />

      <ViewWithPopup
        key={100}
        noView
        view={<Button type="default">Reset</Button>}
        popup={(
          <Button onClick={() => onChange(initialState, 'reset')}>
            Reset Search Page URL
          </Button>
      )}
      />
    </CategroySearchWrapper>
  );
};

export default CategorySearch;
