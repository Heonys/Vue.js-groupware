import Vue from "vue";
import VueRouter from "vue-router";

import constants from "@/plugins/constants";
import axios from "@/plugins/axios";
import store from "@/store";
import Layout from "@/layout/Layout";

Vue.config.productionTip = false;
Vue.use(VueRouter);

export default {
    // 시작할때 현재 로그인 사용자 확인
    currentLoginUser: async function currentLoginUser() {
        return new Promise(function (resolve, reject) {
            let url = constants.apiUrl + "/auth/login/user";

            axios
                .get(url)
                .then((response) => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getUserMenuList: async function getUserMenuList() {
        return new Promise(function (resolve, reject) {
            let url = constants.apiUrl + "/menu/user/menu-list";
            console.log("userId : ", store.state.userInfo.userId);
            let config = {
                params: {
                    userId: store.state.userInfo.userId,
                },
            };

            console.log(config);
            axios
                .get(url, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getDefaultMenuList: async function getDefaultMenuList() {
        return [
            {
                topMenuCd: "TOP0001",
                topMenuNm: "메뉴관리",
                groupMenuList: [
                    {
                        groupMenuCd: "GRP001",
                        groupMenuNm: "메뉴등록",
                        menuList: [
                            {
                                menuCd: "M001",
                                menuNm: "대메뉴 등록",
                                path: "/menu/addTopMenu",
                                component: "@/views/menu/AddTopMenu",
                            },
                            {
                                menuCd: "M002",
                                menuNm: "중메뉴 등록",
                                path: "/menu/addGroupMenu",
                                component: "@/views/menu/AddGroupMenu",
                            },
                            {
                                menuCd: "M003",
                                menuNm: "메뉴 등록",
                                path: "/menu/addMenu",
                                component: "@/views/menu/AddMenu",
                            },
                        ],
                    },
                    {
                        groupMenuCd: "GRP002",
                        groupMenuNm: "메뉴조회",
                        menuList: [
                            {
                                menuCd: "M004",
                                menuNm: "메뉴 조회",
                                path: "/menu/selectMenuList",
                                component: "@/views/menu/MenuList",
                            },
                            {
                                menuCd: "M005",
                                menuNm: "사용자별 메뉴조회",
                                path: "/menu/selectUserMenuList",
                                component: "@/views/menu/UserMenuList",
                            },
                        ],
                    },
                    {
                        groupMenuCd: "GRP003",
                        groupMenuNm: "테스트",
                        menuList: [
                            {
                                menuCd: "M004",
                                menuNm: "메뉴 조회",
                                path: "/menu/selectMenuList",
                                component: "@/views/menu/MenuList",
                            },
                            {
                                menuCd: "M005",
                                menuNm: "사용자별 메뉴조회",
                                path: "/menu/selectUserMenuList",
                                component: "@/views/menu/UserMenuList",
                            },
                        ],
                    },
                ],
            },
        ];
    },

    getUserRouter: async function getUserRouter(userMenuList) {
        console.log(userMenuList);

        let dashBoardRouter = [
            {
                path: "/",
                meta: {
                    menuCd: "HOME",
                    menuNm: "HOME",
                },
                components: {
                    HOME: () => import("@/views/dashboard/DashBoard"),
                },
            },
        ];

        const _this = this;

        const menus = _this.setUserMenu(userMenuList);
        let menuRouters = [];
        for (let item of menus) {
            if (item.menuList.length > 0) {
                for (let menu of item.menuList) {
                    menuRouters.push(menu);
                }
            }
        }

        return new VueRouter({
            base: "/",
            mode: "hash",
            routes: [
                {
                    path: "/",
                    component: Layout,
                    // 이게 정상적으로 로그인해서 '/'로 오면 보이는 컴포넌트
                    children: dashBoardRouter.concat(menuRouters),
                },
            ],
        });
    },

    setUserMenu: function setUserMenu(list) {
        const navMenu = [];
        const menuList = [];
        console.log("list size ", list.length);
        for (let top of list) {
            navMenu.push(top);

            const topMenu = {
                topMenuCd: top.topMenuCd,
                topMenuNm: top.topMenuNm,
                menuList: [],
            };

            if (
                top.groupMenuList !== undefined &&
                top.groupMenuList.length > 0
            ) {
                for (let group of top.groupMenuList) {
                    //console.log("group",group);

                    if (
                        group.menuList !== undefined &&
                        group.menuList.length > 0
                    ) {
                        for (let item of group.menuList) {
                            //console.log("menu",item);
                            const menu = {
                                path: item.path,
                                meta: {
                                    topMenuCd: top.topMenuCd,
                                    topMenuNm: top.topMenuNm,
                                    groupMenuCd: group.groupMenuCd,
                                    groupMenuNm: group.groupMenuNm,
                                    menuCd: item.menuCd,
                                    menuNm: item.menuNm,
                                },
                                components: {},
                            };
                            try {
                                let filePath = item.component.replace(
                                    ".vue",
                                    ""
                                );
                                if (filePath.indexOf("@") > -1) {
                                    filePath = filePath.replace("@/views/", "");
                                }
                                const _this = this;
                                menu.components[item.menuCd] =
                                    _this.lazyLoad(filePath);
                            } catch (error) {
                                console.log(error);
                            }

                            topMenu.menuList.push(menu);
                        }
                    }
                    menuList.push(topMenu);
                }
            }
        }
        store.commit("setUserMenu", navMenu);
        return menuList;
    },
    lazyLoad(path) {
        //return () => Promise.resolve(require(path).default);
        try {
            return () => import("@/views/" + path);
            // eslint-disable-next-line no-unreachable
        } catch (error) {
            console.log("error", error);
        }
        return null;
    },
};
