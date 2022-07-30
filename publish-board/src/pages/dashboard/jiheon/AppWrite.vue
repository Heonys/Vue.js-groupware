<template>
    <div id="outer">
        <div class="page-header">
            <h3>게시글 작성</h3>
        </div>
        <hr />
        <form class="mb-3" style="">
            <div class="form-group boardtitle">
                <label class="mt-1 mb-1">제목</label>
                <input
                    type="text"
                    class="form-control titleInput"
                    style="border: 1px solid #ced4da"
                    placeholder=" 제목을 입력하세요."
                    v-model="formData.title"
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
                        v-model="formData.staDate"
                    />
                </div>
                <div class="form-group boardcontent2">
                    <label class="mt-1 mb-1">종료일자</label>
                    <input
                        type="date"
                        id="currentEndDate"
                        class="form-control"
                        style="border: 1px solid #ced4da"
                        v-model="formData.endDate"
                    />
                </div>

                <div class="form-group boardcontent2">
                    <label class="mt-1 mb-1">첨부파일(최대 3개)</label>
                    <input
                        id="inputfile"
                        type="file"
                        class="form-control inputFile"
                        multiple
                    />
                </div>
            </div>
        </form>

        <Editor ref="editor" />
        <div class="btnContainer">
            <button class="btn btn-success m-2" @click="save">작성</button>
            <!-- <button class="btn btn-secondary m-2">뒤로가기</button> -->
            <router-link class="btn btn-secondary m-2" to="/main"
                >뒤로가기</router-link
            >
        </div>
        <!-- /////////////////////////////////////////////////////////// -->

        <br />
    </div>
</template>

<script>
import customAxios from "@/plugins/customAxios";
import Editor from "@/components/common/BoardEditor.vue";

export default {
    name: "AppWrite",
    components: {
        Editor,
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // 연속으로 글을쓰면 똑같은 난수가 들어가서 중복이 생기기때문에 여기서 초기화
            vm.formData.notiSeq = Math.round(Math.random() * 1000000);
        });
    },
    data() {
        return {
            formData: {
                notiSeq: "",
                title: "",
                bdy: "",
                staDate: "",
                endDate: "",
                actFileNm1: "",
                actFileNm2: "",
                actFileNm3: "",
            },
        };
    },
    methods: {
        filetest() {
            let files = [];
            let el = document.getElementById("inputfile");
            // 파일 개수 체크
            if (el.files.length > 3) {
                alert("첨부파일은 3개까지 가능합니다.");
                return new Error("files Error");
            } else {
                for (let i = 0; i < el.files.length; i++) {
                    files.push(el.files[i].name);
                }
            }
            console.log(files);
            // 파일이 없으면 그냥 이름을 '0'으로 넣어줌
            if (files[0] != null) {
                this.formData.actFileNm1 = files[0];
            } else {
                this.formData.actFileNm1 = "0";
            }
            if (files[1] != null) {
                this.formData.actFileNm2 = files[1];
            } else {
                this.formData.actFileNm2 = "0";
            }
            if (files[2] != null) {
                this.formData.actFileNm3 = files[2];
            } else {
                this.formData.actFileNm3 = "0";
            }

            console.log(this.formData);
        },

        // 게시글 작성 버튼
        save() {
            this.edit(); // TOAST UI Editer로 작성한 내용값을 가져오기
            this.filetest(); // 첨부파일 예외처리

            if (this.formData.title == "") {
                alert("제목을 입력해주세요");
                return new Error("Title Error");
            }
            if (this.formData.bdy == "") {
                alert("본문을 입력해주세요.");
                return new Error("Contents Error");
            }

            customAxios // 작성한 form을 insert 하고 value값을 초기화
                .post("/auth/boardPost", this.formData)
                .then((res) => {
                    console.log(res);
                    this.formData.title = "";
                    this.notiSeq = Math.round(Math.random() * 100000);
                    this.formData.bdy = "";
                    $(".inputFile").val("");
                    this.formData.actFileNm1 = "";
                    this.formData.actFileNm2 = "";
                    this.formData.actFileNm3 = "";
                    this.$router.push({ path: "/main" }); // main router로 돌아감
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async edit() {
            var content = this.$refs.editor.getContent();
            this.formData.bdy = content;
            document.querySelector(".ProseMirror p").textContent = "";
            console.log(this.formData);
        },
    },

    mounted() {
        // 현재날짜, 일주일뒤 날짜 계산하고 yyyy-mm-dd 형태로 자르기
        const d = new Date();
        const day = d.getDate();
        this.formData.staDate = new Date().toISOString().substring(0, 10);
        this.formData.endDate = new Date(new Date().setDate(day + 7))
            .toISOString()
            .substring(0, 10);
    },
};
</script>

<style scoped>
#outer {
    max-width: 1300px;
    margin: auto;
}
.test input {
    margin-left: 1rem;
    margin-bottom: 0.3rem;
}
.boardTitle {
    width: 60%;
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
</style>
