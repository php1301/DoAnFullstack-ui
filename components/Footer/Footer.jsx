import React from 'react';
import footer from './Footer.module.scss';
import FooterTop from './FooterTop/FooterTop';
import FooterBottom from './FooterBottom/FooterBottom';
import FooterMiddle from './FooterMiddle/FooterMiddle';

export default function Footer() {
  return (
    <div className={footer.footerContainer}>
      <div className={footer.footerWrapper}>
        <FooterTop />
        <FooterMiddle />
        <FooterBottom />
      </div>
    </div>
  );
}
