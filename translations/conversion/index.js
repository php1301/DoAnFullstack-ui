import ch from './raw/chinese';
import fr from './raw/fr';
import ital from './raw/ital';
import span from './raw/span';
import arab from './raw/arab';
import english from './raw/eng';

export function getKeys(object) {
  const keys = [];
  const variables = [];
  let text = '';
  Object.keys(object).forEach((key) => {
    keys.push(key);
    variables.push(object[key]);
    text += `${object[key]}\n`;
  });
  // getValues(keys);
  return {
    keys,
    variables,
  };
}
export function getValues(enMessages) {
  const { keys, variables } = getKeys(enMessages);
  const langs = [english, ch, fr, ital, span, arab];
  const langsNm = ['eng', 'ch', 'fr', 'ital', 'span', 'arab'];
  langs.forEach((lang, ii) => {
    const translatedDAta = lang.split('\n');
    const obj = {};
    keys.forEach((key, index) => {
      obj[key] = translatedDAta[index + 1];
    });
    console.log(
      langsNm[ii],
      translatedDAta.length,
      keys.length,
      '\n',
      JSON.stringify(obj, null, 2),
    );
  });
}
