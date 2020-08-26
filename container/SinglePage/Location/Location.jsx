/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import LocationWrapper from './Location.style';
import Map, { MapDataProcessing } from 'components/Map/Map';
import { Element } from 'react-scroll';

const Location = ({
  titleStyle,
  locationMetaStyle,
  contentStyle,
  boldContentStyle,
  linkStyle,
  locationDescription,
  location,
  ...props
}) => {
  const { formattedAddress, country_long, city } = location;
  return (
    <Element name="location" className="location">
      <LocationWrapper>
        <Heading as="h2" content="Location" {...titleStyle} />
        <Text content={`${formattedAddress} ${country_long} ${city}`} {...locationMetaStyle} />
        <Text
          content="Take an easy walk to the main historic sites of the city. The
          neighborhood is perfect for an authentic taste of Roman life, with
          shops, art galleries, restaurants, bars, and clubs all nearby and
          ready to be discovered."
          {...contentStyle}
        />
        <Text
          content={`Location Description: ${locationDescription || 'No more context for this location'}`}
          {...contentStyle}
        />
        <Text
          content="Distance from Leonardo da Vinci International Airport"
          {...contentStyle}
          {...boldContentStyle}
        />
        <Text content="26 mins by car without traffic" {...contentStyle} />
        <Map>
          <MapDataProcessing location={location} multiple={false} {...props} />
        </Map>
      </LocationWrapper>
    </Element>
  );
};

Location.propTypes = {
  titleStyle: PropTypes.object,
  locationMetaStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

Location.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  locationMetaStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#909090',
    mb: ['14px', '20px', '27px'],
  },
  contentStyle: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: '1.6',
    mb: ['14px', '20px', '27px'],
  },
  boldContentStyle: {
    fontWeight: '700',
    mb: '0!important',
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
};

export default Location;
