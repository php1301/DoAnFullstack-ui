import React from 'react';
import Link from 'next/link';
import Logo from '../../../components/UI/Logo/Logo';
import Footers from '../../../components/Footer/Footer';
import LogoImage from '../../../assets/images/logo-alt.svg';
import FooterMenu from './FooterMenu';

const url = '//github.com/php1301';

const Footer = ({ path }) => (
  <Footers
    path={path}
    logo={<Logo withLink linkTo="/" src={LogoImage} title="TripFinder." />}
    menu={<FooterMenu />}
    copyright={(
      <>
        <p>
          <Link href={url}>
            <a target="_blank" rel="noopener">PhucPham</a>
          </Link>
          {' '}
          Inspired
          {' '}
          {new Date().getFullYear()}
          {' '}
          AirBNB - TripFinder.
        </p>
      </>
)}
  />
);
// {' '} space style ESlint
export default Footer;
