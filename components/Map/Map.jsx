// chủ yếu xử lý Marker
// customize từ https://tomchentw.github.io/react-google-maps/#!/MarkerClusterer/1

import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import {
  compose, withProps, withHandlers, withStateHandlers,
} from 'recompose';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import HotelMapMarkerCluster from './ListingPageMap';
import HotelMapMarkerSingle from './SinglePageMap';

import { MAPSTYLE } from './MapStyle';

// div của map
export const MapLoadingElement = (mapLoadingProps) => {
  const { height } = mapLoadingProps;
  return <div style={{ height }} />;
};

export const mapRenderData = {
  // url để lấy
  googleMapURL: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  // Data load
  loadingElement: <MapLoadingElement height="100%" />,
  // container
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '400px' }} />,
};

export const MapDataProcessing = compose(
  withProps(mapRenderData),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      // console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      // console.log(clickedMarkers);
    },
  }),
  // Xử lý state với recompose
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      infoWindowToggle: ({ isOpen }) => (index) => ({
        isOpen: !isOpen,
        markerIndex: index,
      }),
    },
  ),
  withScriptjs,
  withGoogleMap,
)((props) => {
  const { multiple } = props;
  return (
    <>
      {multiple && multiple === true ? (
        <GoogleMap
          styles={MAPSTYLE}
          defaultZoom={7}
          defaultCenter={{
            lat: 42.2268,
            lng: -76.4359,
          }}
        >
          <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            defaultEnableRetinaIcons
            gridSize={60}
          >
            <HotelMapMarkerCluster {...props} />
          </MarkerClusterer>
        </GoogleMap>
      ) : (
        <GoogleMap
          styles={MAPSTYLE}
          defaultZoom={8}
          defaultCenter={{
            lat: props.location.lat,
            lng: props.location.lng,
          }}
        >
          <HotelMapMarkerSingle {...props} />
        </GoogleMap>
      )}
    </>
  );
});

const Map = ({ children }) => <>{children}</>;

export default Map;
