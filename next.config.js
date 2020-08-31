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
