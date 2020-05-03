import Head from 'next/head';
import Link from 'next/link';
import { getDeviceType } from '../library/helpers/get_device_type';
import GetAPIData from '../library/helpers/get_api_data';

import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import SearchArea from 'container/Home/Search/Search';
import LocationGrid from 'container/Home/Location/Location';

import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constants';
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from '../settings/config';
// eslint-disable-next-line arrow-body-style
const Home = ({
  deviceType,
  locationData,
  topHotelData,
  luxuryHotelData,
}) => {
  let limit;

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
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={topHotelData.slice(0, limit)}
          limit={limit}
          deviceType={deviceType}
        />
        <SectionTitle
          title={<Heading content="Top Luxury Hotel" />}
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
    deviceType, locationData, topHotelData, luxuryHotelData,
  };
};
export default Home;
