import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import {
  FaWifi, FaCarAlt, FaSwimmer, FaAirFreshener, FaBan,
} from 'react-icons/fa';
import {
  FiWifiOff,
} from 'react-icons/fi';
import {
  GiPoolDive,
  GiDespair,
} from 'react-icons/gi';
import IconCard from 'components/IconCard/IconCard';
import AmenitiesWrapper, { AmenitiesArea } from './Amenities.style';
import { TextButton } from '../SinglePageView.style';
import { Element } from 'react-scroll';

const Amenities = ({ titleStyle, linkStyle, amenities }) => (
  <Element name="amenities" className="Amenities">
    <AmenitiesWrapper>
      <Heading as="h2" content="Amenities" {...titleStyle} />
      <AmenitiesArea>
        {amenities[0].wifiAvailability
          ? <IconCard icon={<FaWifi />} title="Free wifi" />
          : <IconCard icon={<FiWifiOff />} title="No free wifi" />}
        {amenities[0].parkingAvailability
          ? <IconCard icon={<FaCarAlt />} title="Free parking" />
          : <IconCard icon={<FaBan />} title="No Free parking" />}
        {amenities[0].poolAvailability
          ? <IconCard icon={<FaSwimmer />} title="Free pool" />
          : <IconCard icon={<GiPoolDive />} title="No Free pool" />}
        {amenities[0].airCondition
          ? <IconCard icon={<FaAirFreshener />} title="Air Condition" />
          : <IconCard icon={<GiDespair />} title="No Air Condition" />}
      </AmenitiesArea>
      <TextButton>
        <Link href="#1">
          <a style={{ ...linkStyle }}>Show all amenities</a>
        </Link>
      </TextButton>
    </AmenitiesWrapper>
  </Element>
);

Amenities.propTypes = {
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

Amenities.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: ['14px', '20px', '30px'],
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
};

export default Amenities;
