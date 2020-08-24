import React, { useState } from 'react';
import Map from '../Map/Map';
import MapWithSearchBox from '../Map/MapSearchBox';
import MapLocationBox, { MapDataHelper } from '../Map/MapLocationBox';

// field: { name, value, onChange, onBlur }
// form: các values, setXXXX, handleXXXX, dirty - thuộc tính formik, isValid, status, etc,
export const FormMapComponent = ({ field, form, ...props }) => {
  let tempFormData = [];
  const [formLocationState, setFormLocationState] = useState([]);
  return (
    <Map>
      <MapWithSearchBox
    // draggable={true}
        updatevalue={(value) => {
          tempFormData = MapDataHelper(value);
          form.setFieldValue(field.name, tempFormData);
          setFormLocationState(value);
        }}
        {...field}
        {...props}
      />
      <MapLocationBox infoValue={formLocationState} />
    </Map>
  );
};
