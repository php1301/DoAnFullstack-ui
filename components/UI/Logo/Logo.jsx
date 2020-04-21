/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import LogoArea from './Logo.style';

const LogoNext = ({
  className, withLink, linkTo, title, src,
}) => (
  <LogoArea className={className}>
    {withLink ? (
      <Link href={linkTo}>
        <a>
          {src && <img src={src} alt="HotelFinder." />}
          {title && <h3>{title}</h3>}
        </a>
      </Link>
    ) : (
      <>
        {src && <img src={src} alt="HotelFinder." />}
        {title && <h3>{title}</h3>}
      </>
    )}
  </LogoArea>
);

LogoNext.propTypes = {
  className: PropTypes.string,
  withLink: PropTypes.bool,
  src: PropTypes.string,
  title: PropTypes.string,
  linkTo: PropTypes.string,
};

export default LogoNext;
