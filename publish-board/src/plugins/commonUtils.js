import constants from "@/plugins/constants";
import customAxios from "@/plugins/customAxios";
import store from "@/store";

export default {
    $isLocal() {
        return process.env.VUE_APP_PROFILE === "LOCAL";
    },
    $isDev() {
        return process.env.VUE_APP_PROFILE === "DEV";
    },
    $isPrd() {
        return process.env.VUE_APP_PROFILE === "PRD";
    },

    async $getLoginUser() {
        return new Promise(function(resolve, reject) {
            let url = constants.serverUrl.concat("/auth/login/user");
            customAxios.get(url).then(response => {
                if(response) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    },

    async $getUserMenu() {
        return new Promise(function(resolve, reject) {
            let url = constants.serverUrl.concat("/menu/user-menus");
            const config = {
                params: {
                    emplyId: store.state.loginUser.emplyId
                }
            };

            customAxios.get(url, config).then(response => {
                if(response) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
};