<template>
    <div class="layout">
        <layout-header ref="layoutHeader" />

        <div class="layout-content">
            <layout-nav ref="layoutNav" :menu-click-func="$clickMenu" />

            <layout-tabs ref="layoutTabs" />
        </div>
    </div>
</template>

<script>
import LayoutHeader from "@/layout/views/LayoutHeader";
import LayoutNav from "@/layout/views/LayoutNav";
import LayoutTabs from "@/layout/views/LayoutTabs";
export default {
    name: "Layout",
    components: {LayoutTabs, LayoutNav, LayoutHeader},
    methods: {
        $clickMenu(obj, param) {
            this.$refs.layoutTabs.$addTabList(obj, param);
        }
    }
};
</script>
