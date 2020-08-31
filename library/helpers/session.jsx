/* eslint-disable no-prototype-builtins */
import cookie from 'js-cookie';
import nextCookie from 'next-cookies';

export const FIREBASE_COOKIE = '__session'; // firebase chỉ accept __session cookie
export const TOKEN_COOKIE = 'token';
export const USER_COOKIE = 'user';

// Cho client khi CSR
// Ở đây khi làm BE đã parse vô luôn browser
export const getCookieFromBrowser = (key) => cookie.get(key);

// Khi đang SSR - genrate = nextCookie, gắn vô key 'id_token' trong tab cookie
// Dành cho monorepo hoặc không parse cookie
// Xử lý refresh page lúc process.browser chưa nhận
const getCookieFromServer = (ctx, key) => {
  const specifiKey = key === 'token' ? 'token' : 'user';
  const cookieServer = nextCookie(ctx);
  const token = cookieServer && cookieServer[specifiKey] ? cookieServer[specifiKey] : false;
  if (!token) return null;
  return JSON.stringify(token);
};

// Get Cookie và set context phù hợp cho CSR (chỉ cần key token để auth)
// SSR(Trả về cả context và key cho meaningful data lần đầu)
export const getCookie = (key, context = {}) => (process.browser ? getCookieFromBrowser(key)
  : getCookieFromServer(context, key));

// Xử lý các option của cookies
// 7 = 7 days
export const setCookie = (key, token) => {
  cookie.set(key, token, { expires: 7 });
};

// Xóa cookie - signed out/change password
export const removeCookie = (key) => {
  cookie.remove(key);
};
