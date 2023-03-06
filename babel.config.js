module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions', '> 0.2%', 'maintained node versions', 'not dead'],
        },
        useBuiltIns: 'usage',
        corejs: 2,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ],
};
