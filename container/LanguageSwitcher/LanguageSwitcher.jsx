import React, { useContext } from 'react';
// import { useRouter } from 'next/router';
import IntlMessages from 'library/helpers/i18n';
import config from './config';
import { LanguageContext } from 'context/LanguageProvider';


export default function LanguageSwitcher({ language, dispatch }) {
  const switchLanguage = () => {
    dispatch({
      type: 'SWITCH',
    });
    // router.reload();
  };
  return (
    <div className="themeSwitchBlock">
      <h4>
        <IntlMessages id="languageSwitcher.label" />
      </h4>
      <div className="themeSwitchBtnWrapper">
        {config.options.map((option) => {
          const { languageId, icon, locale } = option;
          const customClass = locale === language.locale.substring(0, 2)
            ? 'selectedTheme languageSwitch'
            : 'languageSwitch';

          return (
            <button
              type="button"
              className={customClass}
              key={languageId}
              onClick={() => {
                localStorage.setItem('lang', locale);
                switchLanguage(locale);
              }}
            >
              <img src={icon} alt="flag" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
