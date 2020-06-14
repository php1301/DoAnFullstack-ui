import React, { useContext } from 'react';
import Menu from 'components/UI/Antd/Menu/Menu';
import ActiveLink from 'library/helpers/activeLink';
import { AuthContext } from 'context/AuthProvider';
import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRICING_PLAN_PAGE,
  USER_ACCOUNT_SETTINGS_PAGE,
} from 'settings/constants';

// có thể coi className như props
const MobileMenu = ({ className }) => {
  // auth context
  const { loggedIn, logOut } = useContext(AuthContext);

  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <ActiveLink href={HOME_PAGE}>Hotels</ActiveLink>
      </Menu.Item>
      <Menu.Item key="1">
        <ActiveLink href={LISTING_POSTS_PAGE}>Listing</ActiveLink>
      </Menu.Item>
      <Menu.Item key="2">
        <ActiveLink href={PRICING_PLAN_PAGE}>Pricing</ActiveLink>
      </Menu.Item>
      {loggedIn && (
        <Menu.Item key="3">
          <ActiveLink href={USER_ACCOUNT_SETTINGS_PAGE}>
            Account Settings
          </ActiveLink>
        </Menu.Item>
      )}
      {loggedIn && (
        <Menu.Item key="4">
          <button type="button" onClick={logOut}>Log Out</button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MobileMenu;