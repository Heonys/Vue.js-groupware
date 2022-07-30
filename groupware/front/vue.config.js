const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,

    productionSourceMap: false,

    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "REFFICS GROUPWARE"
        },
        login: {
            entry: "src/login/login.js",
            template: "public/login.html",
            filename: "login.html",
            title: "REFFICS LOGIN"
        }
    },

    chainWebpack: config => {
        config.resolve.alias.set("@assets", path.join(__dirname,"src/assets"));

        config.module.rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true;
                return options;
            });
    },

    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:19090",
                pathRewrite: {
                    "^/api":""
                }
            }
        }
    }
});
