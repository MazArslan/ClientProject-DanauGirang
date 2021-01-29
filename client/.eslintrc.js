module.exports = {
  extends: [
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prefer-import", "prettier"],
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": ["error"],
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "linebreak-style": 0,
    "prefer-import/prefer-import-over-require": ["error"],
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "no-undef": 0,
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false
      }
    ]
  }
};
