import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import Rating from 'components/UI/Rating/Rating';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import Button from 'components/UI/Antd/Button/Button';
import DescriptionWrapper from './Description.style';
import { RatingMeta, TextButton } from '../SinglePageView.style';

const Description = ({
  title,
  location,
  content,
  rating,
  ratingCount,
  titleStyle,
  propertyStyle,
  locationMetaStyle,
  contentStyle,
  propertyType,
  // linkStyle,
}) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <Element name="overview" className="overview">
      <DescriptionWrapper>
        <Text content={location.formattedAddress} {...locationMetaStyle} />
        <Heading as="h2" content={title} {...titleStyle} />
        <Heading as="h4" content={`Property Type: ${propertyType || 'Normal Hotel'}`} {...propertyStyle} />
        <RatingMeta>
          <Rating rating={rating} ratingCount={ratingCount} type="bulk" />
        </RatingMeta>
        {content.length > 30 ? (
          <>
            <Text
              content={`${content.slice(0, !readMore ? 30 : content.length)}
            ${!readMore ? '....Read more' : ''}`}
              {...contentStyle}
            />
            <TextButton>
              <Button onClick={() => { setReadMore(!readMore); }}>
                {`${!readMore ? 'Read more' : 'Hide Read more'} about the hotel`}
              </Button>
            </TextButton>
          </>
        ) : (<Text content={content} {...contentStyle} />
        )}
      </DescriptionWrapper>
    </Element>
  );
};

Description.propTypes = {
  titleStyle: PropTypes.object,
  locationMetaStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

Description.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  propertyStyle: {
    color: '#008489',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  locationMetaStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#909090',
  },
  contentStyle: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: '1.6',
  },
};

export default Description;
