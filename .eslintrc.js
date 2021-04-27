module.exports = {
  root: true,
  env: {
      "browser": true,
      "node": true,
      "cypress/globals": true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "cypress"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:cypress/recommended"
  ],
  ignorePatterns: [
    "/**/dist/*.js",
    "/**/dist/*.d.ts",
    "rollup.config.js",
    ".eslintrc.js",
    "/**/*.html",
  ],
  rules: {
    "prettier/prettier": "error",
  },
};
