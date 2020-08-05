import React from 'react';
import Link from 'next/link';

import Carousel from 'react-multi-carousel';

import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';

import SectionTitle from 'components/SectionTitle/SectionTitle';
import Loader from 'components/Loader/Loader';
import ImageCard from 'components/ImageCard/ImageCard';

import { LISTING_POSTS_PAGE } from 'settings/constants';
import LocationWrapper, { CarouselSection } from './Locations.style';

const LocationGrid = ({ data, deviceType }) => (
  <LocationWrapper>
    <Container fluid>
      <SectionTitle
        title={<Heading content="Explore Destinations" />}
        link={(
          <Link href={`${LISTING_POSTS_PAGE}`}>
            <a>Show all</a>
          </Link>
            )}
      />

      <CarouselSection>
        {data.length !== 0 ? (
          <Carousel
            ssr
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 5,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 3,
              },
            }}
            deviceType={deviceType}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
          >
            {data.map((post) => (
              <ImageCard
                key
                imageSrc={post.locationImage.url}
                title={post.city}
                meta={`${post.numberOfPost} Hotels`}
                link={LISTING_POSTS_PAGE}
              />
            ))}
          </Carousel>
        ) : (
          <Loader />
        )}
      </CarouselSection>
    </Container>
  </LocationWrapper>
);

export default LocationGrid;
