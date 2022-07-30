<template>
    <div class="layout-nav">
        <div class="nav-list">
            <ul>
                <template v-for="top in menuList">
                    <li :key="top.topMenuCd">
                        <a href="javascript:void(0)" class="top-title">{{top.topMenuNm}}</a>
                        <ul>
                            <template v-for="group in top.groupMenuList">
                                <li :key="group.groupMenuCd">
                                    <a href="javascript:void(0)" class="group-title">{{group.groupMenuNm}}</a>
                                    <ul>
                                        <template v-for="item in group.menuList">
                                            <li :key="item.menuCd">
                                                <a href="javascript:void(0)" class="item-title" @click="$clearLocalStorage(item)">{{item.menuNm}}</a>
                                            </li>
                                        </template>
                                    </ul>
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "LayoutNav",
    props: {
        menuClickFunc: {
            type: Function
        },
        navClickFunc: {
            type: Function
        }
    },
    data: () => ({
        menuList: [],
    }),
    beforeMount() {
        this.menuList = this.$store.state.userMenuList;
        console.log(this.menuList);
    },
    mounted() {
        const _this = this;
        document.querySelector(".layout-tabs .tab-content button.resize-btn").addEventListener("click",() => {
            document.querySelector(".layout-content").classList.toggle("off");

            _this.navClickFunc();
        });
    },
    methods: {
        $clearLocalStorage(item) {
            if(localStorage.getItem(item.menuCd)) {
                localStorage.removeItem(item.menuCd);
            }

            this.menuClickFunc(item);
        }
    }
};
</script>

<style scoped>

</style>
