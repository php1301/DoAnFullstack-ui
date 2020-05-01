/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import GlideCarousel, {
  GlideSlide,
} from 'components/UI/GlideCarousel/GlideCarousel';
// slider images

import SearchForm from './SearchForm';

import bannerBg1 from 'assets/images/banner/1.jpg';
import bannerBg2 from 'assets/images/banner/2.jpg';
import bannerBg3 from 'assets/images/banner/3.jpg';
import BannerWrapper, { SearchWrapper } from './Search.style';

const HomeSearch = ({ searchTitleStyle, searchDescriptionStyle }) => {
  return (
    <BannerWrapper>
      <GlideCarousel
        controls={false}
        options={{ gap: 0, autoplay: 5000, animationDuration: 1000 }}
        bullets
        numberOfBullets={3}
      >
        <>
          <GlideSlide>
            <img src={bannerBg1} alt="Banner" />
          </GlideSlide>
          <GlideSlide>
            <img src={bannerBg2} alt="Banner" />
          </GlideSlide>
          <GlideSlide>
            <img src={bannerBg3} alt="Banner" />
          </GlideSlide>
        </>
      </GlideCarousel>

      <Container>
        <SearchWrapper>
          <Heading
            {...searchTitleStyle}
            content="Latest reviews. Lowest prices."
          />
          <Text
            {...searchDescriptionStyle}
            content="Compares prices from hunreds of booking sites to find the most suitable hotel just for you"
          />
          <SearchForm />
        </SearchWrapper>
      </Container>
    </BannerWrapper>
  );
};

HomeSearch.propTypes = {
  searchTitleStyle: PropTypes.object,
  searchDescriptionStyle: PropTypes.object,
};
// advance inline style sử dụng props
HomeSearch.defaultProps = {
  searchTitleStyle: {
    color: '#2C2C2C',
    fontSize: ['20px', '24px', '28px'],
    lineHeight: ['28px', '30px', '30px'],
    mb: '9px',
  },
  searchDescriptionStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    lineHeight: '18px',
    mb: '30px',
  },
};

export default HomeSearch;
