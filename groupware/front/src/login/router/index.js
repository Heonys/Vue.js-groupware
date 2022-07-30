import Vue from "vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = new VueRouter({
    base: "/login", // 앱의 기본 URL
    mode: "hash",
    routes: [
        {
            path: "/",
            component: () => import("@/login/layout/LayoutLogin"),
            children: [
                {
                    path: "/",
                    component: () => import("@/login/views/LoginMain"),
                },
            ],
        },
    ],
});

export default routes;
