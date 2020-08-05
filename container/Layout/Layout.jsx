import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'next/router';

import LayoutWrapper from 'components/UI/Antd/Layout/Layout';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import RightBar from './RightBar';

import {
  LISTING_POSTS_PAGE,
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  SINGLE_POST_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,

} from 'settings/constants';
import { LayoutProvider } from 'context/LayoutProvider';
import { LanguageContext } from 'context/LanguageProvider';

const { Content } = LayoutWrapper;

const Layout = ({
  children, router, user, isLoggedIn,
}) => {
  const { state, dispatch } = useContext(LanguageContext);
  return (
    <LayoutWrapper>
      <LayoutProvider>
        {router.pathname === LOGIN_PAGE
        || router.pathname === CHANGE_PASSWORD_PAGE
        || router.pathname === FORGET_PASSWORD_PAGE
        || router.pathname === REGISTRATION_PAGE ? (
          <Content>{children}</Content>
          ) : (
            <>
              <IntlProvider
                locale="en"
                defaultLocale="en"
                messages={state.messages}
              >
                <Header user={user} isLoggedIn={isLoggedIn} />
                <RightBar language={state} dispatch={dispatch} />
                <Content>{children}</Content>
                {router.pathname === LISTING_POSTS_PAGE ? (
                  <div style={{ height: '33px' }} />
                ) : (
                  <Footer path={router.pathname === SINGLE_POST_PAGE} />
                )}
              </IntlProvider>
            </>
          )}
      </LayoutProvider>
    </LayoutWrapper>
  );
};

export default withRouter(Layout);
