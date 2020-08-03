/* eslint-disable import/no-extraneous-dependencies */
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// // not like to use this?
// // have a look at the Quick start guide
// // for passing in lng and translations on init

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: true,
//     interpolation: {
//       escapeValue: false,
//     },
//   });


// export default i18n;
const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr', 'vi'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  use: [Backend, LanguageDetector],
});
