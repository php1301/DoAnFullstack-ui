import React, { useContext, useState, useRef } from 'react';
import Menu from 'components/UI/Antd/Menu/Menu';
import Tag from 'components/UI/Antd/Tag/Tag';
import useOnClickOutside from 'library/hooks/useOnClickOutside';
import ActiveLink from 'library/helpers/activeLink';
import { AuthContext } from 'context/AuthProvider';
import {
  USER_PROFILE_PAGE,
  USER_ACCOUNT_SETTINGS_PAGE,
  ADD_HOTEL_PAGE,
} from 'settings/constants';

const ProfileMenu = ({ avatar, user }) => {
  const { logOut } = useContext(AuthContext);
  const [state, setState] = useState(false);

  const handleDropdown = () => {
    setState(!state);
  };

  const closeDropdown = () => {
    setState(false);
  };
  // Chủ yếu xử lý dropdown
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      {/* resolve Static elements interactions của eslint trên div
       bằng thêm role button và tabIndex="0" */}
      <div role="button" tabIndex="0" className="dropdown-handler" onClick={handleDropdown} onKeyDown={handleDropdown}>
        {avatar}
      </div>

      <Menu className={`dropdown-menu ${state ? 'active' : 'hide'}`}>
        <Menu.Item onClick={closeDropdown} key="0">
          <ActiveLink href={USER_PROFILE_PAGE}>
            <Tag style={{ textAlign: 'center' }} color={user.role !== 'Normal' ? 'gold' : 'gray'}>
              {user.role || 'Normal'}
            </Tag>
          </ActiveLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="1">
          <ActiveLink href={USER_PROFILE_PAGE}>View Profile</ActiveLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="2">
          <ActiveLink href={ADD_HOTEL_PAGE}>Add Hotel</ActiveLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="3">
          <ActiveLink href={USER_ACCOUNT_SETTINGS_PAGE}>
            Account Settings
          </ActiveLink>
        </Menu.Item>
        <Menu.Item key="4">
          <button type="button" onClick={logOut}>Log Out</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
