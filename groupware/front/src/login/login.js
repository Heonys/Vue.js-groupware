import Vue from "vue";
import axios from "@/plugins/axios";
import store from "@/store";
import Login from "@/login/Login.vue";
import router from "@/login/router";
import {Vuelidate} from "vuelidate";

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

if(localStorage) {
    localStorage.clear();
}

new Vue({
    router,
    store,
    el: "#login",
    render: (h) => h(Login)
});
