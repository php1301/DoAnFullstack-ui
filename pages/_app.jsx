import App from 'next/app';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { ThemeProvider } from 'styled-components';
// import { appWithTranslation } from '../i18n';
import AppLocale from 'translations/index';
import theme from 'themes/default.theme';
import GlobalStyles from 'assets/style/Global.style';
import { withData } from 'library/helpers/restriction';
// Chỉ trong development
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { LanguageProvider } from 'context/LanguageProvider';
import AuthProvider from 'context/AuthProvider';
import { SearchProvider } from 'context/SearchProvider';
import Layout from 'container/Layout/Layout';
import { ApolloComponent } from 'apollo-graphql/ApolloProvider';

// import Amplify from 'aws-amplify';
// import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

// import awsExports from 'apollo-graphql/aws-exports';

class CustomApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedLanguage: AppLocale.en,
    };
  }

  static async getInitialProps({ Component, ctx }) {
    // Amplify.configure(awsExports);
    // Amplify.addPluggable(new AmazonAIPredictionsProvider());
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


  componentDidMount() {
    // Comment các dòng này khi làm ở development và debug rerender
    const languageChoosed = localStorage.getItem('lang') || "en";
    const language = AppLocale[`${languageChoosed}`];
    this.setState({
      currentSelectedLanguage: language,
    });
  }


  render() {
    const {
      Component, pageProps, query, user, isLoggedIn,
    } = this.props;
    const {
      currentSelectedLanguage,
    } = this.state;
    // console.log(currentSelectedLanguage);
    // console.log(process.env.NODE_ENV);
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      whyDidYouRender(React);
    }
    return (
      <ApolloComponent>
        <LanguageProvider language={currentSelectedLanguage}>
          <AuthProvider>
            <SearchProvider query={query}>
              {/* // Render cứng header và footer - */}
              <Layout user={user} isLoggedIn={isLoggedIn}>
                {/* Các đoạn code ở dưới là children bao gồm cả các pages default index.js */}
                <ThemeProvider theme={theme}>
                  <>
                    <GlobalStyles />
                    {/* Các pages - data */}
                    <Component isLoggedIn={isLoggedIn} user={user} query={query} {...pageProps} />
                  </>
                </ThemeProvider>
              </Layout>
            </SearchProvider>
          </AuthProvider>
        </LanguageProvider>
      </ApolloComponent>
    );
  }
}
// export default appWithTranslation(CustomApp);
export default CustomApp;
