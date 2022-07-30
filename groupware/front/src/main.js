import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import customUser from "@/plugins/customUser";
import axios from "@/plugins/axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

createVue();

async function createVue() {
    const user = await customUser.currentLoginUser().catch(() => {
        window.location.href = "/login";
    });

    if (user !== undefined) {
        console.log(user);
        store.commit("setUserInfo", user);

        let userMenuList = await customUser.getUserMenuList();
        if (userMenuList.length === 0) {
            userMenuList = await customUser.getDefaultMenuList();
        }

        console.log(userMenuList);

        const router = await customUser.getUserRouter(userMenuList);

        new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }
}
