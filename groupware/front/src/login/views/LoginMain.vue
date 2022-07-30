<template>
    <div class="login-content">
        <div class="login-logo">
            <img src="@assets/images/logo_white3.png" alt="REFFICS" />
        </div>
        <div class="login-form">
            <form autocomplete="off" role="form" @submit.prevent="$doLogin">
                <div>
                    <input
                        type="text"
                        placeholder="아이디"
                        v-model="loginUser.loginId"
                        ref="loginId"
                        maxlength="30"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        v-model="loginUser.loginPw"
                        ref="loginPw"
                        maxlength="30"
                    />
                </div>
                <input type="submit" value="로그인" />
            </form>
        </div>
    </div>
</template>

<script>
import { maxLength, minLength, required } from "vuelidate/lib/validators"; // 검증 조건을 가지고옴
import constants from "@/plugins/constants";
import cryptojs from "crypto-js"; // 해시함수로 암호화 하게 해주는 패키지
import sha256 from "crypto-js/sha256"; // 해시함수 집합
import qs from "qs"; // querystring 모듈 // url에서 파라미터 분리하는데 유용한 모듈

export default {
    name: "LoginMain",
    data: () => ({
        loginUser: {
            loginId: null,
            loginPw: null,
        },
    }),
    // vuelidate를 사용하기 위해 객체안에 조건을 넣어준다.
    validations: {
        loginUser: {
            loginId: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(30),
            },
            loginPw: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(30),
            },
        },
    },
    mounted() {},
    methods: {
        $doLogin() {
            // input 값 검증
            if (!this.$validation()) {
                return;
            }
            let url = constants.apiUrl + "/auth/login";
            let param = {
                loginId: this.loginUser.loginId,
                loginPw: this.loginUser.loginPw,
            };
            // let config = {
            //     headers: {
            //         "Content-type":"application/x-www-form-urlencoded"
            //     }
            // };

            // 해시함수를 통한 비밀번호 암호화
            param.loginPw = sha256(param.loginPw).toString(cryptojs.enc.Hex);

            this.$axios
                .post(url, qs.stringify(param))
                .then((response) => {
                    const msg =
                        response.userNm +
                        "[" +
                        response.userId +
                        "] 님 반갑습니다.";
                    alert(msg);
                    window.location.href = "/";
                })
                .catch((error) => {
                    const errorCode = error.response.data.errorCode;
                    console.log(errorCode);
                    if (errorCode === "LOGIN_00001") {
                        alert("아이디 또는 패스워드를 확인해 주세요");
                    } else if (errorCode === "LOGIN_00002") {
                        alert("사용권한이 없습니다.");
                    } else if (errorCode === "LOGIN_00003") {
                        alert("아이디 또는 패스워드를 확인해 주세요");
                    } else if (errorCode === "LOGIN_00004") {
                        alert(
                            "패스워드 오류 횟수 초과입니다.\n관리자에게 문의하세요"
                        );
                    }
                });
        },
        $validation() {
            if (!this.$v.loginUser.loginId.required) {
                alert("아이디를 입력해 주세요");
                this.$refs.loginId.focus();
                return false;
            }

            if (!this.$v.loginUser.loginId.minLength) {
                alert("아이디를 확인해 주세요");
                this.$refs.loginId.focus();
                return false;
            }

            if (!this.$v.loginUser.loginId.maxLength) {
                alert("아이디를 확인해 주세요");
                this.$refs.loginId.focus();
                return false;
            }

            if (!this.$v.loginUser.loginPw.required) {
                alert("비밀번호를 입력해 주세요");
                this.$refs.loginPw.focus();
                return false;
            }

            if (!this.$v.loginUser.loginPw.minLength) {
                alert("비밀번호를 확인해 주세요");
                this.$refs.loginPw.focus();
                return false;
            }

            if (!this.$v.loginUser.loginPw.maxLength) {
                alert("비밀번호를 확인해 주세요");
                this.$refs.loginPw.focus();
                return false;
            }
            return true;
        },
    },
};
</script>
