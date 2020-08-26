import React from 'react';
import { Marker } from 'react-google-maps';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';
// Render map cho trang details của từng hotel - truyền data tương tự theo query
const SingleMapDisplay = (props) => {
  const locationArray = [];
  const TXIDLocation = [];
  const {
    location,
    infoWindowToggle,
    isOpen,
    markerIndex,
    rating,
    ratingCount,
    image,
    price,
    title,
  } = props;
  if (location && location.type && location.type === 'txid') {
    TXIDLocation.push({
      lat: location && location.lat,
      lng: location && location.lng,
      formattedAddress: location && location.formattedAddress,
    });
  }
  locationArray.push({
    lat: location && location.lat,
    lng: location && location.lng,
    id: location && location.id,
    title,
    thumbUrl: image && image.thumb_url,
    formattedAddress: location && location.formattedAddress,
    price,
    rating,
    ratingCount,
  });

  return locationArray.map((singlePostLocation) => (
    <Marker
      key
      icon={MakerImage}
      position={singlePostLocation}
      onClick={() => {
        if (location && location.type && location.type !== 'txid') infoWindowToggle(singlePostLocation.id);
      }}
    >
      {isOpen && markerIndex === singlePostLocation.id && location && location.type && location.type !== 'txid' ? (
        <HotelInfoWindow
          postData={singlePostLocation}
          onCloseClick={() => {
            infoWindowToggle(singlePostLocation.id);
          }}
        />
      ) : (
        ''
      )}
    </Marker>
  ));
};

const HotelMapMarkerSingle = (props) => <SingleMapDisplay {...props} />;

export default HotelMapMarkerSingle;
