import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Map, { MapDataProcessing } from 'components/Map/Map';
import Loader from 'components/Loader/Loader';
import { FixedMap } from './Listing.style';

const ListingMap = (props) => {
  const { mapData, loading } = props;
  return (
    <FixedMap>
      {isEmpty(mapData) || loading ? (
        <Loader />
      ) : (
        <Map>
          <MapDataProcessing location={mapData} multiple />
        </Map>
      )}
    </FixedMap>
  );
};

export default ListingMap;
