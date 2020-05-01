/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const nextConfig = {
  env: {
    GOOGLE_API_KEY: 'AIzaSyAuxPEcwDMrEq04KEJjzhAyMyiJWPbUAus',
    REACT_APP_GOOGLE_MAP_API_KEY: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAuxPEcwDMrEq04KEJjzhAyMyiJWPbUAus&libraries=geometry,drawing,places',
    SERVER_API: 'http://localhost:3000',
  },
  webpack: (config, { isServer }) => {
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
      withOptimizedImages,
      {
        mozjpeg: {
          quality: 90,
        },
        webp: {
          preset: 'default',
          quality: 90,
        },
      },
    ],
    withFonts,
    withCSS,
  ],
  nextConfig,
);
