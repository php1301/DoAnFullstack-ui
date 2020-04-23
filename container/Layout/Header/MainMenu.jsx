/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'next/router';
import Menu from '../../../components/UI/Antd/Menu/Menu';
import ActiveLink from '../../../library/helpers/activeLink';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  USER_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from '../../../settings/constants'; // routing

const MainMenu = ({ className, router }) => (
  <Menu className={className}>
    <Menu.Item key="0">
      <ActiveLink
        className={router.pathname === HOME_PAGE ? 'active' : ''}
        href={`${HOME_PAGE}`}
      >
        Hotels
      </ActiveLink>
    </Menu.Item>
    <Menu.Item key="1">
      <ActiveLink
        className={router.pathname === LISTING_POSTS_PAGE ? 'active' : ''}
        href={`${LISTING_POSTS_PAGE}`}
      >
        Listing
      </ActiveLink>
    </Menu.Item>
    <Menu.Item key="2">
      <ActiveLink
        className={router.pathname === USER_PROFILE_PAGE ? 'active' : ''}
        href={`${USER_PROFILE_PAGE}`}
      >
        Agent
      </ActiveLink>
    </Menu.Item>
    <Menu.Item key="3">
      <ActiveLink
        className={router.pathname === PRICING_PLAN_PAGE ? 'active' : ''}
        href={`${PRICING_PLAN_PAGE}`}
      >
        Pricing
      </ActiveLink>
    </Menu.Item>
  </Menu>
);

export default withRouter(MainMenu);
