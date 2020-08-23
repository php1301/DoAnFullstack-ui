/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-apollo';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Sticky from 'react-stickynode';
import _ from 'lodash';
import Loader from 'components/Loader/Loader';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import useWindowSize from 'library/hooks/useWindowSize';
// import { withApolloClient } from 'apollo-graphql/ApolloProvider';
import { GET_ALL_HOTELS, GET_HEART } from 'apollo-graphql/query/query';
import ListingMap from 'container/Listing/ListingMap';
import CategorySearch from 'container/Listing/Search/CategorySearch/CategorySearch';
import { SearchContext } from 'context/SearchProvider';
import GetAPIData, {
  Paginator,
  SearchedData,
  SearchStateKeyCheck,
  ProcessAPIData,
} from 'library/helpers/get_api_data';
// import { getDeviceType } from 'library/helpers/get_device_type';

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

const FilterDrawer = dynamic(() => import('container/Listing/Search/MobileSearchView'));
const ListingPage = ({
  // deviceType,
  user,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(SearchContext);
  const statekey = SearchStateKeyCheck(state);
  const [posts, setPosts] = useState([]);
  const [stateFilter, setStateFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [type, setType] = useState('price_DESC');
  const { width } = useWindowSize();
  const { data: processedData, loading: listingLoading } = useQuery(GET_ALL_HOTELS, {
    variables: {
      type,
      location: {
        country_short: state && state.country_short && state.country_short[0] || undefined,
      },
      search: {
        minPrice: (stateFilter && stateFilter.minPrice
           && parseInt(stateFilter.minPrice, 10)) || 0,
        maxPrice: (stateFilter && stateFilter.maxPrice
          && parseInt(stateFilter.maxPrice, 10)) || 1000,
      },
      property: (stateFilter && stateFilter.property) || undefined,
      amenities: {
        wifiAvailability: (stateFilter && _.includes(stateFilter.amenities, 'free-wifi')) || undefined,
        poolAvailability: (stateFilter && _.includes(stateFilter.amenities, 'pool')) || undefined,
        parkingAvailability: (stateFilter && _.includes(stateFilter.amenities, 'free-parking')) || undefined,
        airCondition: (stateFilter && _.includes(stateFilter.amenities, 'air-condition')) || undefined,
        // rooms,
        // guest,
      },
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  });
  // const { data: filteredData, loading: filteredLoading } = useQuery(GET_FILTERED_HOTELS, {

  // });

  const {
    loading: heartLoading,
    data,
  } = useQuery(GET_HEART, {
    variables: {
      uid: user && user.id || '',
    },
  });
  useEffect(() => {
    if (processedData && processedData.getAllHotels) {
      // console.log(processedData);
      // processedData = data;
      setPosts(processedData.getAllHotels.slice(0, LISTING_PAGE_POST_LIMIT) || []);
    }
  }, [processedData]);
  // useEffect(() => {
  //   if (filteredData && filteredData.getFilteredHotels) {
  //     // console.log(processedData);
  //     // processedData = data;
  //     setPosts(filteredData.getFilteredHotels.slice(0, LISTING_PAGE_POST_LIMIT) || []);
  //   }
  // }, [filteredData]);

  useEffect(() => {
    if (statekey === true) {
      const newData = SearchedData(processedData);
      setPosts(newData);
    } else {
      setPosts((processedData && processedData.getAllHotels.slice(0, LISTING_PAGE_POST_LIMIT))
      || []);
    }
  }, [statekey]);
  if (listingLoading) return <Loader />;
  if (heartLoading) return <Loader />;
  // if (filteredLoading) return <Loader />;
  // console.log(filteredData);
  // console.log(processedData);
  // console.log(posts);

  // const heart = processedData.getAllHotels.peopleLiked
  //   .findIndex((id) => user.id === id.id) !== -1 ? 1 : -1;
  const favourite_post = data && data.userPosts.favourite_post ? data.userPosts.favourite_post : [];
  // Comment dưới là lodash chaining usage
  // let mock = [];
  // mock = _.chain(processedData.getAllHotels).map(({
  //   title,
  //   location,
  //   slug,
  //   status,
  //   price,
  //   isNegotiable,
  //   propertyType,
  //   condition,
  //   rating,
  //   ratingCount,
  //   contactNumber,
  //   termsAndCondition,
  //   amenities,
  //   gallery,
  //   categories,
  // }) => ({
  //   title,
  //   location,
  //   slug,
  //   status,
  //   price,
  //   isNegotiable,
  //   propertyType,
  //   condition,
  //   rating,
  //   ratingCount,
  //   contactNumber,
  //   termsAndCondition,
  //   amenities,
  //   gallery,
  //   categories,
  // })).omit(['id']).value();
  // console.log(mock);

  // 2 + iterators, cách giải quyết ObjectIterator
  // Có thể tách riêng lẻ rồi xài _.merge
  const seed = () => {
    const mock = _.map(processedData.getAllHotels, ({
      title,
      content,
      location,
      slug,
      status,
      image,
      price,
      isNegotiable,
      propertyType,
      condition,
      rating,
      ratingCount,
      contactNumber,
      termsAndCondition,
      amenities,
      gallery,
      categories,
    }) => ({
      title,
      content,
      location,
      slug,
      status,
      image,
      price,
      isNegotiable,
      propertyType,
      condition,
      rating,
      ratingCount,
      contactNumber,
      termsAndCondition,
      amenities,
      gallery,
      categories,
    }));
    // Bỏ field id từ mock

    // Ko mutate original array bằng cách su dung destruturing thay vi delete
    // const newArr = mock.forEach((i) => {
    //   i.amenities.map(({ id, ...amenities })=>amenities);
    // });

    // Mutate bang cach su dụng delete, ảnh hưởng tới performance
    // mock.forEach((i) => {
    //   Object.entries(i).forEach((v) => {
    //     if (typeof v[1] === 'object') {
    //       Object.keys(v[1]).forEach((t) => {
    //         _.unset(mock, t.id);
    //       });
    //     }
    //     // i.v.forEach((t) => {
    //     //   if(t.id)
    //     //   console.log(t.id);
    //     // });
    //   });
    // });

    mock.forEach((i) => {
      i.categories.forEach((v) => {
        delete v.id;
      });
      // i.location.forEach((v) => {
      //   delete v.id;
      // });
      delete i.location.id;
      i.amenities.forEach((v) => {
        delete v.id;
      });
      i.gallery.forEach((v) => {
        delete v.id;
      });
      delete i.image.id;
    });
    // console.log(mock);
    fetch('http://localhost:3000/api/mock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Nhớ body phải match Content-Type
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(mock),
    });
  };
  // states


  // Chỉ rerun khi stateKey thay doi

  const handleMapToggle = () => {
    setShowMap((showMapState) => !showMapState);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const data = Paginator(posts, processedData.getAllHotels, LISTING_PAGE_POST_LIMIT);
      setPosts(data);
      setLoading(false);
    }, 1000);
  };

  // Xử lý responsive
  let columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP;
  if (showMap) {
    columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITH_MAP;
  }
  const columnCount = 'col-24';
  // if (deviceType === 'desktop' && showMap === true) {
  //   columnCount = 'col-12';
  // }
  // Chữa cháy bugs mobile-detect

  // processedData = data;
  // Lib mobile detect bị bug, sử dụng useWindowSize
  return (
    <ListingWrapper>
      <Head>
        <title>Listing | A react next listing template</title>
      </Head>

      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
            width > 991 ? (
              <CategorySearch typeSort={type} setType={setType} setStateFilter={setStateFilter} />
            ) : (
              <FilterDrawer typeSort={type} setType={setType} setStateFilter={setStateFilter} />
            )
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
          // deviceType={deviceType}
          type="listing"
          data={posts}
          totalItem={processedData.getAllHotels.length}
          limit={LISTING_PAGE_POST_LIMIT}
          loading={loading}
          heart={favourite_post}
          handleLoadMore={handleLoadMore}
          placeholder={<PostPlaceholder />}
        />
      </PostsWrapper>
      {showMap && <ListingMap loading={loading} mapData={posts} />}
      {/* <button type="button" onClick={seed}>Seed mock data</button> */}
    </ListingWrapper>
  );
};
// Kĩ thuật async await getData

// ListingPage.getInitialProps = async ({ req, query }) => {
//   // custom query để fetch data

//   const apiUrl = [
//     {
//       endpoint: 'hotel',
//       name: 'listingHotel',
//     },
//   ];
//   const pageData = await GetAPIData(apiUrl);
//   const processedData = ProcessAPIData(pageData);
//   const deviceType = getDeviceType(req);
//   return { processedData, query, deviceType };
// };

export async function getServerSideProps({ query }) {
  return { props: { query } };
}
export default ListingPage;
