import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const HeaderWrapper = styled.header`
  width: 100%;

  @media only screen and (max-width: 991px) {
    .transparent {
      .navbar_search {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 667px) {
    nav {
      &:not(.transparent) {
        a {
          > h3 {
            display: none;
          }
        }
      }
    }
  }

  .sticky-outer-wrapper {
    nav {
      &.is_transparent {
        > div {
          > svg {
            width: 20px;
            position: absolute;
          }

          a {
            img {
              opacity: 0;
            }

            h3 {
              color: ${themeGet('color.1', '#ffffff')};
            }
          }
        }

        .ant-menu:not(.active) {
          li {
            a {
              &.active {
                color: ${themeGet('color.1', '#ffffff')};
              }
              &:hover {
                color: ${themeGet('color.1', '#ffffff')};
              }
            }
          }
        }
      }

      &.transparent {
        > div {
          > svg {
            width: 20px;
            position: absolute;
          }

          a {
            img {
              opacity: 0;
            }

            h3 {
              color: ${themeGet('color.1', '#ffffff')};
            }
          }
        }
      }
    }

    &.isHeaderSticky {
      nav {
        &.is_transparent {
          background-color: ${themeGet('color.1', '#ffffff')};
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

          > div {
            > svg {
              display: none;
            }

            a {
              img {
                opacity: 1;
              }

              h3 {
                color: ${themeGet('primary.0', '#008489')};
              }
            }
          }

          .ant-menu {
            li {
              a {
                color: ${themeGet('text.0', '#2C2C2C')};
                &:hover {
                  color: ${themeGet('primary.0', '#008489')};
                }
                &.active {
                  color: ${themeGet('primary.0', '#008489')};
                  border-bottom: 3px solid ${themeGet('primary.0', '#008489')};
                }
              }
            }
          }

          .auth_menu {
            .ant-menu {
              li {
                &:last-child {
                  a {
                    color: ${themeGet('color.1', '#ffffff')};
                  }
                }
              }
            }
          }
        }

        &.transparent {
          background-color: ${themeGet('color.1', '#ffffff')};
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

          > div {
            > svg {
              display: none;
            }

            a {
              img {
                opacity: 1;
              }

              h3 {
                color: ${themeGet('primary.0', '#008489')};
              }
            }
          }

          .hamburg-btn {
            > span {
              background-color: ${themeGet('text.0', '#2C2C2C')};
            }
          }
        }
      }
    }
  }
`;

export const MobileNavbar = styled.nav`
  display: none;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  width: 100%;
  @media only screen and (max-width: 990px) {
    display: flex;
  }

  &.default {
    border-bottom: 1px solid ${themeGet('border.3', '#E6E6E6')};
    background-color: ${themeGet('color.1', '#ffffff')};
  }

  .hamburg-btn {
    border: 0;
    padding: 0;
    width: auto;
    height: auto;
    background-color: transparent;

    > span {
      display: block;
      width: 20px;
      height: 2px;
      margin: 4px 0;
      border-radius: 5px;
      background-color: ${themeGet('text.0', '#2C2C2C')};
      transition: all 0.3s ease;
    }

    &:hover,
    &.active {
      background-color: transparent;

      > span {
        width: 23px;
        background-color: ${themeGet('primary.0', '#008489')};
      }
    }

    &::after {
      display: none;
    }
  }

  &.transparent {
    position: fixed;
    z-index: 9999;

    .hamburg-btn {
      > span {
        background-color: ${themeGet('color.1', '#ffffff')};
      }
    }
  }
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;

  > a {
    flex-shrink: 0;
    margin-right: 27px;

    @media only screen and (max-width: 480px) {
      margin-right: 20px;
    }

    img {
      height: 28px;
      max-width: inherit;
    }
  }
`;

export const CloseDrawer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 15px 12px;

  > button {
    border: 0;
    padding: 0;
    background-color: transparent;
    font-size: 38px;
    line-height: 1;
    height: auto;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: ${themeGet('text.1', '#909090')};
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      outline: 0;
      color: ${themeGet('text.0', '#2C2C2C')};
    }
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  padding: 25px 35px;
  align-items: center;
  background-color: ${themeGet('color.2', '#F7F7F7')};
`;

export const AvatarImage = styled.div`
  flex-shrink: 0;
  margin-right: 15px;

  img {
    width: 45px;
    height: 45px;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const AvatarInfo = styled.div`
  h3 {
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 15px;
    line-height: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  a {
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;

    &:hover,
    &:focus {
      text-decoration: none;
      outline: 0;
      color: ${themeGet('primary.0', '#008489')};
    }
  }
`;

export const NavbarSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 430px;
  width: 100%;
  margin-left: 30px;

  @media only screen and (max-width: 1200px) {
    max-width: 320px;
  }

  @media only screen and (max-width: 480px) {
    padding-right: 15px;
    box-sizing: border-box;
  }

  .map_autocomplete {
    width: 100%;
  }

  input {
    font-size: 17px;
    font-weight: 700;
    padding-left: 15px;
    padding-right: 30px;
    border-radius: 4px;
    color: ${themeGet('text.0', '#2C2C2C')};
    border: 1px solid ${themeGet('border.0', '#EBEBEB')};
    background-color: ${themeGet('color.2', '#F7F7F7')};
    height: 50px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.3s ease;
    @media only screen and (max-width: 1200px) {
      height: 48px;
    }

    &::placeholder {
      color: rgb(72, 72, 72);
    }

    &:hover,
    &:focus {
      border-color: ${themeGet('primary.0', '#008489')};
    }
  }

  > svg {
    position: absolute;
    z-index: 1;
    top: auto;
    right: 15px;
    width: 20px;
    height: 20px;

    @media only screen and (max-width: 480px) {
      right: 25px;
    }
  }
`;

export default HeaderWrapper;
