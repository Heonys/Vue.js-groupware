export default {

    apiUrl: process.env.VUE_APP_PROFILE === "local" ? "/api":"",

    isLocal() {
        return process.env.VUE_APP_PROFILE === "local";
    },

    isDev() {
        return process.env.VUE_APP_PROFILE === "dev";
    },

    isPrd() {
        return process.env.VUE_APP_PROFILE === "prd";
    }
};
