const $postcssPxtorem = require('postcss-pxtorem');
const $postcssPresetEnv = require('postcss-preset-env');
const $postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const $postcssNormalize = require('postcss-normalize');

const isProd = process.env.NODE_ENV === 'production';

const vueConfig = {
  // 基本路径
  publicPath: '/',
  // css相关配置
  css: {
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
    loaderOptions: {
      postcss: {
        plugins: [
          $postcssFlexbugsFixes,
          $postcssPresetEnv({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          $postcssPxtorem({
            rootValue: 16,
            propList: ['*'],
            minPixelValue: 2,
          }),
          $postcssNormalize(),
        ],
      },
    },
  },
  configureWebpack(webpackConfig, mode) {
    if (mode === 'client') {
      // development client config
    } else if (mode === 'server') {
      // development server config
    } else if (mode === 'build') {
      // production cli-service config
    }
  },
};

if (isProd) {
  // do somthing
}

module.exports = vueConfig;
