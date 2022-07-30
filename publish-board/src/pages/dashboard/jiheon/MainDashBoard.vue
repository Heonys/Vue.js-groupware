<template>
    <div id="outer">
        <!-- -------------------grid--------------------------------- -->

        <grid
            ref="tuiGrid"
            :data="gridProps.data"
            :columns="gridProps.columns"
            :rowHeaders="gridProps.rowHeaders"
            :columnOptions="gridProps.columnOptions"
            :options="gridProps.options"
            @click="test"
        ></grid>

        <!-- -------------------/grid-------------------------------- -->

        <div class="btnContainer">
            <router-link class="btn btn-primary m-1" to="/main/write"
                >글쓰기</router-link
            >
        </div>

        <!-- ------------------검색 ------------------------------>
        <div class="searchBox">
            <input
                type="text "
                class="form-control searchInput"
                v-model="search"
                @keyup.enter="searchBoard"
            />

            <button @click="searchBoard" class="btn btn-secondary">검색</button>
            <button @click="reset" class="btn btn-secondary">초기화</button>
        </div>
        <br />
    </div>
</template>

<script>
import "tui-grid/dist/tui-grid.css";
import "tui-pagination/dist/tui-pagination.css";
import { Grid } from "@toast-ui/vue-grid";
import customAxios from "@/plugins/customAxios";

export default {
    name: "MainDashBoard",
    components: {
        Grid,
    },
    beforeRouteEnter(to, from, next) {
        // 라우터가 시작할때 실행되는 훅으로 created 전에 실행
        // next()에 콜백함수를 주면 created 이후 mounted 전에 실행됨
        // created 혹은 mounted에서 비동기 처리를하면 처음에만 데이터를 가져오고
        // 다른 라우터에서 DB를 수정했을때 새로고침 전까지 현재 라우터의 데이터 갱신이 안되서
        // 다른 라우터에서 돌아왔을때 새로고침 안해도 결과를 다시 select해서 반영하기 위한 훅
        next((vm) => {
            customAxios // select* board
                .get("/auth/boardGet")
                .then((res) => {
                    vm.returnObjs = res;
                    this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },

    data() {
        return {
            returnObjs: [], // select 해온 객체
            search: "", // 검색할때 inputBox 값
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
                        perPage: 15,
                    },
                },
            },
        };
    },
    methods: {
        reset() {
            customAxios // 초기화 버튼을 위한 select* board
                .get("/auth/boardGet")
                .then((res) => {
                    this.returnObjs = res;
                    this.search = "";
                    this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        searchBoard() {
            customAxios // 검색값으로 select* board
                .get("/auth/boardSearch", {
                    params: { title: this.search },
                })
                .then((res) => {
                    console.log(res);
                    this.returnObjs = res;
                    this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        test(ev) {
            console.log(ev);
            // console.log("rowkey : ", ev.rowKey);
            // console.log("columnName : ", ev.columnName);
        },
    },

    created() {
        customAxios // 처음 created시에 select* board로 값을 전부가져옴
            // 이후 라우터 이동에 따라서는 다시 created 실행되지 않기때문에
            // beforeRouteEnter훅에서 select* board를 통해서 결과를 반영
            .get("/auth/boardGet")
            .then((res) => {
                this.returnObjs = res;
                this.$refs.tuiGrid.invoke("resetData", this.returnObjs);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>

<style scoped>
#outer {
    max-width: 1300px;
    margin: auto;
}

.btnContainer {
    display: flex;
    justify-content: right;
}
.pagination {
    display: flex;
    justify-content: center;
    margin-top: -2.5rem;
}
.boardTitle {
    text-align: center;
}
table {
    font-size: 1rem;
}
.searchInput {
    width: 15rem;
}
.searchBox {
    display: flex;
    justify-content: center;
    margin-top: -2.5rem;
}
.searchBox button {
    margin-left: 0.5rem;
}

@media screen and (max-width: 1200px) {
    table {
        font-size: 0.85rem;
    }
}
</style>
