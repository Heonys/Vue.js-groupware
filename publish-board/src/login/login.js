import Vue from "vue";
import {Vuelidate} from "vuelidate";
import LoginMain from "@/login/LoginMain";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
    el: "#login",
    created() {
        if(localStorage) {
            localStorage.clear();
        }
    },
    render: (h) => h(LoginMain)
});