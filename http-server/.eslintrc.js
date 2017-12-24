module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
      "ecmaVersion": 8,
      "es6": true,
      "sourceType": "module",
      "ecmaFeatures": {
          "modules": true
      }
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-await-in-loop": "error",
        "for-direction": "error",
        "block-scoped-var": "error",
        "no-console": "warn"
    }
}