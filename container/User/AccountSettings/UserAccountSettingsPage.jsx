import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import ActiveLink from 'library/helpers/activeLink';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Menu from 'components/UI/Antd/Menu/Menu';
import Avatar from 'components/UI/Antd/Avatar/Avatar';
import Container from 'components/UI/Container/Container.style';
import { USER_PROFILE_PAGE } from 'settings/constants';
import { GET_USER_INFO } from 'apollo-graphql/query/query';
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
  // const { loading: loadingO, error: errorO, data: dataO } = useQuery(Q_GET_O,
  // { onCompleted: d => setO(d.getO[0].id) });

  const [currentRoute, setCurrentRoute] = useState('edit-profile');
  const { processedData, user } = props;
  // Nhớ để hooks useQuery cuối cùng vì useQuery async, có thể sẽ chạy qua luôn các hooks khác
  // Dẫn tới hooks bị render nhiều lần ngoài ý muốn
  const {
    loading, error, data,
  } = useQuery(GET_USER_INFO, {
    variables: {
      id: user.id,
    },
  });
  if (loading) return null;
  const userInfo = data && data.getUserInfo ? data.getUserInfo : [];
  // const profileData = processedData ? processedData[0] : '';
  // const firstName = profileData ? profileData.first_name : '';
  // const lastName = profileData ? profileData.last_name : '';
  // const profilePic = profileData ? profileData.profile_pic.url : '';
  return (
    <AccountSettingWrapper>
      <ToastContainer />
      <Container fullWidth>
        <Row gutter={30}>
          <Col md={9} lg={6}>
            <AccountSidebar>
              <AgentAvatar>
                <Avatar src={data.getUserInfo.profile_pic_main || 'https://i.imgur.com/Lio3cDN.png'} alt="Profile Picture" />
                <ContentWrapper>
                  <AgentName>
                    {data.getUserInfo.first_name}
                    {' '}
                    {data.getUserInfo.last_name}
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
                <UserCreateOrUpdateForm user={userInfo} payloadUser={user} />
              ) : (
                ''
              )}
              {currentRoute === 'change-photo' ? (
                <UserPictureChangeForm user={userInfo} payloadUser={user} />
              ) : (
                ''
              )}
              {currentRoute === 'change-password' ? <ChangePassword user={userInfo} payloadUser={user} /> : ''}
            </FormWrapper>
          </Col>
        </Row>
      </Container>
    </AccountSettingWrapper>
  );
};

export default UserAccountSettingsPage;
