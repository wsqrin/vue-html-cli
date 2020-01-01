module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "comma-dangle": [2, "never"],
  }
};