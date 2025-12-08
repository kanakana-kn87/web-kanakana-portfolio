// postcss.config.js (究極の確実版)

module.exports = {
  plugins: [
    // 2. 他のプラグインも require() に合わせるよ！
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
