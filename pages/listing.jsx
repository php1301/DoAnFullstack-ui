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

const FilterDrawer = dynamic(
  () => import('container/Listing/Search/MobileSearchView'),
);
const ListingPage = ({
  processedData, deviceType,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(SearchContext);
  const statekey = SearchStateKeyCheck(state);

  // states
  const [posts, setPosts] = useState(
    processedData.data.slice(0, LISTING_PAGE_POST_LIMIT) || [],
  );

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (statekey === true) {
      const newData = SearchedData(processedData);
      setPosts(newData);
    } else {
      setPosts(processedData.data.slice(0, LISTING_PAGE_POST_LIMIT) || []);
    }
  }, [statekey]);
  // Chỉ rerun khi stateKey thay doi

  const handleMapToggle = () => {
    setShowMap((showMapState) => !showMapState);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const data = Paginator(posts, processedData, LISTING_PAGE_POST_LIMIT);
      setPosts(data);
      setLoading(false);
    }, 1000);
  };

  // Xử lý responsive
  let columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP;
  if (showMap) {
    columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITH_MAP;
  }
  let columnCount = 'col-24';
  if (deviceType === 'desktop' && showMap === true) {
    columnCount = 'col-12';
  }

  return (
    <ListingWrapper>
      <Head>
        <title>Listing | A react next listing template</title>
      </Head>

      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
        deviceType === 'desktop' ? <CategorySearch /> : <FilterDrawer />
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
      <PostsWrapper className={columnCount}>
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={columnWidth}
          deviceType={deviceType}
          data={posts}
          totalItem={processedData.data.length}
          limit={LISTING_PAGE_POST_LIMIT}
          loading={loading}
          handleLoadMore={handleLoadMore}
          placeholder={<PostPlaceholder />}
        />
      </PostsWrapper>
      {showMap && <ListingMap loading={loading} mapData={posts} />}
    </ListingWrapper>
  );
};

// Kĩ thuật async await getData
ListingPage.getInitialProps = async ({ req, query }) => {
  // custom query để fetch data

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
