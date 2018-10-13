module.exports = {
  extends: "airbnb",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: 2,
    "space-before-function-paren": 0,
    "react/prefer-stateless-function": 0,
  },
};