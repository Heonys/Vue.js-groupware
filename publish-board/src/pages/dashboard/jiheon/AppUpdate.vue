<template>
    <div id="outer">
        <main id="main" class="pl-md-5 main">
            <div class="page-header">
                <h3>내용</h3>
            </div>

            <hr />

            <!-- --------------------------------------------------------------------- -->

            <form class="mb-3" style="">
                <div class="form-group boardtitle">
                    <label class="mt-1 mb-1">제목</label>
                    <input
                        type="text"
                        class="form-control titleInput dto1"
                        style="border: 1px solid #ced4da"
                        :value="this.title"
                    />
                </div>
                <div class="flexContainer">
                    <div class="form-group boardcontent1">
                        <label class="mt-1 mb-1">시작일자</label>
                        <input
                            type="date"
                            id="currentStartDate"
                            class="form-control dto2"
                            style="border: 1px solid #ced4da"
                            :value="this.staDate"
                        />
                    </div>
                    <div class="form-group boardcontent2">
                        <label class="mt-1 mb-1">종료일자</label>
                        <input
                            type="date"
                            id="currentEndDate"
                            class="form-control dto3"
                            style="border: 1px solid #ced4da"
                            :value="this.endDate"
                        />
                    </div>
                </div>

                <div class="form-floating boardContents">
                    <textarea
                        class="form-control dto4"
                        id="floatingTextarea2"
                        style="height: 200px"
                        :value="this.bdy"
                    ></textarea>
                    <label for="floatingTextarea2">Contents</label>
                </div>
            </form>
        </main>
        <div class="btnContainer">
            <button @click="updateBoard" class="btn btn-success m-2">
                완료
            </button>
        </div>
    </div>
</template>

<script>
import customAxios from "@/plugins/customAxios";
export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // detail 에서 넘겨준 prams를 받음
            const { notiSeq, title, bdy, staDate, endDate } =
                vm.$route.params.temp;
            vm.title = title;
            vm.bdy = bdy;
            vm.staDate = staDate;
            vm.endDate = endDate;

            vm.updateObj.notiSeq = notiSeq;
        });
    },
    data() {
        return {
            // 게시글 수정을 위해 post 요청을 보낼 객체
            updateObj: {
                notiSeq: "",
                title: "",
                bdy: "",
                staDate: "",
                endDate: "",
                actFileNm1: "",
                actFileNm2: "",
                actFileNm3: "",
            },
            // 화면에 렌더링 해줄 detail에서 받아온 데이터
            title: "",
            bdy: "",
            staDate: "",
            endDate: "",
        };
    },

    methods: {
        updateBoard() {
            // 사용자가 수정한 값을 DOM에서 가져와서 updateObj 담음
            this.updateObj.title = document.querySelector(".dto1").value;
            this.updateObj.staDate = document.querySelector(".dto2").value;
            this.updateObj.endDate = document.querySelector(".dto3").value;
            this.updateObj.bdy = document.querySelector(".dto4").value;
            this.updateObj.actFileNm1 = this.$route.params.temp.actFileNm1;
            this.updateObj.actFileNm2 = this.$route.params.temp.actFileNm2;
            this.updateObj.actFileNm3 = this.$route.params.temp.actFileNm3;

            customAxios // update board
                .post("/auth/updateBoard", this.updateObj)
                .then((res) => {
                    console.log(res);
                    // 끝나면 객체를 가지고 이전 페이지 detail로 돌아감
                    this.$router.push({
                        name: "Detail",
                        params: { obj: this.updateObj },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
#outer {
    max-width: 1300px;
    margin: auto;
    margin-bottom: 10rem;
}
.test input {
    margin-left: 1rem;
    margin-bottom: 0.3rem;
}
.boardTitle {
    width: 60%;
}
.boardtitle input {
    padding: 1rem;
}

.boardcontent1 {
    width: 25%;
}
.boardcontent2 {
    width: 25%;
    margin-left: 2rem;
}

.flexContainer {
    margin-top: 1rem;
    display: flex;
    justify-content: left;
}
.btnContainer {
    display: flex;
    justify-content: right;
}
.boardState {
    width: 23%;
}
.titleInput {
    height: 2.5rem;
}
.boardContents {
    margin-top: 1rem;
}
.borderFile a {
    font-weight: bold;
}
.borderFile li {
    margin: 0.5rem;
}
i {
    margin-right: 00.5rem;
}
.fileLabel {
    margin-bottom: 00.3rem;
}
.commentContainer {
    display: flex;
    border-radius: 1rem;
    margin-top: 0.5rem;
}

.commentBtn {
    width: 15%;
    margin-left: 0.3rem;
    border-radius: 0.4rem;
}
.pspan {
    font-weight: bold;
}
/* 레이아웃 - 댓글 */
.comments {
    border: 1px solid #dbdbdb;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
.comments .comment {
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;
}
.comments .comment:last-child {
    border-bottom: none;
}

/* 상단 메뉴 */
.top {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.top .username {
    font-weight: bold;
    margin-bottom: 1rem;
}
.top .username p {
    color: #bebebe;
}

.top .utility {
    display: flex;
    flex-direction: row;
    margin-left: auto;
}
</style>
