module.exports = {
  parser: "babel-eslint",
  plugins: ["import", "jsx-a11y", "react", "react-hooks"],

  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  ignorePatterns: [
    "node_modules",
    "build"
  ],
  
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
    //"import/extensions": [".js", ".jsx"],
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },

  rules: {
    "eol-last": ["warn", "always"],
    "max-len": ["warn", {code: 120}],
    "no-duplicate-imports": "warn",
    "no-useless-concat": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "warn",

    "import/newline-after-import": ["warn", {"count": 1}],
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
      "alphabetize": {"order": "asc"}
    }],

    "jsx-a11y/media-has-caption": "off",

    "react/prop-types": "off",

    "react-hooks/rules-of-hooks": "error", 
    "react-hooks/exhaustive-deps": "warn",
  },
};
