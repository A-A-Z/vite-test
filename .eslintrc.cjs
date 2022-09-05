module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "settings": {
        "react": {
            "version": 'detect'
        }
    },
    "overrides": [
        {
            "files": [ "src/**/*.ts", "src/**/*.tsx" ]
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "ignorePatterns": [ "*.cjs" ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    },
    "globals": {
        "React": true,
        "google": true,
        "mount": true,
        "mountWithRouter": true,
        "shallow": true,
        "shallowWithRouter": true,
        "context": true,
        "expect": true,
        "jsdom": true,
        "JSX": true
    }
}
