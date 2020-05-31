import React from 'react';
import { Marker } from 'react-google-maps';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';
// Render cụm marker được listed từ props data truyền vô - render khi toggle isOpen
const HotelMapMarkerCluster = (props) => {
  const locationArray = [];
  const {
    location, infoWindowToggle, isOpen, markerIndex,
  } = props;
  // Truyền props location từ việc click vô (trả data map tương ứng)
  if (location && location.length !== 0) {
    for (let i = 0; i < location.length; i++) {
      const { id } = location[i];
      const lat = parseFloat(location[i].location.lat);
      const lng = parseFloat(location[i].location.lng);
      const { title } = location[i];
      const thumbUrl = location[i].image.thumb_url;
      const { formattedAddress } = location[i].location;
      const { price } = location[i];
      const { rating } = location[i];
      const { ratingCount } = location[i];

      locationArray.push({
        id,
        lat,
        lng,
        title,
        thumbUrl,
        formattedAddress,
        price,
        rating,
        ratingCount,
      });
    }
  }

  return locationArray.map((singlePostLocation) => (
    <Marker
      key
      icon={MakerImage}
      position={singlePostLocation}
      onClick={() => {
        infoWindowToggle(singlePostLocation.id);
      }}
    >
      {isOpen && markerIndex === singlePostLocation.id ? (
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

export default HotelMapMarkerCluster;
