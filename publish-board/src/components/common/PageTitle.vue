<template>
    <div class="page_title">
        <h2> {{ $route.meta.menuNm }}</h2>
        <ul>
            <li>HOME</li>
            <li>메뉴관리</li>
            <li>메뉴등록</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PageTitle",
    props: {}
};
</script>

<style scoped>

</style>