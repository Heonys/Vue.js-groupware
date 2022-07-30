<template>
    <div class="tabs">
        <div class="tabs_navi">
            <button class="navi_size" @click.prevent=""></button>
            <v-tabs v-model="activeTab" grow show-arrows>
                <div
                    v-for="tab of menuTabs"
                    :key="tab.menuCd"
                    :class="tab.menuCd === 'HOME' ? 'home' : ''"
                >
                    <v-tab
                        :key="tab.menuCd"
                        :to="tab.path"
                        exact
                        :class="activeTab === tab.path ? 'v-tabs--active' : ''"
                    >
                        {{ tab.menuNm }}
                    </v-tab>
                </div>
            </v-tabs>
        </div>
        <div class="tabs_page">
            <v-tabs v-model="activeTab" grow>
                <v-tab-item
                    v-for="tab of menuTabs"
                    :key="tab.menuCd"
                    :value="tab.path"
                    :id="tab.menuCd"
                    :class="activeTab === tab.path ? 'tabShow' : ''"
                >
                    <keep-alive>
                        <router-view
                            :ref="activeTab"
                            v-if="activeTab === tab.path"
                            :name="tab.menuCd"
                        ></router-view>
                    </keep-alive>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: "LayoutTabs",
    data: () => ({
        activeTab: "",
        menuTabs: [],
        defaultMenuTabs: {
            menuCd: "HOME",
            menuNm: "HOME",
            path: "/",
        },
    }),
    mounted() {
        const _this = this;
        _this.menuTabs.push(_this.defaultMenuTabs);
        _this.$addMenuTabs(_this.$route);
    },
    methods: {
        $addMenuTabs: function $addMenuTabs(route, param) {
            let routeMenuCd = "";
            let routeMenuNm = "";
            let routePath = route.path;

            if (routePath !== null) {
                let meta = route.meta;
                if (meta) {
                    routeMenuCd = meta.menuCd;
                    routeMenuNm = meta.menuNm;
                } else {
                    routeMenuCd = route.menuCd;
                    routeMenuNm = route.menuNm;
                }
            }

            const index = this.menuTabs.findIndex(function (item) {
                return item.menuCd === routeMenuCd;
            });

            if (index < 0) {
                this.menuTabs.push({
                    menuCd: routeMenuCd,
                    menuNm: routeMenuNm,
                    path: routePath,
                });

                this.$router.push({
                    path: routePath,
                    query: param,
                });
            }

            this.activeTab = routePath;
        },
    },
};
</script>
<style>
.tabShow {
    display: block !important;
}
</style>
