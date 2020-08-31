import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Waypoint } from 'react-waypoint';
// import { i18n, withTranslation } from '../i18n';

import { getDeviceType } from 'library/helpers/get_device_type';
import GetAPIData from 'library/helpers/get_api_data';

import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import SearchArea from 'container/Home/Search/Search';
import LocationGrid from 'container/Home/Location/Location';
import IntlMessages from 'library/helpers/i18n';
import { LayoutContext } from 'context/LayoutProvider';
import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constants';
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from '../settings/config';
// import Loader from 'components/Loader/Loader';
// eslint-disable-next-line arrow-body-style
const Home = ({
  // t,
  deviceType,
  locationData,
  topHotelData,
  luxuryHotelData,
}) => {
  // if (typeof window === 'undefined') return <Loader />;
  // const deviceType = getDeviceType();
  let limit;
  const [, dispatch] = useContext(LayoutContext);

  if (deviceType === 'mobile') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE;
  }
  if (deviceType === 'tablet') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE;
  }

  if (deviceType === 'desktop') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE;
  }
  return (
    <>
      <Head>
        <title>Hotel | Palace</title>
      </Head>
      <SearchArea />
      <Waypoint
        onEnter={() => dispatch({ type: 'HIDE_TOP_SEARCHBAR' })}
        onLeave={() => dispatch({ type: 'SHOW_TOP_SEARCHBAR' })}
      />
      {/* Style Location riêng */}
      <LocationGrid data={locationData} deviceType={deviceType} />
      <Container fluid>
        <SectionTitle
          title={<Heading content="Top Travelers' Choice" />}
          link={(
            <Link href={LISTING_POSTS_PAGE}>
              <a>
                Show all
              </a>
            </Link>
          )}
        />
        {/* Truyền param 1 post dạng grid */}
        <SectionGrid
          type="index"
          link={LISTING_POSTS_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={topHotelData.slice(0, limit)}
          limit={limit}
          deviceType={deviceType}
        />
        <SectionTitle
          title={<Heading content="Top luxury hotel" />}
          link={(
            <Link href={LISTING_POSTS_PAGE}>
              <a>
                Show all
              </a>
            </Link>
          )}
        />
        <IntlMessages id="uiElements.badge.basicExampleSubTitle" />
        {/* <button
          type="button"
          onClick={() =>  i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en'); }
        >
          {t('common.change-locale', { locale: 'VI' })}
        </button> */}
        {/* Truyền param 1 post dạng grid */}
        <SectionGrid
          type="index"
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={luxuryHotelData.slice(0, limit)}
          limit={limit}
          deviceType={deviceType}
        />
      </Container>
    </>
  );
};
Home.getInitialProps = async ({ req }) => {
  const deviceType = getDeviceType(req);
  const apiUrl = [
    {
      endpoint: 'location',
      name: 'locationData',
    },
    {
      endpoint: 'top-hotel',
      name: 'topHotelData',
    },
    {
      endpoint: 'hotel',
      name: 'luxuryHotelData',
    },
  ];
  const pageData = await GetAPIData(apiUrl);
  let locationData = [];
  let topHotelData = [];
  let luxuryHotelData = [];
  if (pageData) {
    pageData.forEach((item) => {
      if (item.name === 'locationData') {
        // clone lại mảng item.data, có thể log ra để xem
        locationData = item.data ? [...item.data] : [];
      } else if (item.name === 'topHotelData') {
        topHotelData = item.data ? [...item.data] : [];
      } else if (item.name === 'luxuryHotelData') {
        luxuryHotelData = item.data ? [...item.data] : [];
      }
    });
  }
  return {
    deviceType, locationData, topHotelData, luxuryHotelData, namespacesRequired: ['common'],
  };
};
// export default withTranslation('common')(Home);

// Nếu path là dynamic thì cần hàm dưới

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { ... } } // See the "paths" section below
//     ],
//     fallback: true or false // See the "fallback" section below
//   };
// }

// export async function getStaticProps() {
//   const apiUrl = [
//     {
//       endpoint: 'location',
//       name: 'locationData',
//     },
//     {
//       endpoint: 'top-hotel',
//       name: 'topHotelData',
//     },
//     {
//       endpoint: 'hotel',
//       name: 'luxuryHotelData',
//     },
//   ];
//   const pageData = await GetAPIData(apiUrl);
//   let locationData = [];
//   let topHotelData = [];
//   let luxuryHotelData = [];
//   if (pageData) {
//     pageData.forEach((item) => {
//       if (item.name === 'locationData') {
//         // clone lại mảng item.data, có thể log ra để xem
//         locationData = item.data ? [...item.data] : [];
//       } else if (item.name === 'topHotelData') {
//         topHotelData = item.data ? [...item.data] : [];
//       } else if (item.name === 'luxuryHotelData') {
//         luxuryHotelData = item.data ? [...item.data] : [];
//       }
//     });
//   }
//   return {
//     props: {
//       locationData, topHotelData, luxuryHotelData, namespacesRequired: ['common'],
//     },
//   };
// }
export default Home;
