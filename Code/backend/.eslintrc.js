module.exports = {
  plugins: ["import"],

  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
  ],

  env: {
    node: true,
    jest: true,
    es6: true,
  },

  ignorePatterns: ["node_modules", "build"],

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },

  rules: {
    "eol-last": ["warn", "always"],
    "max-len": ["warn", {code: 100, ignoreUrls: true}],
    "no-duplicate-imports": "warn",
    "no-useless-concat": "warn",
    "no-var": "error",
    "prefer-template": "warn",

    "import/newline-after-import": ["warn", {count: 1}],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: {order: "asc"},
      },
    ],
  },
};
