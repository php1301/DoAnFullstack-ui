import React from 'react';
import { withRouter } from 'next/router';
import LayoutWrapper from '../../components/UI/Antd/Layout/Layout';
import HomeSearch from '../Home/Search/Search';

import Header from './Header/Header';

const { Content } = LayoutWrapper;

const Layout = ({
  children, router, user, isLoggedIn,
}) => (
  <LayoutWrapper>
    <Header user={user} isLoggedIn={isLoggedIn} />
    <HomeSearch />
  </LayoutWrapper>
);

export default withRouter(Layout);
