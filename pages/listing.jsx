import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';

import ListingMap from 'container/Listing/ListingMap';
import CategorySearch from 'container/Listing/Search/CategorySearch/CategorySearch';

import { SearchContext } from 'context/SearchProvider';

import GetAPIData, {
  Paginator,
  SearchedData,
  SearchStateKeyCheck,
  ProcessAPIData,
} from 'library/helpers/get_api_data';
import { getDeviceType } from 'library/helpers/get_device_type';

import { SINGLE_POST_PAGE } from 'settings/constants';
import {
  LISTING_PAGE_POST_LIMIT,
  LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP,
  LISTING_PAGE_COLUMN_WIDTH_WITH_MAP,
} from 'settings/config';

import ListingWrapper, {
  PostsWrapper,
  ShowMapCheckbox,
} from 'container/Listing/Listing.style';

const ListingPage = ({
  deviceType,
}) => {
  const [showMap, setShowMap] = useState(false);

  const handleMapToggle = () => {
    setShowMap((showMapState) => !showMapState);
  };
  return (
    <ListingWrapper>
      <Head>
        <title>Listing | A react next listing template</title>
      </Head>

      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
        deviceType === 'desktop' ? <CategorySearch /> : ''
      }
          right={(
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Show map
              </Checkbox>
            </ShowMapCheckbox>
      )}
        />
      </Sticky>
    </ListingWrapper>
  );
};

// Kĩ thuật async await getData
ListingPage.getInitialProps = async ({ req, query }) => {
  const apiUrl = [
    {
      endpoint: 'hotel',
      name: 'listingHotel',
    },
  ];
  const pageData = await GetAPIData(apiUrl);
  const processedData = ProcessAPIData(pageData);
  const deviceType = getDeviceType(req);
  return { processedData, query, deviceType };
};

export default ListingPage;
