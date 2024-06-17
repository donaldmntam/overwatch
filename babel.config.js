module.exports = function(api) {
  api.cache(true);
  const pathAliases = {
    '~': './src',
  };
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver',
        {
          alias: pathAliases,
        }
      ]
    ]
  };
};
