module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "React": "writable"
    },
    //config cho Absolute import
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["./"]
            }
        },
    },
    "parser": 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "plugins": [
        "react"
    ],
    "env": {
        "jest": true,
    },
    "rules": {
        "jsx-a11y/anchor-is-valid": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": 0,
        "linebreak-style": 0,
        "import/order": "off",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }],
        "react/default-props-match-prop-types":"off",
        "react/forbid-prop-types":"off",
        "no-plusplus":"off"
    }
};