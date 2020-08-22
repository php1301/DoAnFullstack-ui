/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Radio from 'components/UI/Antd/Radio/Radio';

/*
 *
 *  Property Form Component
 *
 */

export const WifiAvailability = ({ field, form, ...props }) => {
  // Kỹ thuật thêm options cho Radiobox
  const getPropertyType = {
    identifier: 'wifiAvailability',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Paid', value: 'paid' },
    ],
  };

  //   Có thể dùng useRef thay thế
  const [wifiAvailability, setWifiAvailability] = useState('');

  return (
    <Radio.Group
      options={getPropertyType.options}
      value={wifiAvailability}
      onChange={(e) => {
        setWifiAvailability(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};


/*
 *
 *  Parking Form Component
 *
 */

export const Parking = ({ field, form, ...props }) => {
  const getParkingType = {
    identifier: 'parking',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
  };
  const [parking, setParking] = useState('');

  return (
    <Radio.Group
      options={getParkingType.options}
      value={parking}
      onChange={(e) => {
        setParking(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};

/*
   *
   *  Pool Form Component
   *
   */

export const Pool = ({ field, form, ...props }) => {
  const getPool = {
    identifier: 'pool',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
  };
  const [pool, setPool] = useState('');
  return (
    <Radio.Group
      value={pool}
      options={getPool.options}
      onChange={(e) => {
        setPool(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};

/*
   *
   *  AirCondition Form Component
   *
   */

export const AirCondition = ({ field, form, ...props }) => {
  const getAirCondition = {
    identifier: 'airCondition',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
  };
  const [airCondition, setAirCondition] = useState('');
  return (
    <Radio.Group
      value={airCondition}
      options={getAirCondition.options}
      onChange={(e) => {
        setAirCondition(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};

/*
   *
   *  Extra Bed Form Component
   *
   */

export const ExtraBed = ({ field, form, ...props }) => {
  const getExtraBed = {
    identifier: 'extraBed',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
  };
  const [extraBed, setExtraBed] = useState('');
  return (
    <Radio.Group
      value={extraBed}
      options={getExtraBed.options}
      onChange={(e) => {
        setExtraBed(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};

export const IsNegotiable = ({ field, form, ...props }) => {
  const isNegotiableValue = {
    identifier: 'isNegotiable',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
  };
  const [isNegotiable, setNegotiable] = useState('');
  return (
    <Radio.Group
      value={isNegotiable}
      options={isNegotiableValue.options}
      onChange={(e) => {
        setNegotiable(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};
export const PropertyType = ({ field, form, ...props }) => {
  const propertyTypeValue = {
    name: 'propertyType',
    identifier: 'propertyType',
    options: [
      { label: 'Villa', value: 'Villa' },
      { label: 'Hotel', value: 'Hotel' },
      { label: 'Resort', value: 'Resort' },
      { label: 'Cottage', value: 'Cottage' },
      { label: 'Duplex', value: 'Duplex' },
      { label: 'Landscape', value: 'Landscape' },
    ],
  };
  const [propertyType, setPropertyType] = useState('');
  return (
    <Radio.Group
      value={propertyType}
      options={propertyTypeValue.options}
      onChange={(e) => {
        setPropertyType(e.target.value);
        form.setFieldValue(field.name, e.target.value);
      }}
    />
  );
};
