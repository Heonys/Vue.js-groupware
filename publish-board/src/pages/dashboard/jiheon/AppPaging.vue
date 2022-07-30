<template>
    <div class="child1">
        <h1>AppPaging</h1>
        {{ this.$route.params.id }}
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "AppPaging",
};
</script>

<style></style>
