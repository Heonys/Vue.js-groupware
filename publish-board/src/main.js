import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "tui-grid/dist/tui-grid.css";
import Vuetify from "vuetify";

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
    data() {
        return {
            rootdata: "rootdata",
        };
    },
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
