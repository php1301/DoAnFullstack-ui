import { getCookie, TOKEN_COOKIE, USER_COOKIE } from './session';
import redirect from './redirect';

export const isAuthenticated = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  //  token ? true: false
  if (isLoggedIn) redirect(context, '/');
  return { isLoggedIn };
};

export const secretPage = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    redirect(ctx, '/login');
  }
  return { isLoggedIn };
};

// parse data

export const withData = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  const isUser = getCookie(USER_COOKIE, ctx);
  const userCookie = isUser ? JSON.parse(isUser) : {};
  const user = userCookie || {};
  return { user, isLoggedIn };
};
