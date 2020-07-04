import App from 'next/app';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/default.theme';
import GlobalStyles from '../assets/style/Global.style';
import Layout from '../container/Layout/Layout';
import { withData } from 'library/helpers/restriction';
import { SearchProvider } from 'context/SearchProvider';
import AuthProvider from 'context/AuthProvider';
import { ApolloComponent } from 'apollo-graphql/ApolloProvider';

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
  } // getInitialProps về các bản sau 9.3 không dc khuyến khích

  render() {
    const {
      Component, pageProps, query, user, isLoggedIn,
    } = this.props;
    return (
      <ApolloComponent>
        <AuthProvider>
          <SearchProvider query={query}>
            {/* // Render cứng header và footer - */}
            <Layout user={user} isLoggedIn={isLoggedIn}>
              {/* Các đoạn code ở dưới là children bao gồm cả các pages default index.js */}
              <ThemeProvider theme={theme}>
                <>
                  <GlobalStyles />
                  {/* Các pages - data */}
                  <Component isLoggedIn={isLoggedIn} user={user} {...pageProps} />
                </>
              </ThemeProvider>
            </Layout>
          </SearchProvider>
        </AuthProvider>
      </ApolloComponent>
    );
  }
}
