import App from 'next/app';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ThemeProvider } from 'styled-components';
import Layout from '../container/Layout/Layout';

import theme from '../themes/default.theme';
import GlobalStyles from '../assets/style/Global.style';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    };
  } // getInitialProps deprecrated

  render() {
    const { Component } = this.props;
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles />
            <Component />
          </>
        </ThemeProvider>
      </Layout>
    );
  }
}
