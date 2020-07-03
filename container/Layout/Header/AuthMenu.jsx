import React from 'react';
import Menu from 'components/UI/Antd/Menu/Menu';
import ActiveLink from 'library/helpers/activeLink';

import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constants';

const AuthMenu = ({ className }) => (
  <Menu className={className}>
    <Menu.Item key="0">
      <ActiveLink href={`${LOGIN_PAGE}`}>Sign in</ActiveLink>
    </Menu.Item>
    <Menu.Item key="1">
      <ActiveLink href={`${REGISTRATION_PAGE}`}>Register</ActiveLink>
    </Menu.Item>
  </Menu>
);

export default AuthMenu;
