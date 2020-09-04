/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import Input from '../UI/Antd/Input/Input';

const SearchInput = compose(
  // Snippet của react-google-maps, custom lại
  // https://tomchentw.github.io/react-google-maps/#!/Documentation
  withProps({
    googleMapURL: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  withScriptjs,
)((props) => {
  const { getInputValue } = props;
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const handleOnChange = (event) => {
    //   '13' === 'enter'
    if (event.which === '13') {
      event.preventDefault();
      event.stopPropagation();
      // stop render thêm
    }
    setLocationInput({
      searchedLocation: event.target.value,
    });
  };
  const refs = useRef({});
  const onPlacesChanged = () => {
    // getPlaces API của googlemaps
    const places = refs.current.getPlaces();
    // set data khi chọn cho ô input
    setLocationInput({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places || [], // places ? places : []
    });
    getInputValue({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places || [], // places ? places : []
    });
  };
  const handleOnPressEnter = (event) => {
    if (event.which === '13') {
      event.preventDefault();
      event.stopPropagation();
    }
    setLocationInput({ searchedLocation: event.target.value });
    getInputValue(locationInput);
  };
  return (
    <div className="map_autocomplete">
      <StandaloneSearchBox ref={refs} onPlacesChanged={onPlacesChanged}>
        <label>
          Search
          <Input
            type="text"
            defaultValue=""
            value={locationInput.searchedLocation || ''}
            placeholder="Search “Vietnam, Asia”"
            size="large"
            onChange={handleOnChange}
            onPressEnter={handleOnPressEnter}
          />
        </label>
      </StandaloneSearchBox>
    </div>
  );
});
const MapAutoComplete = (props) => {
  const { updateValue } = props;
  return <SearchInput getInputValue={updateValue} />;
};

export default MapAutoComplete;
