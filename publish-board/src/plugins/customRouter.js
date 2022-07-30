import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import LayoutMain from "@/layout/LayoutMain";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMeta);

export default {
    $router: null,

    $setupRouter: function $setupRouter() {
        const _this = this;

        const dashBoardComponent = import("@/pages/dashboard/MainDashBoard");

        const baseRouter = [
            {
                path: "/",
                meta: {
                    menuCd: "HOME",
                    menuNm: "HOME",
                },
                components: {
                    HOME: () => dashBoardComponent
                }

            }
        ];

        const routeList = [
            {
                path: "/",
                component: LayoutMain,
                children: baseRouter
            }
        ];

        _this.$router = new VueRouter({
            base: "/",
            mode: "hash",
            routes: routeList
        });

        return _this.$router;

    }
};