import React, { useState, useContext } from 'react';

import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Sticky from 'react-stickynode';
import { IoIosClose } from 'react-icons/io';

import Text from 'components/UI/Text/Text';
import Button from 'components/UI/Antd/Button/Button';
import Drawer from 'components/UI/Antd/Drawer/Drawer';
import Logo from 'components/UI/Logo/Logo';
import Navbar from 'components/Navbar/Navbar';

import { USER_PROFILE_PAGE } from 'settings/constants';
import { LayoutContext } from 'context/LayoutProvider';
import palace from 'assets/images/logo-alt.svg';

import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';

const LogoIcon = () => (
  <svg width="25" height="27.984" viewBox="0 0 25 27.984">
    <g transform="translate(0 0)">
      <path
        d="M25.45,2.767a34.5,34.5,0,0,0-4,1.143,35.262,35.262,0,0,0-3.771,1.545,26.069,26.069,0,0,0-3.179,1.8,26.068,26.068,0,0,0-3.191-1.8A35.262,35.262,0,0,0,7.54,3.909,34.5,34.5,0,0,0,3.55,2.767L2,2.45V17.94a12.5,12.5,0,1,0,25,0V2.45ZM14.5,10.492c2.339,1.96,3.522,4.19,3.512,6.608a3.512,3.512,0,1,1-7.024,0h0C10.98,14.66,12.162,12.442,14.5,10.492Zm9.913,7.448a9.915,9.915,0,0,1-19.831,0V5.69a31.8,31.8,0,0,1,7.748,3.259,13.43,13.43,0,0,0-2.344,2.737A9.929,9.929,0,0,0,8.4,17.095a6.1,6.1,0,1,0,12.2,0,9.932,9.932,0,0,0-1.587-5.412,13.427,13.427,0,0,0-2.346-2.742,29.737,29.737,0,0,1,5.586-2.577c.819-.284,1.559-.51,2.158-.675Z"
        transform="translate(-2 -2.45)"
        fill="#fff"
      />
    </g>
  </svg>
);// =>() = return

const AuthMenu = dynamic(() => import('./AuthMenu'));
const MainMenu = dynamic(() => import('./MainMenu'));
const NavbarSearch = dynamic(() => import('./NavbarSearch'));
const ProfileMenu = dynamic(() => import('./ProfileMenu'));
const MobileMenu = dynamic(() => import('./MobileMenu'));

const Header = ({ router, user, isLoggedIn }) => {
  const [{ searchVisibility }] = useContext(LayoutContext);
  const [state, setState] = useState(false);
  const sidebarHandler = () => {
    setState((prevState) => !prevState);
    // isToggleOn: !prevState.isToggleOn
  };

  const headerType = router.pathname === '/' ? 'transparent' : 'default'; // Nếu là section Home thì set Header type trans để truyền vô đối số ở NavBar
  const AvatarImg = 'https://i.imgur.com/Lio3cDN.png'; // fix thành avatar ở backend gửi

  return (
    <HeaderWrapper>
      {/* Sticky Header */}
      <Sticky top={0} innerZ={1001} activeClass="isHeaderSticky">
        {/* Truyền các props thích hợp để navbar style và hiển thị đúng */}
        <Navbar
          logo={(
            <>
              {headerType === 'transparent' && <LogoIcon />}
              <Logo withLink linkTo="/" src={palace} title="TripFinder." />
            </>
          )}
          navMenu={<MainMenu />}
          isLogin={isLoggedIn}
          avatar={<Logo src={AvatarImg} />}
          authMenu={<AuthMenu />}
          profileMenu={<ProfileMenu avatar={<Logo src={AvatarImg} />} />}
          headerType={headerType}
          searchComponent={<NavbarSearch />}
          location={router}
          searchVisibility={searchVisibility}
        />
        <MobileNavbar className={headerType}>
          <LogoArea>
            <>
              {headerType === 'transparent' && <LogoIcon />}
              <Logo withLink linkTo="/" src={palace} title="TripFinder." />
            </>
            <NavbarSearch />
          </LogoArea>
          <Button
            className={`hamburg-btn ${state ? 'active' : ''}`}
            onClick={sidebarHandler}
          >
            <span />
            <span />
            <span />
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={sidebarHandler}
            width="285px"
            className="mobile-header"
            visible={state}
          >
            <CloseDrawer>
              <button type="button" onClick={sidebarHandler}>
                <IoIosClose />
              </button>
            </CloseDrawer>
            {isLoggedIn
              ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src={AvatarImg} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content="php1301" />
                    <Link href={USER_PROFILE_PAGE}>
                      <a>View Profile</a>
                    </Link>
                  </AvatarInfo>
                </AvatarWrapper>
              )
              : <AuthMenu className="auth-menu" />}
            <MobileMenu className="main-menu" />
          </Drawer>
        </MobileNavbar>
      </Sticky>
    </HeaderWrapper>
  );
};
export default withRouter(Header);
