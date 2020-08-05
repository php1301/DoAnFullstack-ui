import React, { useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import bucketSVG from './bucket.svg';
import IntlMessages from 'library/helpers/i18n';
import ThemeSwitcherStyle from './RightBar.style';

export default function ThemeSwitcher({ language, dispatch }) {
  const [isActivated, setIsActivated] = useState(false);
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
