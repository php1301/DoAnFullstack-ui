import Router from 'next/router';

/**
 * Redirect đến bất kì url
 */
export default (ctx = {}, target) => {
  if (ctx.res) {
    // Nếu đang SSR, trả về HTTP 303 và response Location
    // Dùng để redirect.
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    // Sử dụng Replace của Router (next) để replace cái
    // Location của cái mới, xóa khỏi history (history.push)
    Router.replace(target);
  }
};
