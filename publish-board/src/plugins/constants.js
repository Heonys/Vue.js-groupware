export default {
    serverUrl: process.env.VUE_APP_PROFILE === "LOCAL" ? "/api" : "",
};