import nextCookie from 'next-cookies';
import { getCookie, TOKEN_COOKIE, USER_COOKIE } from './session';
import redirect from './redirect';

function doesHttpOnlyCookieExist(cookiename) {
  const d = new Date();
  d.setTime(d.getTime() + (1000));
  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${cookiename}=new_value;path=/;${expires}`;
  if (document.cookie.indexOf(`${cookiename}=`) === -1) {
    return true;
  }
  return false;
}
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
  // Local
  // const token = getCookie(TOKEN_COOKIE, ctx);
  // const isLoggedIn = !!token;

  // Prod
  const token = doesHttpOnlyCookieExist(TOKEN_COOKIE);
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
  // const token = getCookie(TOKEN_COOKIE, ctx);
  const token = doesHttpOnlyCookieExist(TOKEN_COOKIE);
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
  // Trong prod thì chạy hàm set thử cookie ở toke
  // Nếu ko set được tức là đã có cookie từ BE
  // Vì BE và FE khác domain nên phải làm cách này
  // Nếu có domain cùng thì ko cần
  // const token = getCookie(TOKEN_COOKIE, ctx);
  const token = doesHttpOnlyCookieExist(TOKEN_COOKIE);
  const isLoggedIn = !!token;
  // const isLoggedIn = !!token;
  const isUser = getCookie(USER_COOKIE, ctx);
  const userCookie = isUser ? JSON.parse(isUser) : {};
  const user = userCookie || {};
  return { user, isLoggedIn };
};
