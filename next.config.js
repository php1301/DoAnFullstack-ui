/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  fr: 'fr',
  en: 'eng',
};
const nextConfig = {
  env: {
    API: process.env.API,
    PUBLIC_STRIPE: 'pk_test_51HIEaKG2Irl69bCYs8SrcVpELrrrIVX3ijWAB5SvtVyv7lHBW1wmlPDz3VLKJxc7GsEpM77PFyToNyqoZlQWmQF000znXGCXKW',
    SECRET_STRIPE: 'sk_test_51HIEaKG2Irl69bCYVs0J4OXXiXrv3qwP8VXjJOF3xzQgS71TRtFXakc0Ycb0GhwnL8gdy7J73Ejr41W6fmovHy6H00nvQfdxzW',
    GOOGLE_API_KEY: 'AIzaSyAuxPEcwDMrEq04KEJjzhAyMyiJWPbUAus',
    GOOGLE_CLIENT_ID: '180471842970-2sfc0dunc4t0hk54ei7hb314tmpj33h3.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '673291723279188',
    REACT_APP_GOOGLE_MAP_API_KEY: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAuxPEcwDMrEq04KEJjzhAyMyiJWPbUAus&libraries=geometry,drawing,places',
    SERVER_API: process.env.SERVER_API,
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack: (config, { isServer }) => {
    if (config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups.shared = {
        name: 'app-other',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      };
    }
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    //   // HOTFIX: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );
    // config cho absolute import
    config.resolve.modules.push(__dirname);

    return config;
  },
};

module.exports = withPlugins(
  [
    [

      withOptimizedImages, {
        handleImages: ['jpeg', 'png', 'svg', 'webp'],
        optimizeImagesInDev: false,
      },
    ],
    withFonts,
    withCSS,
  ],
  nextConfig,
);
