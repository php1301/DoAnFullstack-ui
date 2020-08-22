import React, { useState } from 'react';
import Heading from 'components/UI/Heading/Heading';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import bucketSVG from './bucket.svg';
import IntlMessages from 'library/helpers/i18n';
import ThemeSwitcherStyle from './RightBar.style';

export default function ThemeSwitcher({ language, dispatch }) {
  const [isActivated, setIsActivated] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const toggle = () => {
    setIsActivated(!isActivated);
  };
  return (
    <ThemeSwitcherStyle
      className={isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}
    >
      <div className="componentTitleWrapper">
        <h3 className="componentTitle">
          <IntlMessages id="themeSwitcher.settings" />
        </h3>
      </div>
      <div className="SwitcherBlockWrapper">
        <LanguageSwitcher language={language} dispatch={dispatch} />
      </div>
      <div className="purchaseBtnWrapper">
        {showNote && (
        <>
          <Heading content="*NOTE" />
          <Heading content="+ Trang chủ không có fetch data hay dynamic content mà là demo getIntialProps " />
          <Heading content="+ Code getStaticProps/getStaticPaths đã được commented trong index.js" />
          <Heading content="+ Listing sử dụng getServerSideProps" />
        </>
        )}
        <a
          tabIndex="-1"
          role="button"
          className="purchaseBtn"
          onClick={() => { setShowNote(!showNote); }}
          onKeyDown={() => { setShowNote(!showNote); }}
        >
          {' '}
          <IntlMessages id="themeSwitcher.note" />
        </a>
      </div>
      <button
        type="button"
        className="switcherToggleBtn"
        onClick={() => {
          toggle();
        }}
      >
        <img src={bucketSVG} alt="bucket" />
      </button>
    </ThemeSwitcherStyle>
  );
}
