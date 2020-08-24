/* eslint-disable no-mixed-operators */
/* eslint-disable no-const-assign */
import React, { useState, useContext, useReducer } from 'react';
import { useMutation } from 'react-apollo';
import moment from 'moment';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Slider from 'components/UI/Antd/Slider/Slider';
import InputNumber from 'components/UI/Antd/InputNumber/InputNumber';
import Button from 'components/UI/Antd/Button/Button';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import Radiobox from 'components/UI/Antd/Radio/Radio';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';

import { GET_ALL_HOTELS } from 'apollo-graphql/query/query';
import { SORT_HOTEL, FILTER_HOTELS } from 'apollo-graphql/mutation/mutation';
import { SearchContext } from 'context/SearchProvider';
import { setStateToUrl } from 'library/helpers/url_handler';
import {
  priceInit,
  calendarItem,
  getAmenities,
  getPropertyType,
  sortListing,
} from '../SearchParams';
import CategroySearchWrapper, {
  RoomGuestWrapper,
  ItemWrapper,
  ActionWrapper,
} from './CategorySearch.style';
import { Popover } from 'antd';
import Heading from 'components/UI/Heading/Heading';


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
    case 'priceInputMin':
      return {
        ...state,
        minPrice: action.payload.minPrice,
      };
    case 'priceInputMax':
      return {
        ...state,
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
  const { typeSort, setType, setStateFilter } = props;
  const initialState = {
    amenities: state.amenities ?? [],
    property: state.property ?? [],
    setStartDate: state.setStartDate ?? null,
    setEndDate: state.setEndDate ?? null,
    minPrice: parseInt(state.minPrice, 10) ?? 0,
    maxPrice: parseInt(state.maxPrice, 10) ?? 100,
    location_lat: state.location_lat ?? null,
    location_lng: state.location_lng ?? null,
    country_short: state.country_short ?? null,
    room: parseInt(state.room, 10) || 0,
    guest: parseInt(state.guest, 10) || 0,
  };

  // bắn initialState đến reducer
  const [current, dispatchCurrent] = useReducer(searchReducer, initialState);
  const [sortHotel] = useMutation(SORT_HOTEL);
  const [filterHotel] = useMutation(FILTER_HOTELS);
  // trả state
  const [visible, setVisibility] = useState(false);
  const [countRoom, setRoom] = useState(current.room);
  const [countGuest, setGuest] = useState(current.guest);

  const [inputMin, setInputMin] = useState(current.minPrice);
  const [inputMax, setInputMax] = useState(current.maxPrice);
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
    } else if (type === 'reset') {
      // Reset lại CategorySearch
      setRoom(0);
      setGuest(0);
      setInputMin(0);
      setInputMax(0);
      query = {
        ...current,
        setStart: null,
        setEndDate: null,
        room: 0,
        guest: 0,
        amenities: [],
        property: [],
        minPrice: 0,
        maxPrice: 0,
        location_lat: null,
        location_lng: null,
        country_short: null,
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

  // Price
  const onChangeRange = (value) => {
    if (value[0] < value[1]) {
      setInputMin(value[0]);
      setInputMax(value[1]);
    }
  };
  const onChangeMin = (value) => {
    setInputMin(value);
  };
  const onChangeMax = (value) => {
    if (value > inputMin) setInputMax(value);
  };
  const handlePriceRange = () => {
    const query = {
      ...current,
      minPrice: inputMin,
      maxPrice: inputMax,
    };
    dispatchCurrent({ type: 'price', payload: query });
    dispatch({
      type: 'UPDATE',
      payload: {
        ...current, ...query,
      },
    });
    const params = setStateToUrl(query);
    history.push({
      ...location,
      search: params,
    });
  };

  // RoomGuest
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
  // gắn class
  const dateRangeActivateClass = current
  && current.setStartDate !== undefined && current.setEndDate !== undefined
  && current.setStartDate !== null && current.setEndDate !== null
    ? 'activated'
    : '';
  const priceRangeActivateClass = inputMin > 0 || inputMax > 0
    ? 'activated'
    : '';

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

  const sortHotelList = (type) => {
    // console.log(type);
    setType(type);
    sortHotel({
      variables: {
        type,
      },
      refetchQueries: () => [
        {
          query: GET_ALL_HOTELS,
          variables: {
            type,
          },
        },
      ],
      awaitRefetchQueries: true,
    });
  };
  const handleFilter = () => {
    setStateFilter(state);
    filterHotel({
      refetchQueries: () => [
        {
          query: GET_ALL_HOTELS,
          variables: {
            search: {
              minPrice: (state && state.minPrice && parseInt(state.minPrice, 10)) || 0,
              maxPrice: (state && state.maxPrice && parseInt(state.maxPrice, 10)) || 1000,
            },
            property: (state && state.property) || undefined,
            amenities: {
              wifiAvailability: (state && _.includes(state.amenities, 'free-wifi')) || undefined,
              poolAvailability: (state && _.includes(state.amenities, 'pool')) || undefined,
              parkingAvailability: (state && _.includes(state.amenities, 'free-parking')) || undefined,
              airCondition: (state && _.includes(state.amenities, 'air-condition')) || undefined,
              // rooms,
              // guest,
            },
          },
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore',
        },
      ],
    });
  };
  // const handleFilter = debounce((val) => {
  //   this.props.onSearch(val);
  // }, 250);
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
            onChange={(value) => {
              onChange(value, 'amenities');
            }}
          />
      )}
      />
      <ViewWithPopup
        // className={amenitiesLength ? 'activated' : ''}
        key={sortListing.id}
        noView
        view={(
          <Button type="default">
            {sortListing.name}
            {/* {amenitiesLength > 0 && `: ${amenitiesLength}`} */}
          </Button>
      )}
        popup={(
          <>
            <Heading as="h6" content="Rating và Rating count được random ở những data null" />
            <Heading as="h6" content="Có thể sẽ sort sai" />
            <Heading as="h6" content="Hotels có số (reviews) bên cạnh rating là data chuẩn" />
            <Radiobox.Group
              options={sortListing.options}
              defaultValue={typeSort}
              onChange={(value) => {
                sortHotelList(value.target.value);
              }}
            />
          </>
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

      <Popover
        content={(
          <>
            <Col span={16}>
              <Slider
                range
                marks={priceInit}
                min={0}
                max={1000}
                value={[inputMin, inputMax]}
                onChange={onChangeRange}
              />
            </Col>
            <Row>
              <Col span={8}>
                <InputNumber
                  min={0}
                  max={inputMax - 1 === -1 ? 0 : inputMax - 1}
                  style={{ margin: '0 16px' }}
                  value={inputMin}
                  onChange={onChangeMin}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={inputMin}
                  max={1000}
                  style={{ margin: '0 16px' }}
                  value={inputMax}
                  onChange={onChangeMax}
                />
              </Col>
            </Row>
            <ActionWrapper>
              <Button type="primary" onClick={handlePriceRange}>
                Apply
              </Button>
            </ActionWrapper>
          </>
      )}
        key={100}
        overlayClassName={priceRangeActivateClass}
        trigger="click"
        placement="bottom"
        visible={visible}
        onVisibleChange={() => { setVisibility(!visible); }}
      >
        <Button
          className={`price_range ${priceRangeActivateClass}`}
          type="default"
        >
          {inputMin && inputMin !== 0 || inputMax && inputMax !== 0
            ? `Price Range: ${inputMin}, ${inputMax}`
            : 'Price per night'}
        </Button>
      </Popover>


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
        key={300}
        noView
        view={<Button type="default">Reset</Button>}
        popup={(
          <Button onClick={() => { onChange(initialState, 'reset'); setStateFilter(null); }}>
            Reset Search Page URL
          </Button>
      )}
      />
      <ViewWithPopup
        key={600}
        noView
        view={<Button type="default">Apply Filter</Button>}
        popup={(
          <Button onClick={() => handleFilter()}>
            Apply Filter
          </Button>
      )}
      />
    </CategroySearchWrapper>
  );
};

export default CategorySearch;
