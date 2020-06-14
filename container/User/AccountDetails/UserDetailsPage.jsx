import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import Menu from 'components/UI/Antd/Menu/Menu';
import Popover from 'components/UI/Antd/Popover/Popover';
import Container from 'components/UI/Container/Container';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import { ProfilePicLoader } from 'components/UI/ContentLoader/ContentLoader';
import Loader from 'components/Loader/Loader';
import { ADD_HOTEL_PAGE } from 'settings/constants';
import UserDetailsPageWrapper, {
  BannerSection,
  UserInfoArea,
  ProfileImage,
  ProfileInformationArea,
  ProfileInformation,
  SocialAccount,
  NavigationArea,
} from './UserDetails.style';
import {
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosAdd,
} from 'react-icons/io';

const UserFavoriteItemLists = dynamic(() => (
  import('./UserFavoriteItemLists')
));
const UserContact = dynamic(() => (
  import('./UserContact')
));

const UserItemLists = dynamic(() => (
  import('./UserItemLists')
));

const ProfileNavigation = (props) => {
  const [component, setComponent] = useState('allListing');
  const { className, isLoggedIn } = props;
  return (
    <>
      <NavigationArea>
        <Menu className={className}>
          <Menu.Item key="0">
            <a
              role="button"
              tabIndex="0"
              className={component === 'allListing' ? 'active' : ''}
              onClick={() => setComponent('allListing')}
              onKeyDown={() => setComponent('allListing')}
            >
              Listings
            </a>
          </Menu.Item>
          <Menu.Item key="1">
            <a
              role="button"
              tabIndex="0"
              className={component === 'favouriteListing' ? 'active' : ''}
              onClick={() => setComponent('favouriteListing')}
              onKeyDown={() => setComponent('favouriteListing')}
            >
              Favorites
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a
              role="button"
              tabIndex="0"
              className={component === 'contact' ? 'active' : ''}
              onClick={() => setComponent('contact')}
              onKeyDown={() => setComponent('contact')}
            >
              Contact
            </a>
          </Menu.Item>
        </Menu>

        {isLoggedIn && (
          <Link href={`${ADD_HOTEL_PAGE}`}>
            <a className="add_card">
              <IoIosAdd />
              {' '}
              Add Hotel
            </a>
          </Link>
        )}
      </NavigationArea>
      <Container fluid>
        {component === 'allListing' && <UserItemLists {...props} />}
        {component === 'favouriteListing' && <UserFavoriteItemLists {...props} />}
        {component === 'contact' && <UserContact {...props} />}
      </Container>
    </>
  );
};

const UserProfileInfo = props => {
  const { processedData, loading } = props;
  if (isEmpty(processedData) || loading) return <Loader />;
  const {
    first_name,
    last_name,
    content,
    profile_pic,
    cover_pic,
    social_profile,
  } = processedData[0];

  const username = `${first_name} ${last_name}`;

  return (
    <>
      <BannerSection
        style={{
          background: `url(${cover_pic.url}) center center / cover no-repeat`,
        }}
      />
      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            {profile_pic ? (
              <Image src={profile_pic.url} alt="Profile Pic" />
            ) : (
              <ProfilePicLoader />
            )}
          </ProfileImage>
          <ProfileInformationArea>
            <ProfileInformation>
              <Heading content={username} />
              <Text content={content} />
            </ProfileInformation>
            <SocialAccount>
              <Popover content="Twitter">
                <a
                  href={social_profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoTwitter className="twitter" />
                </a>
              </Popover>
              <Popover content="Facebook">
                <a
                  href={social_profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoFacebook className="facebook" />
                </a>
              </Popover>
              <Popover content="Instagram">
                <a
                  href={social_profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram className="instagram" />
                </a>
              </Popover>
            </SocialAccount>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </>
  );
};

const UserDetailsPage = (props) =>{
  return (
    <UserDetailsPageWrapper>
      {/* <AuthProvider> */}
      <UserProfileInfo {...props} />
      <ProfileNavigation {...props} />
      {/* </AuthProvider> */}
    </UserDetailsPageWrapper>
  );
}
export default UserDetailsPage