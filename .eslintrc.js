module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  plugins: ["mocha"],
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
  },
};
