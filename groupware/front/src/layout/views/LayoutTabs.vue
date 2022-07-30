<template>
    <div class="layout-tabs">
        <div class="tab-content">
            <button class="resize-btn"></button>

            <div class="tab-list draggable">
                <div class="tab-bar">
                    <div class="tab-container">
                        <div v-for="tab of tabList" :key="tab.menuCd" :class="tab.menuCd === 'HOME'?'tab-home':''" >
                            <div :key="tab.menuCd" :class="activeTab === tab.menuCd ? 'tab-active':''" class="tab-div">
                                <a @click="$setActiveTab(tab)">{{tab.menuNm}}</a>
                            </div>
                            <button class="tab-close" v-if="tab.menuCd !== 'HOME'" @click.prevent="$removeTab(tab.menuCd)">X</button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="close-tab-btn" @click.prevent="$removeTabList()"></button>
        </div>
        <div class="tabs-work">
            <router-view :name="activeTab"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "LayoutTabs",
    data: () => ({
        tabList: [

        ],
        defaultTab: {
            menuCd: "HOME",
            menuNm: "HOME",
            path: "/"
        },
        activeTab: ""
    }),
    mounted() {
        const _this = this;
        _this.tabList.push(_this.defaultTab);
        _this.$addTabList(_this.$route);
    },
    methods: {
        $addTabList(route, param) {
            let routeMenuCd = "";
            let routeMenuNm = "";
            let routePath = route.path;

            if(routePath !== undefined) {
                let meta = route.meta;
                if(meta) {
                    routeMenuCd = meta.menuCd;
                    routeMenuNm = meta.menuNm;
                } else {
                    routeMenuCd = route.menuCd;
                    routeMenuNm = route.menuNm;
                }

                const index = this.tabList.findIndex(function(item) {
                    return item.menuCd === routeMenuCd;
                });
                console.log(index);

                if(index < 0) {
                    this.tabList.push({
                        menuCd: routeMenuCd,
                        menuNm: routeMenuNm,
                        path: routePath
                    });
                }

                this.$router.push({path:routePath, query:param}).catch(() => ({

                }));
                this.activeTab = routeMenuCd;
            }


            console.log("activeTab", this.activeTab);
            console.log("param",param);
            console.log("routeMenuNm",routeMenuNm);
            console.log("routeMenuCd",routeMenuCd);
            console.log("routePath",routePath);
        },
        $setActiveTab(tab, param) {
            this.activeTab = tab.menuCd;
            this.$router.push({path:tab.path, query:param}).catch(() => ({

            }));
        },

        $removeTabList() {
            this.tabList = [];
            this.tabList.push(this.defaultTab);
            this.$router.push({path:"/"}).catch(() => ({

            }));
            this.activeTab = "HOME";
        },
        $removeTab(menuCd) {
            const index = this.tabList.findIndex(function(item) {
                return item.menuCd === menuCd;
            });

            const menuTabId = this.tabList[index].menuCd;
            console.log(menuTabId);
            if(menuTabId === this.$route.meta.menuCd) {
                if(index < 1) {
                    this.$router.push({path:"/"}).catch(() => ({
                    }));
                    this.activeTab = "HOME";
                } else {
                    const preIndex = Number(index -1);
                    this.activeTab = this.tabList[preIndex].menuCd;
                    this.$addTabList((this.tabList[preIndex]));
                }

            } else {
                console.log("2222");
            }
            this.tabList.splice(index, 1);
        }
    }
};
</script>

