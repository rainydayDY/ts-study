// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 错误
    // 强制数组方法的回调函数中有return
    'array-callback-return': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true
    }],
    'no-trailing-spaces': 0,
    'no-undef': 0,
    'camelcase': [0, {
      'properties': 'always'
    }],
    // 禁止使用拖尾逗号
    'comma-dangle': [2, 'only-multiline'],
    'comma-spacing': ['error'],
    'comma-style': ['error'],
    'eqeqeq': [2, 'allow-null'],
    'no-extra-semi': 0,
    'indent': ['error', 4, {
      'SwitchCase': 1
    }],
    'key-spacing': ['error'],
    'keyword-spacing': ['error'],
    'lines-around-comment': ['error'],
    'new-cap': ['error'],
    'no-empty-function': 0,
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxBOF': 0,
      'maxEOF': 1
    }],
    'no-self-compare': 'error',
    'no-useless-concat': 'error',
    'no-whitespace-before-property': 'error',
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true,
      'avoidEscape': true
    }],
    'no-useless-escape': 0,
    'semi-spacing': ['error'],
    'semi':['error','always'],
    'space-before-blocks': ['error'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never'
    }],
    'space-infix-ops': ['error'],
    'spaced-comment': ['error', 'always'],
    // 警告
    'dot-notation': ['warn'],
    'no-shadow': 0,
    'no-trailing-spaces': ['warn', {
      'skipBlankLines': true
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
