<template>
    <div id="app">
        <grid
            ref="tuiGrid"
            :data="gridProps.data"
            :columns="gridProps.columns"
            :rowHeaders="gridProps.rowHeaders"
            :columnOptions="gridProps.columnOptions"
            :options="gridProps.options"
        ></grid>

        <router-link to="/main">main</router-link>
    </div>
</template>

<script>
import "tui-grid/dist/tui-grid.css";
import "tui-pagination/dist/tui-pagination.css";
import { Grid } from "@toast-ui/vue-grid";
import customAxios from "@/plugins/customAxios";
export default {
    name: "App",
    components: {
        Grid,
    },
    methods: {
        getGrid() {
            this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
        },
    },
    created() {
        customAxios
            .get("/auth/boardGet")
            .then((res) => {
                this.returnObjs = res;
                this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    data() {
        return {
            returnObjs: [],
            gridProps: {
                data: [],
                columns: [
                    {
                        header: "번호",
                        name: "notiSeq",
                    },
                    {
                        header: "제목",
                        name: "title",
                    },
                    {
                        header: "작성자",
                        name: "enterId",
                    },
                    {
                        header: "시작일자",
                        name: "staDate",
                    },
                    {
                        header: "종료일자",
                        name: "endDate",
                    },
                ],
                options: {
                    pageOptions: {
                        useClient: true,
                        perPage: 10,
                    },
                },
            },
        };
    },
};
</script>

<style scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
