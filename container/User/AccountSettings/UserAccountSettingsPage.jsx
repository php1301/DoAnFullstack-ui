import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ActiveLink from 'library/helpers/activeLink';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Menu from 'components/UI/Antd/Menu/Menu';
import Avatar from 'components/UI/Antd/Avatar/Avatar';
import Container from 'components/UI/Container/Container.style';
import { USER_PROFILE_PAGE } from 'settings/constants';
import AccountSettingWrapper, {
  AccountSidebar,
  AgentAvatar,
  SidebarMenuWrapper,
  ContentWrapper,
  AgentName,
  FormWrapper,
} from './UserAccountSettings.style';

const UserCreateOrUpdateForm = dynamic(() => import('./UserCreateOrUpdateForm'));
const UserPictureChangeForm = dynamic(() => import('./UserPictureChangeForm'));
const ChangePassword = dynamic(() => import('./ChangePasswordForm'));
const UserAccountSettingsPage = (props) => {
  const { processedData } = props;
  const [currentRoute, setCurrentRoute] = useState('edit-profile');

  const profileData = processedData ? processedData[0] : '';
  const firstName = profileData ? profileData.first_name : '';
  const lastName = profileData ? profileData.last_name : '';
  const profilePic = profileData ? profileData.profile_pic.url : '';
  return (
    <AccountSettingWrapper>
      <Container fullWidth>
        <Row gutter={30}>
          <Col md={9} lg={6}>
            <AccountSidebar>
              <AgentAvatar>
                <Avatar src={profilePic} alt="Profile Picture" />
                <ContentWrapper>
                  <AgentName>
                    {firstName}
                    {' '}
                    {lastName}
                  </AgentName>
                  <ActiveLink href={`${USER_PROFILE_PAGE}`}>
                    View profile
                  </ActiveLink>
                </ContentWrapper>
              </AgentAvatar>
              <>
                <SidebarMenuWrapper>
                  <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                  >
                    <Menu.Item key="1">
                      <a role="button" tabIndex="0" onClick={() => setCurrentRoute('edit-profile')} onKeyDown={() => setCurrentRoute('edit-profile')}>
                        Edit Profile
                      </a>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <a role="button" tabIndex="0" onClick={() => setCurrentRoute('change-photo')} onKeyDown={() => setCurrentRoute('change-photo')}>
                        Change Photos
                      </a>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <a role="button" tabIndex="0" onClick={() => setCurrentRoute('change-password')} onKeyDown={() => setCurrentRoute('change-password')}>
                        Change Password
                      </a>
                    </Menu.Item>
                  </Menu>
                </SidebarMenuWrapper>
              </>
            </AccountSidebar>
          </Col>
          <Col md={15} lg={18}>
            {/* 1 div FormWrapper nhưng đổi content dựa vào route */}
            <FormWrapper>
              {currentRoute === 'edit-profile' ? (
                <UserCreateOrUpdateForm />
              ) : (
                ''
              )}
              {currentRoute === 'change-photo' ? (
                <UserPictureChangeForm />
              ) : (
                ''
              )}
              {currentRoute === 'change-password' ? <ChangePassword /> : ''}
            </FormWrapper>
          </Col>
        </Row>
      </Container>
    </AccountSettingWrapper>
  );
};

export default UserAccountSettingsPage;
