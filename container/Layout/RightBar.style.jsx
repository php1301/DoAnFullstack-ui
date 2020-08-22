import styled from 'styled-components';
// import { palette } from 'styled-theme';

const ThemeSwitcherStyle = styled.div`
  background-color: #ffffff;
  width: 340px;
  height: calc(100% - 70px);
  padding: 0 0 50px;
  flex-shrink: 0;
  position: fixed;
  top: 70px;
  right: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-340px')};
  left: ${(props) => (props['data-rtl'] === 'rtl' ? '-340px' : 'inherit')};
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;

  @media only screen and (max-width: 767px) {
    width: 270px;
    right: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-270px')};
    left: ${(props) => (props['data-rtl'] === 'rtl' ? '-270px' : 'inherit')};
  }

  &.active {
    right: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    left: ${(props) => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .switcher {
    right: ${(props) => (props['data-rtl'] === 'rtl' ? '-98px' : 'inherit')};
    left: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-98px')};
  }

  .componentTitleWrapper {
    padding: 25px 15px;
    height: 70px;

    .componentTitle {
      font-size: 21px;
      font-weight: 700;
      color: #fff;
      line-height: 1;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }

  .SwitcherBlockWrapper {
    width: 100%;
    height: 100%;
    padding-bottom: 105px;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .themeSwitchBlock {
      width: 100%;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      margin-top: 30px;

      h4 {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 0;
        padding: 0 15px;
        text-transform: uppercase;
      }

      .themeSwitchBtnWrapper {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 15px 20px;

        button {
          width: 20px;
          height: 20px;
          display: flex;
          margin: ${(props) => (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};
          border: 1px solid #e4e4e4;
          outline: 0;
          padding: 0;
          background: none;
          justify-content: center;
          position: relative;
          cursor: pointer;


          &.languageSwitch {
            border: 0;
            width: 30px;
            height: auto;

            &.selectedTheme {
              &:before,
              &:after {
                top: 2px;
                left: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-3px')};
                right: ${(props) => (props['data-rtl'] === 'rtl' ? '-3px' : 'inherit')};
              }
            }
          }

          img {
            width: 100%;
          }

          &.selectedTheme {
            &:before {
              background-color: rgb(224, 54, 76);
              content: '';
              width: 6px;
              height: 6px;
              display: -webkit-inline-flex;
              border-radius: 50%;
              display: -ms-inline-flex;
              display: inline-flex;
              position: absolute;
              top: -2px;
              left: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-2px')};
              right: ${(props) => (props['data-rtl'] === 'rtl' ? '-2px' : 'inherit')};
            }

            &:after {
              content: '';
              width: 6px;
              height: 6px;
              display: -webkit-inline-flex;
              display: -ms-inline-flex;
              display: inline-flex;
              position: absolute;
              top: -2px;
              background-color: rgb(224, 54, 76);
              border-radius: 50%;
              border-color: rgb(224, 54, 76);
              left: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-2px')};
              right: ${(props) => (props['data-rtl'] === 'rtl' ? '-2px' : 'inherit')};
              -webkit-animation: selectedAnimation 1.2s infinite ease-in-out;
              animation: selectedAnimation 1.2s infinite ease-in-out;
            }
          }
        }
      }
    }
  }

  .switcherToggleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgb(50, 51, 50);
    outline: 0;
    border: 0;
    position: absolute;
    text-align: center;
    top: 200px;
    left: ${(props) => (props['data-rtl'] === 'rtl' ? 'inherit' : '-50px')};
    right: ${(props) => (props['data-rtl'] === 'rtl' ? '-50px' : 'inherit')};
    cursor: pointer;
    border-radius: ${(props) => (props['data-rtl'] === 'rtl' ? '0 3px 3px 0' : '3px 0 0 3px')};

    img {
      width: 23px;
    }
  }

  .purchaseBtnWrapper {
    width: 100%;
    padding: 25px 0;
    align-items: center;
    justify-content: center;
    bottom: 0px;
    position: absolute;
    background-color: #ffffff;

    .purchaseBtn {
      width: calc(100% - 50px);
      height: 42px;
      margin: 0 28px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(255, 255, 255);
      background-color: rgb(68, 130, 255);
      text-transform: uppercase;
      line-height: 1;
      text-align: center;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      border-radius: 5px;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
    }
  }

  @-webkit-keyframes selectedAnimation {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
  @keyframes selectedAnimation {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

export default ThemeSwitcherStyle;
