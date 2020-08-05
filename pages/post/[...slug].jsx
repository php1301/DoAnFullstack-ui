import { useState } from 'react';
import { useQuery } from 'react-apollo';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
// import isEmpty from 'lodash/isEmpty';
import Sticky from 'react-stickynode';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Modal from 'components/UI/Antd/Modal/Modal';
import Button from 'components/UI/Antd/Button/Button';
import Container from 'components/UI/Container/Container';
import Loader from 'components/Loader/Loader';
import useWindowSize from 'library/hooks/useWindowSize';
import { ReviewProvider } from 'context/ReviewProvider';
// import { getDeviceType } from 'library/helpers/get_device_type';
// import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';

import Description from 'container/SinglePage/Description/Description';
import Amenities from 'container/SinglePage/Amenities/Amenities';
import Location from 'container/SinglePage/Location/Location';
import Review from 'container/SinglePage/Review/Review';
import Reservation from 'container/SinglePage/Reservation/Reservation';
import BottomReservation from 'container/SinglePage/Reservation/BottomReservation';
import TopBar from 'container/SinglePage/TopBar/TopBar';
import { GET_HOTEL_INFO } from 'apollo-graphql/query/query';
import SinglePageWrapper, {
  PostImage,
} from 'container/SinglePage/SinglePageView.style';

import PostImageGallery from 'container/SinglePage/ImageGallery/ImageGallery';

const SinglePostPage = ({
  // processedData,
  query, user,
  // deviceType,
}) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  let widthWindow = 0;
  // Xử lý window của SSR
  if (typeof window !== 'undefined') {
    const { width } = useWindowSize();
    widthWindow = width;
  }
  // if (isEmpty(processedData)) return <Loader />;
  //   Destructuring default data
  //   Custom tag Title theo query
  const headerTitle = query.slug[0]
    .split('-')
    .join(' ')
    .charAt(0)
    .toUpperCase()
    + query.slug[0]
      .split('-')
      .join(' ')
      .slice(1);
  const { loading, error, data: processedData } = useQuery(GET_HOTEL_INFO, {
    variables: {
      id: query.slug[1],
    },
  });
  if (loading) return <Loader />;
  const {
    reviews,
    rating,
    ratingCount,
    price,
    title,
    gallery,
    location,
    content,
    amenities,
    agentName,
    agentEmail,
    contactNumber,
    image,
    peopleLiked,
  } = processedData.getHotelInfo;
  const heart = peopleLiked.findIndex((id) => user.id === id.id) !== -1 ? 1 : -1;
  return (
    <>
      <Head>
        <title>
          Hotel |
          {' '}
          {headerTitle}
        </title>
      </Head>
      <ReviewProvider reviews={reviews}>
        <SinglePageWrapper>
          <ToastContainer />
          <PostImage>
            <Button
              type="primary"
              onClick={() => setIsModalShowing(true)}
              className="image_gallery_button"
            >
              View Photos
            </Button>
            <Modal
              visible={isModalShowing}
              onCancel={() => setIsModalShowing(false)}
              footer={null}
              width="100%"
              maskStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
              wrapClassName="image_gallery_modal"
              closable={false}
            >
              <>
                <PostImageGallery gallery={gallery} />
                <Button
                  onClick={() => setIsModalShowing(false)}
                  className="image_gallery_close"
                >
                  <svg width="16.004" height="16" viewBox="0 0 16.004 16">
                    <path
                      id="_ionicons_svg_ios-close_2_"
                      d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                      transform="translate(-160.5 -160.55)"
                      fill="#909090"
                    />
                  </svg>
                </Button>
              </>
            </Modal>
          </PostImage>

          <TopBar title={title} media={gallery} id={query.slug[1]} heart={heart} />

          <Container>
            <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
              <Col xl={16}>
                <Description
                  content={content}
                  title={title}
                  location={location}
                  rating={rating}
                  ratingCount={ratingCount}
                />
                <Amenities amenities={amenities} />
                <Location
                  title={title}
                  location={location[0]}
                  rating={rating}
                  ratingCount={ratingCount}
                  image={image}
                  price={price}
                />
              </Col>
              <Col xl={8}>
                {widthWindow > 991 ? (
                  <Sticky
                    innerZ={999}
                    activeClass="isSticky"
                    top={202}
                    bottomBoundary="#reviewSection"
                  >
                    <Reservation
                      agentEmail={agentEmail}
                      contactNumber={contactNumber}
                      agentName={agentName}
                      title={title}
                      price={price}
                      rating={rating}
                      ratingCount={ratingCount}
                    />
                  </Sticky>
                ) : (
                  <BottomReservation
                    agentEmail={agentEmail}
                    contactNumber={contactNumber}
                    agentName={agentName}
                    title={title}
                    price={price}
                    rating={rating}
                    ratingCount={ratingCount}
                  />
                )}
              </Col>
            </Row>
            <Row gutter={30}>
              <Col xl={16}>
                <Review
                  hotelId={query.slug[1]}
                  reviews={reviews}
                  ratingCount={ratingCount}
                  rating={rating}
                  user={user}
                />
              </Col>
              <Col xl={8} />
            </Row>
          </Container>
        </SinglePageWrapper>
      </ReviewProvider>
    </>
  );
};

// SinglePostPage.getInitialProps = async ({ query, req }) => {
//   // console.log(query);
//   // const apiUrl = [
//   //   {
//   //     endpoint: 'hotel-single',
//   //     name: 'hotelSingleData',
//   //   },
//   // ];
//   // const pageData = await GetAPIData(apiUrl);
//   // const processedData = ProcessAPIData(pageData);
//   const deviceType = getDeviceType(req);

//   return { query };
// };
// export async function getStaticPaths() {
//   return {
//     paths: [
//       // String variant:
//       '/blog/first-post',
//       // Object variant:
//       { params: { slug: 'second-post' } },
//     ],
//     fallback: true,
//   };
// }
export async function getServerSideProps({ query }) {
  return { props: { query } };
  // Fetch necessary data for the blog post using params.id
}

export default SinglePostPage;
