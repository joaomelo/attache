module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'standard'
  ],
  plugins: ['jest'],
  rules: {
    semi: ['error', 'always'],
    'no-console': [
      'warn', {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-debugger': 'warn'
  },
  env: {
    browser: true,
    'jest/globals': true
  }
};
