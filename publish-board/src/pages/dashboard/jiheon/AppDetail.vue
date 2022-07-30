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
                        class="form-control titleInput"
                        style="border: 1px solid #ced4da"
                        :value="this.temp.title"
                        readonly
                    />
                </div>
                <div class="flexContainer">
                    <div class="form-group boardcontent1">
                        <label class="mt-1 mb-1">시작일자</label>
                        <input
                            type="date"
                            id="currentStartDate"
                            class="form-control"
                            style="border: 1px solid #ced4da"
                            :value="this.temp.staDate"
                            readonly
                        />
                    </div>
                    <div class="form-group boardcontent2">
                        <label class="mt-1 mb-1">종료일자</label>
                        <input
                            type="date"
                            id="currentEndDate"
                            class="form-control"
                            style="border: 1px solid #ced4da"
                            :value="this.temp.endDate"
                            readonly
                        />
                    </div>
                </div>

                <div class="form-floating boardContents">
                    <textarea
                        class="form-control"
                        id="floatingTextarea2"
                        style="height: 200px"
                        v-model="this.temp.bdy"
                        readonly
                    ></textarea>
                    <label for="floatingTextarea2">Contents</label>
                </div>
            </form>
        </main>

        <div class="form-group">
            <label class="mt-1 mb0-1 fileLabel" eNm
                ><i class="fa-solid fa-floppy-disk"></i>첨부파일</label
            >
            <div class="border borderFile">
                <ul>
                    <li v-if="this.temp.actFileNm1 != '0'">
                        <i class="fa-solid fa-file"></i
                        ><a>{{ this.temp.actFileNm1 }}</a>
                    </li>
                    <li v-if="this.temp.actFileNm2 != '0'">
                        <i class="fa-solid fa-file"></i
                        ><a>{{ this.temp.actFileNm2 }}</a>
                    </li>
                    <li v-if="this.temp.actFileNm3 != '0'">
                        <i class="fa-solid fa-file"></i
                        ><a>{{ this.temp.actFileNm3 }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="btnContainer">
            <button @click="deleteBoard" class="btn btn-danger m-2">
                삭제
            </button>
            <router-link
                class="btn btn-light border m-2"
                :to="{
                    name: 'update',
                    params: { temp: this.temp },
                }"
                >수정</router-link
            >
            <router-link class="btn btn-secondary m-2" to="/main"
                >목록</router-link
            >
        </div>

        <p class="pspan">
            댓글<span>{{ this.returnObjs.length }}</span>
        </p>
        <hr />

        <div class="form-floating commentContainer">
            <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style="height: 100px"
                v-model="commentDto.boardMsg"
            ></textarea>

            <button
                type="button"
                class="btn btn-dark commentBtn"
                @click="insertComment"
            >
                등록
            </button>
        </div>

        <div
            class="comments"
            v-for="returnObj in returnObjs"
            :key="returnObj.boardSeq"
        >
            <div class="comment">
                <div class="content">
                    <header class="top">
                        <div class="username">
                            {{ returnObj.createId }}
                            <p>{{ returnObj.createDt }}</p>
                        </div>

                        <div class="utility">
                            <button
                                @click="commentDelete(returnObj.boardSeq)"
                                class="btn btn-danger"
                            >
                                삭제
                            </button>
                        </div>
                    </header>
                    <p>{{ returnObj.boardMsg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import customAxios from "@/plugins/customAxios";

export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(vm.$route.params.obj.notiSeq);
            vm.commentDto.notiSeq = vm.$route.params.obj.notiSeq;
            customAxios
                // main에서 prams로 넘겨준 해당 객체를 받아서 notiSeq(글 번호)로 select 하고,
                // 해당 notiSeq에 해당하는 게시글 상세 내용을 화면에 렌더링
                .get("/auth/commentGet", {
                    params: { seq: vm.$route.params.obj.notiSeq },
                })
                .then((res) => {
                    vm.returnObjs = res;
                    vm.temp = vm.$route.params.obj;
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    data() {
        return {
            temp: {},

            returnObjs: [],
            commentDto: {
                notiSeq: this.$route.params.obj.notiSeq, // 공지순번
                boardSeq: Math.round(Math.random() * -1000), // 댓글순번
                boardMsg: "", // 댓글 메시지
                enterId: "", // 등록자 id
                createId: "회원" + Math.round(Math.random() * 100), // 생성 id
                createDt: new Date().toISOString().substring(0, 10), // 생성일시
                modId: "", // 수정 id
                modDt: "", // 수정일시
            },
            conmmentObj: {},
        };
    },
    mounted() {},
    methods: {
        commentDelete(seq) {
            customAxios // 댓글 번호로 댓글삭제
                .post("/auth/deleteComment", seq)
                .then((res) => {
                    console.log(res);

                    customAxios // 댓글 삭제후 순차적으로 댓글 select
                        .get("/auth/commentGet", {
                            params: { seq: this.commentDto.notiSeq },
                        })
                        .then((res) => {
                            this.returnObjs = res;
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteBoard() {
            customAxios // 게시글 번호로 해당 게시글 삭제
                .post("/auth/deleteBoard", this.temp.notiSeq)
                .then((res) => {
                    console.log(res);
                    this.$router.push({ path: "/main" });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        insertComment() {
            if (this.commentDto.boardMsg == "") {
                alert("내용을 입력해주세요");
                return new Error("contents Error");
            }

            customAxios // insert 댓글
                .post("/auth/commentPost", this.commentDto)
                .then((res) => {
                    console.log(res);
                    this.commentDto.boardSeq = Math.round(
                        Math.random() * -1000
                    ); // 댓글 생성할때 댓글번호랑, 작성id는 무작위 생성
                    this.commentDto.createId =
                        "회원" + Math.round(Math.random() * 100);
                    this.commentDto.boardMsg = "";

                    customAxios // insert후에 순차적으로 select 댓글해서 화면 갱신
                        .get("/auth/commentGet", {
                            params: { seq: this.$route.params.obj.notiSeq },
                        })
                        .then((res) => {
                            this.returnObjs = res;
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
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
