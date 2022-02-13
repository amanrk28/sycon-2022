module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'google',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '.eslintrc.js',
    'scripts/**/',
  ],
  plugins: ['import'],
  rules: {
    quotes: ['error', 'single'],
  },
};
