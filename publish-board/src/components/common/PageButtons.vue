<template>
    <div class="common_btn">
        <role-button v-for="btn in roleButtons" :key="btn.id"/>
    </div>
</template>

<script>
import RoleButton from "@/components/common/RoleButton";
export default {
    name: "PageButtons",
    components: {RoleButton},
    data: () => ({
        roleButtons : []
    })
};
</script>

<style scoped>

</style>