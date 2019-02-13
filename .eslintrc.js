module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    "extends": ["airbnb-base", "plugin:ava/recommended"],
    rules: {
      'linebreak-style': ['error', 'windows'],
      "no-global-assign": ["error", {"exceptions": ["require"]}],
      "no-console": ["error", {"allow": ["log"] }],
      "consistent-return": "off",
      "max-len": ["error", {"code": 105, "ignoreTemplateLiterals": true}],
    },
};
