module.exports = {
  root: true,

  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-param-reassign': [2, {
      props: false,
    }],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': [2, {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'arrow-parens': ['error', 'as-needed'],
    'linebreak-style': 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],
    'max-len': [1, 200],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
