import React, { useContext } from 'react';
import Router, { withRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { FiSearch } from 'react-icons/fi';
import MapAutoComplete from 'components/Map/MapAutoComplete';
import { MapDataHelper } from 'components/Map/MapLocationBox';
import { SearchContext } from 'context/SearchProvider';
import { setStateToUrl } from 'library/helpers/url_handler';
import { NavbarSearchWrapper } from './Header.style';

const NavbarSearch = () => {
  const { state, dispatch } = useContext(SearchContext);
  const initialState = {
    amenities: state.amenities ?? [],
    property: state.property ?? [],
    setStartDate: state.setStartDate ?? null,
    setEndDate: state.setEndDate ?? null,
    minPrice: parseInt(state.minPrice, 10) ?? 0,
    maxPrice: parseInt(state.maxPrice, 10) ?? 0,
    location_lat: state.location_lat ?? null,
    location_lng: state.location_lng ?? null,
    country_short: state.country_short ?? null,
    room: parseInt(state.room, 10) ?? 0,
    guest: parseInt(state.guest, 10) ?? 0,
  };
  const updateValueFunc = (value) => {
    const { searchedPlaceAPIData } = value;
    const tempLocation = [];
    const mapData = !isEmpty(searchedPlaceAPIData)
      ? MapDataHelper(searchedPlaceAPIData)
      : [];
    if (!isEmpty(mapData) && mapData.length !== 0) {
      mapData.forEach((singleMapData) => {
        tempLocation.push({
          // toFixed - làm tròn
          location_lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
          location_lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
          country_short: singleMapData ? singleMapData.country_short : 'O',
        });
      });
    }

    const searchLocation = tempLocation ? tempLocation[0] : {};
    // Customize query
    if (!isEmpty(searchLocation)) {
      const query = {
        location_lat: parseFloat(searchLocation.location_lat),
        location_lng: parseFloat(searchLocation.location_lng),
        country_short: searchLocation.country_short,
      };
      const params = setStateToUrl(query);
      dispatch({
        type: 'UPDATE',
        payload: {
          ...initialState,
          ...query,
        },
      });
      Router.push({
        pathname: '/listing',
        query: params,
      });
    }
  };
  return (
    <NavbarSearchWrapper className="navbar_search">
      <MapAutoComplete updateValue={(value) => updateValueFunc(value)} />
      <FiSearch />
    </NavbarSearchWrapper>
  );
};
export default withRouter(NavbarSearch);
