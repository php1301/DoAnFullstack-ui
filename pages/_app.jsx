import App from 'next/app';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ThemeProvider } from 'styled-components';
import Layout from 'container/Layout/Layout';
import AuthProvider from 'context/AuthProvider';
import { SearchProvider } from 'context/SearchProvider';
import { withData } from 'library/helpers/restriction';
import theme from '../themes/default.theme';
import GlobalStyles from '../assets/style/Global.style';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const { query, pathname } = ctx;

    const { user, isLoggedIn } = withData(ctx);
    return {
      pageProps, query, pathname, user, isLoggedIn,
    };
  }

  render() {
    const {
      Component, pageProps, query, user, isLoggedIn,
    } = this.props;

    return (
      <AuthProvider>
        <SearchProvider query={query}>
          <Layout user={user} isLoggedIn={isLoggedIn}>
            <ThemeProvider theme={theme}>
              <>
                <GlobalStyles />
                <Component isLoggedIn={isLoggedIn} {...pageProps} />
              </>
            </ThemeProvider>
          </Layout>
        </SearchProvider>
      </AuthProvider>
    );
  }
}
