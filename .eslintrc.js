module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
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
    "import/prefer-default-export": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,
  },
};