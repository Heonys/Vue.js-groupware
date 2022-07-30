<template>
    <div class="wrap">
        <layout-header />

        <div class="content">
            <layout-navi />

            <layout-tabs />
        </div>
    </div>
</template>

<script>
import LayoutHeader from "@/layout/pages/LayoutHeader";
import LayoutNavi from "@/layout/pages/LayoutNavi";
import LayoutTabs from "@/layout/pages/LayoutTabs";
export default {
    name: "LayoutMain",
    components: {LayoutTabs, LayoutNavi, LayoutHeader}
};
</script>

<style scoped>

</style>