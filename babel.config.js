module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          // require('electron/package.json').versionだとエラーになる
          electron: require('./node_modules/electron/package.json').version,
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
  ];

  return {
    env: {
      main: {
        presets,
      },
      renderer: {
        presets: [...presets, '@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-function-bind',
          'react-hot-loader/babel',
        ],
      },
    },
  };
};
