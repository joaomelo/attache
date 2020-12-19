module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: ['jest'],
  rules: {
    semi: ['error', 'always'],
    'no-console': ['warn'],
    'no-debugger': 'warn'
  },
  env: {
    browser: true,
    'jest/globals': true
  }
};
