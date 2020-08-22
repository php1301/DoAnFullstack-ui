import englishLang from 'public/static/flag/uk.svg';
import chineseLang from 'public/static/flag/china.svg';
import spanishLang from 'public/static/flag/spain.svg';
import frenchLang from 'public/static/flag/france.svg';
import italianLang from 'public/static/flag/italy.svg';


const language = 'english';

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: 'english',
      locale: 'en',
      text: 'English',
      icon: englishLang,
    },
    {
      languageId: 'chinese',
      locale: 'zh',
      text: 'Chinese',
      icon: chineseLang,
    },
    {
      languageId: 'spanish',
      locale: 'es',
      text: 'Spanish',
      icon: spanishLang,
    },
    {
      languageId: 'french',
      locale: 'fr',
      text: 'French',
      icon: frenchLang,
    },
    {
      languageId: 'italian',
      locale: 'it',
      text: 'Italian',
      icon: italianLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach((languageRender) => {
    if (languageRender.languageId === lang) {
      selecetedLanguage = languageRender;
    }
  });
  return selecetedLanguage;
}
export default config;
