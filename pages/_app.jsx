/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import 'antd/dist/antd.css';
import '../styles/style.scss';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
