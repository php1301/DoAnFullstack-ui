/* eslint-disable no-shadow */
import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';
import  _ from 'lodash';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import GridCard from '../GridCard/GridCard';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
export default function ProductCard({
  title,
  rating,
  location,
  price,
  ratingCount,
  gallery,
  slug,
  link,
  deviceType,
  id,
  heart,
  type,
  reviews
}) {
  let total = Math.round(_.sumBy(reviews, 'reviewOverall') * 10) / 10;
  reviews && reviews.length > 0 ? total /= reviews.length : total = Math.floor(Math.random() * 5)
  const totalRating =  reviews && reviews.length === 0 && total < 1   ? 0 : (reviews && reviews.length)
  return (
    <GridCard
      favorite={type !=='index' && (
        <Favourite
          heart={heart}
          id={id}
          // onClick={(event) => {
          //   console.log(event);
          // }}
        />
      )}
      location={location[0] ? location[0].formattedAddress : 'Somewhere on the Map'}
      title={title}
      price={`$${price}.00/Night - Free Cancellation`}
      rating={<Rating rating={(reviews && total) || rating} ratingCount={type!=='index' ? totalRating : ratingCount} type="bulk" />}
      viewDetailsBtn={type !=='index' &&(
        <Link href={{
          pathname:`${link}/[...slug]`, //Catch all routes, tức là abc/slug/a/b/c,...
          query:{id}
        }} 
        // Pass data bằng query object
          as={`${link}/${slug}/${id}`} prefetch={false}>
          <a>
            <FiExternalLink />
            {' '}
            View Details
          </a>
        </Link>
      )}
    >
      <Carousel
        ssr
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        deviceType={deviceType}
        showDots
        sliderClass=""
        slidesToSlide={1}
      >
        {gallery.map(({ url, title }) => (
          <img
            src={url}
            alt={title}
            key={uuidv4()}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
        ))}
      </Carousel>
    </GridCard>
  );
}
