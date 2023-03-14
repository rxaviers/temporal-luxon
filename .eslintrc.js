module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["mocha", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
    "no-trailing-spaces": 1,
    quotes: [1, "double"],
    semi: 1,
    "prettier/prettier": "warn",
  },
};
