import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Menu from 'components/UI/Antd/Menu/Menu';
import Popover from 'components/UI/Antd/Popover/Popover';
import Tag from 'components/UI/Antd/Tag/Tag';
import Container from 'components/UI/Container/Container';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import { ProfilePicLoader } from 'components/UI/ContentLoader/ContentLoader';
import Loader from 'components/Loader/Loader';
import { ADD_HOTEL_PAGE } from 'settings/constants';
import { GET_USER_INFO } from 'apollo-graphql/query/query';
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
import { AiFillDollarCircle } from 'react-icons/ai';

const UserFavoriteItemLists = dynamic(() => (
  import('./UserFavoriteItemLists')
));
const UserContact = dynamic(() => (
  import('./UserContact')
));

const UserItemLists = dynamic(() => (
  import('./UserItemLists')
));
const UserBalance = dynamic(() => (
  import('./UserBalance')
));

const ProfileNavigation = (props) => {
  const [component, setComponent] = useState('allListing');
  const { loading, className, isLoggedIn, user } = props;

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
          <Menu.Item key="3">
            <a
              role="button"
              tabIndex="0"
              className={component === 'balance' ? 'active' : ''}
              onClick={() => setComponent('balance')}
              onKeyDown={() => setComponent('balance')}
            >
              Balance
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
        {component === 'allListing' && <UserItemLists loadingPost={loading} {...props} />}
        {component === 'favouriteListing' && <UserFavoriteItemLists loadingPost={loading} {...props} />}
        {component === 'contact' && <UserContact {...props} />}
        {component === 'balance' && <UserBalance {...props} />}
      </Container>
    </>
  );
};

const UserProfileInfo = (props) => {
  const { user, loading, userInfo } = props;
 
  if (loading) return <Loader />;
  // if (isEmpty(processedData) || loading) return <Loader />;
  // const {
  //   // first_name,
  //   // last_name,
  //   // content,
  //   // profile_pic,
  //   // cover_pic,
  //   // social_profile,
  // } = processedData[0];

  const username = `${user.first_name} ${user.last_name}`;
  const handleAccessStripeDashboard = async () => {
    const accountId = {
      // email: user.email,
      id: userInfo.stripeId || 'acct_1HJ9bEJG8dVmSzXR'
    };
    try {
    const redirect = await fetch('https://api.hotel-prisma.ml/api/access-mock-stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Nhớ body phải match Content-Type
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(accountId),
    });
    const redirectPayload = await redirect.json();
    // console.log(redirectPayload)
    window.open(redirectPayload.link.url.slice(6))
  }
  catch(e){
    toast.error(e.message.slice(15), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  }
  return (
    <>
      <BannerSection
        style={{
          background: `url(${user.cover_pic_main}) center center / cover no-repeat`,
        }}
      />
      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            {user.profile_pic_main ? (
              <Image src={user.profile_pic_main} alt="Profile Pic" />
            ) : (
              <ProfilePicLoader />
            )}
          </ProfileImage>
              <Heading as="h5" content="Nếu không reg trong pricing-plan sẽ sử dụng stripeid mặc định, hãy tạo 1 acc stripe và follow theo hướng dẫn ở readme repo để có kết quả chuẩn nhất" />
              <Heading as="h5" content="Vì là test nên có thể tự book khách sạn của chính mình, thực tế sẽ block user.id===agentId" />
          <ProfileInformationArea>
            <ProfileInformation>
              <Tag style={{textAlign: 'center'}} color={user.role !=='Normal' ? 'gold' : 'gray'}>
                  {user.role || 'Normal'}
              </Tag>
              <Heading content={username} />
              <Text content={userInfo.content} />
            </ProfileInformation>
            <SocialAccount>
              <Popover content="Twitter">
                <a
                  href={userInfo.social_profile && userInfo.social_profile.twitter ? userInfo.social_profile.twitter : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoTwitter className="twitter" />
                </a>
              </Popover>
              <Popover content="Facebook">
                <a
                  href={userInfo.social_profile && userInfo.social_profile.facebook ? userInfo.social_profile.facebook: '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoFacebook className="facebook" />
                </a>
              </Popover>
              <Popover content="Instagram">
                <a
                  href={userInfo.social_profile && userInfo.social_profile.instagram ? userInfo.social_profile.instagram : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram className="instagram" />
                </a>
              </Popover>
              <Popover content="Stripe Dashboard">
                <a
                onClick={handleAccessStripeDashboard}
                onKeyDown={handleAccessStripeDashboard}
                tabIndex="-1"
                role="button"
                >
                  <AiFillDollarCircle className="stripe" />
                </a>
              </Popover>
            </SocialAccount>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </>
  );
};

const UserDetailsPage = (props) => {
  // Có thể query 1 lần xài cho các tabs nhưng sẽ ko lifetime update
  // Khi navigate giữa các tab
  // Query từng tab giúp live time update
  const {user} = props
  const {
    loading, error, data,
  } = useQuery(GET_USER_INFO, {
    variables: {
      id: user.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  if(error) return `Error ${error} has occurred`
  const userInfo = data && data.getUserInfo ? data.getUserInfo : [];
  return (
    <UserDetailsPageWrapper>
      {/* <AuthProvider> */}
      <ToastContainer />
      <UserProfileInfo {...props} loading={loading} userInfo={userInfo} />
      {/* <Text content="Refresh will render again favorite"/> */}
      <ProfileNavigation {...props} loading={loading} userInfo={userInfo} />
      {/* </AuthProvider> */}
    </UserDetailsPageWrapper>
  );
}
export default UserDetailsPage