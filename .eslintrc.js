module.exports = {
  extends: ['eslint:recommended'],

  env: {
    node: true
  },

  rules: {
    indent: [2, 2],
    'no-console': 0,
    'no-debugger': 0
  },

  parserOptions: {
    ecmaVersion: 6
  }
}
