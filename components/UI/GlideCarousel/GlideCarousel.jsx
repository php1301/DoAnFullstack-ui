/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import GlideWrapper, {
  GlideSlideWrapper,
  ButtonControlWrapper,
  ButtonWrapper,
  BulletControlWrapper,
  BulletButton,
  DefaultBtn,
} from './GlideCarousel.style';

const GlideCarousel = ({
  className,
  children,
  options,
  controls,
  prevButton,
  nextButton,
  bullets,
  numberOfBullets,
  carouselSelector,
}) => {
  const addAllClasses = ['glide'];

  // className prop checking.
  if (className) {
    addAllClasses.push(className);
  }

  // Số bullets loop
  const totalBullets = [];
  for (let i = 0; i < numberOfBullets; i++) {
    totalBullets.push(i);
  }

  // Load glide.
  useEffect(() => {
    const glide = new Glide(
      carouselSelector ? `#${carouselSelector}` : '#glide',
      {
        ...options,
      },
    );
    glide.mount();
  }, [carouselSelector, options]);

  return (
    <GlideWrapper
      className={addAllClasses.join(' ')}
      id={carouselSelector || 'glide'}
    >
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">{children}</ul>
      </div>

      {/** if controls prop true thì show controls nav. */}
      {controls && (
        <ButtonControlWrapper
          className="glide__controls"
          data-glide-el="controls"
        >
          <ButtonWrapper className="glide__prev--area" data-glide-dir="<">
            {prevButton || <DefaultBtn>Prev</DefaultBtn>}
          </ButtonWrapper>
          <ButtonWrapper className="glide__next--area" data-glide-dir=">">
            {nextButton || <DefaultBtn>Next</DefaultBtn>}
          </ButtonWrapper>
        </ButtonControlWrapper>
      )}

      {/** if bullets prop true thì show bullets nav. */}
      {bullets && (
        <BulletControlWrapper
          className="glide__bullets"
          data-glide-el="controls[nav]"
        >
          <>
            {totalBullets.map((index) => (
              <BulletButton
                key={index}
                aria-label="Glide Nav"
                className="glide__bullet"
                data-glide-dir={`=${index}`}
              />
            ))}
          </>
        </BulletControlWrapper>
      )}
    </GlideWrapper>
  );
};

// Glide Slide wrapper component
const GlideSlide = ({ children }) => (
  <GlideSlideWrapper className="glide__slide">{children}</GlideSlideWrapper>
);

GlideCarousel.propTypes = {
  /** className của GlideCarousel\ */
  className: PropTypes.string,

  /** Children */
  children: PropTypes.element,

  /** Custom options của glide. */
  options: PropTypes.object,

  /** control nav. */
  controls: PropTypes.bool,

  /** bullets nav. */
  bullets: PropTypes.bool,


  numberOfBullets: PropTypes.number,

  prevButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  nextButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

GlideSlide.propTypes = {
  /** Children. */
  children: PropTypes.element,
};

// GlideCarousel default props.
GlideCarousel.defaultProps = {
  controls: true,
};

export { GlideSlide };

export default GlideCarousel;
