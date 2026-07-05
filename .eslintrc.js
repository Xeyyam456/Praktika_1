module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.config.js'],
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
};
