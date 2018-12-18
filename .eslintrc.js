module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 10
  }
};