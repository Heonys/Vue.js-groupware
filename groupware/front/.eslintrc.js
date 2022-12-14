module.exports = {
    root: true,
    env: {
        node: true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    parserOptions: {
        parser: "@babel/eslint-parser"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "semi":["error","always"],
        "quotes":["error","double"],
        "indent":["error",4],
        "vue/multi-word-component-names": "off"
    }
};
