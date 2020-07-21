import React, { useState, useContext, useReducer } from 'react';
import moment from 'moment';
import { createBrowserHistory } from 'history';
import Heading from 'components/UI/Heading/Heading';
import Slider from 'components/UI/Antd/Slider/Slider';
import Drawer from 'components/UI/Antd/Drawer/Drawer';
import Button from 'components/UI/Antd/Button/Button';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import DateRangePicker from 'components/UI/DatePicker/ReactDates';
import { setStateToUrl } from 'library/helpers/url_handler';
import { SearchContext } from 'context/SearchProvider';
import { IoIosArrowDown } from 'react-icons/io';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import {
  priceInit,
  calendarItem,
  getAmenities,
  getPropertyType,
} from './SearchParams';
import {
  FilterArea,
  FilterElementsWrapper,
  ButtonGroup,
  RoomGuestWrapper,
  ItemWrapper,
} from './MobileSearchView.style';

const history = process.browser ? createBrowserHistory() : false;
const location = process.browser && window.location;

function searchReducer(state, action) {
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
    case 'room':
      return {
        ...state,
        room: action.payload.room,
      };
    case 'guest':
      return {
        ...state,
        guest: action.payload.guest,
      };
    case 'reset':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// eslint-disable-next-line no-unused-vars
const FilterDrawer = (props) => {
  const { state, dispatch } = useContext(SearchContext);
  const initialState = {
    amenities: state.amenities || [],
    property: state.property || [],
    setStartDate: state.setStartDate || null,
    setEndDate: state.setEndDate || null,
    minPrice: parseInt(state.minPrice, 10) || 0,
    maxPrice: parseInt(state.maxPrice, 10) || 100,
    location_lat: state.location_lat || null,
    location_lng: state.location_lng || null,
    room: parseInt(state.room, 10) || 0,
    guest: parseInt(state.guest, 10) || 0,
  };
  const [current, dispatchCurrent] = useReducer(searchReducer, initialState);
  // state for drawer
  const [toggle, setToggle] = useState(false);
  // Room guest state
  const [countRoom, setRoom] = useState(current.room);
  const [countGuest, setGuest] = useState(current.guest);

  // Toggle Drawer
  const handleToggleDrawer = () => {
    setToggle(!toggle);
  };

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
    } else if (type === 'room') {
      query = {
        ...current,
        room: value || 0,
      };
      dispatchCurrent({ type, payload: query });
    } else if (type === 'guest') {
      query = {
        ...current,
        guest: value || 0,
      };
      dispatchCurrent({ type, payload: query });
    } else if (type === 'reset') {
      setRoom(0);
      setGuest(0);
      query = {
        ...current,
        setStartDate: null,
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
      query = {
        ...current,
        [type]: value,
      };
      dispatchCurrent({ type, payload: value });
    }
  };
  const handleApplyFilter = () => {
    const params = setStateToUrl(current);
    dispatch({
      type: 'UPDATE',
      payload: {
        ...current,
      },
    });
    history.push({
      ...location,
      search: params,
    });
    setToggle(false);
  };

  const handleCloseDrawer = () => {
    setRoom(0);
    const query = {
      setStartDate: null,
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
    dispatchCurrent({ type: 'reset', payload: query });
    dispatch({
      type: 'UPDATE',
      payload: {
        ...current,
        ...query,
      },
    });
    const params = setStateToUrl(query);
    history.push({
      ...location,
      search: params,
    });
    setToggle(false);
  };

  return (
    <FilterArea>
      <Button className={toggle ? 'active' : ''} onClick={handleToggleDrawer}>
        More filters
      </Button>
      <Drawer
        className="filter_drawer"
        height="100vh"
        placement="bottom"
        closable={false}
        maskClosable={false}
        onClose={handleCloseDrawer}
        visible={toggle}
        maskStyle={{ backgroundColor: 'transparent' }}
      >
        <FilterElementsWrapper>
          <Accordion allowZeroExpanded>
            {/* Start amenities filter element */}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Heading as="h4" content="Amenities" />
                  <IoIosArrowDown />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Checkbox.Group
                  options={getAmenities.options}
                  value={current.amenities}
                  onChange={(value) => onChange(value, 'amenities')}
                />
              </AccordionItemPanel>
            </AccordionItem>
            {/* End of amenities filter element */}

            {/* Start property type filter element */}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Heading as="h4" content="Property Type" />
                  <IoIosArrowDown />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Checkbox.Group
                  options={getPropertyType.options}
                  value={current.property}
                  onChange={(value) => onChange(value, 'property')}
                />
              </AccordionItemPanel>
            </AccordionItem>
            {/* End of property type filter element */}

            {/* Start price range filter element */}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Heading as="h4" content="Select Price Range" />
                  <IoIosArrowDown />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Slider
                  range
                  marks={priceInit}
                  min={0}
                  max={100}
                  defaultValue={[current.minPrice, current.maxPrice]}
                  onAfterChange={(value) => onChange(value, 'price')}
                />
              </AccordionItemPanel>
            </AccordionItem>
            {/* End of price range filter element */}

            {/* Start date filter element */}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Heading as="h4" content="Choose Date" />
                  <IoIosArrowDown />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <DateRangePicker
                  startDateId="startDate-id-mobile"
                  endDateId="endDate-id-mobile"
                  startDate={
                    current.setStartDate ? moment(current.setStartDate) : null
                  }
                  endDate={
                    current.setEndDate ? moment(current.setEndDate) : null
                  }
                  numberOfMonths={1}
                  small
                  item={calendarItem}
                  updateSearchData={(value) => onChange(value, 'date_range')}
                />
              </AccordionItemPanel>
            </AccordionItem>
            {/* End of date filter element */}

            {/* Room & Guest type filter element */}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Heading as="h4" content="Choose Room and Guest" />
                  <IoIosArrowDown />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <RoomGuestWrapper>
                  <ItemWrapper>
                    <strong>Room</strong>
                    <InputIncDec
                      id="room"
                      increment={() => {
                        setRoom((count) => count + 1);
                        onChange(countRoom + 1, 'room');
                      }}
                      decrement={() => {
                        setRoom((count) => count > 0 && count - 1);
                        onChange(
                          (count) => count > 0 && count - 1,
                          'room',
                        );
                      }}
                      value={countRoom}
                    />
                  </ItemWrapper>

                  <ItemWrapper>
                    <strong>Guest</strong>
                    <InputIncDec
                      id="guest"
                      increment={() => {
                        setGuest((count) => count + 1);
                        onChange(countGuest + 1, 'guest');
                      }}
                      decrement={() => {
                        setGuest(
                          (count) => count > 0 && count - 1,
                        );
                        onChange(
                          (count) => count > 0 && count - 1,
                          'guest',
                        );
                      }}
                      value={countGuest}
                    />
                  </ItemWrapper>
                </RoomGuestWrapper>
              </AccordionItemPanel>
            </AccordionItem>
            {/* End of Room & Guest type filter element */}
          </Accordion>

          <ButtonGroup>
            <Button onClick={handleCloseDrawer}>Cancel Filter</Button>
            <Button type="primary" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </ButtonGroup>
        </FilterElementsWrapper>
      </Drawer>
    </FilterArea>
  );
};

export default FilterDrawer;
