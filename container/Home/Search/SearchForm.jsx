import React, { useState, useContext } from 'react';
import Router, { withRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { FaMapMarkerAlt, FaRegCalendar, FaUserFriends } from 'react-icons/fa';
// import MapAutoComplete from 'components/Map/MapAutoComplete';
import Button from '../../../components/UI/Antd/Button/Button';
import InputIncDec from '../../../components/UI/InputIncDec/InputIncDec';
import DateRangePickerBox from '../../../components/UI/DatePicker/ReactDates';
import { MapDataHelper } from 'components/Map/MapLocationBox';
import ViewWithPopup from '../../../components/UI/ViewWithPopup/ViewWithPopup';

import {
  FormWrapper,
  ComponentWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Search.style';

import { LISTING_POSTS_PAGE } from '../../../settings/constants';
