import nextCookie from 'next-cookies';
import { getCookie, TOKEN_COOKIE, USER_COOKIE } from './session';
import redirect from './redirect';

export const isAuthenticated = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  //  token ? true: false
  if (isLoggedIn) redirect(ctx, '/');
  return { isLoggedIn };
};

export const secretPage = (ctx) => {
  // console.log(ctx)
  // ctx từ getInitialProps
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    // Có thể sử dụng ctx.pathname để lấy prevUrl
    // Global Redirect trang trước
    redirect(ctx, '/login');
  }
  return { isLoggedIn };
};
export const getIsLoggedIn = (ctx) => {
  // console.log(ctx)
  // ctx từ getInitialProps
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  return isLoggedIn;
};

// parse data

export const withPaymentSecret = (ctx) => {
  // getCookie có 2 phase, client side và server side
  // Lúc bấm button booking sẽ trigger client side và get đúng secret
  // Nếu user f5 hoặc load trang từ đâu đó
  // hoặc bất cứ method nào ngoài client sẽ trigger server side
  // Vô tình trả sai payload và getIntialProps redirect qua /error
  const secret = getCookie('secret', ctx);
  return secret;
};
export const withChangePasswordSecret = (ctx) => {
  const cookieServer = nextCookie(ctx);
  const secret = cookieServer && cookieServer['reset-password'];
  return secret;
};
export const withData = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  const isUser = getCookie(USER_COOKIE, ctx);
  const userCookie = isUser ? JSON.parse(isUser) : {};
  const user = userCookie || {};
  return { user, isLoggedIn };
};
