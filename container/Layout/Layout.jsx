import React from 'react';
import { withRouter } from 'next/router';

import LayoutWrapper from 'components/UI/Antd/Layout/Layout';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import {
  LISTING_POSTS_PAGE,
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  SINGLE_POST_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,

} from 'settings/constants';
import { LayoutProvider } from 'context/LayoutProvider';

const { Content } = LayoutWrapper;

const Layout = ({
  children, router, user, isLoggedIn,
}) => (

  <LayoutWrapper>
    <LayoutProvider>
      {router.pathname === LOGIN_PAGE
        || router.pathname === CHANGE_PASSWORD_PAGE
        || router.pathname === FORGET_PASSWORD_PAGE
        || router.pathname === REGISTRATION_PAGE ? (
          <Content>{children}</Content>
        ) : (
          <>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Content>{children}</Content>
            {router.pathname === LISTING_POSTS_PAGE ? (
              <div style={{ height: '33px' }} />
            ) : (
              <Footer path={router.pathname === SINGLE_POST_PAGE} />
            )}
          </>
        )}
    </LayoutProvider>
  </LayoutWrapper>
);

export default withRouter(Layout);
