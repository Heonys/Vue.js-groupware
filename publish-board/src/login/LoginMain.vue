<template>
    <div class="login">
        <div class="content">
            <div class="login_center_logo">
                <img src="@assets/images/logo_white3.png" alt="REFFICS" />
            </div>
            <div class="login_form">
                <form id="login-form" autocomplete="off" role="form" @submit.prevent="$doLogin()">
                    <div class="url" style="width: 100%;">
                        <div class="urlInfo" style="width: 100%; background-color: #E61407; color: white; text-align: center; font-size: 54px; font-weight: bold; margin-bottom: 5px;"></div>
                    </div>
                    <div>
                        <input type="text" placeholder="아이디" v-model="loginParam.loginId" ref="loginId" maxlength="30"/>
                    </div>
                    <div>
                        <input type="password" placeholder="비밀번호" v-model="loginParam.loginPw" ref="loginPw" maxlength="30"/>
                    </div>
                    <button class="login_btn">로그인</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import commonUtils from "@/plugins/commonUtils";
import {required} from "vuelidate/lib/validators";
import constants from "@/plugins/constants";
import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256";
import customAxios from "@/plugins/customAxios";
import qs from "qs";

export default {
    name: "LoginMain",
    data: () => ({
        loginParam : {
            loginId: "refficsAdministrator",
            loginPw: "Fpvlrtm1!"
        }
    }),
    validations: {
        loginParam: {
            loginId: {
                required,
                minLength: 1,
                maxLength: 30
            },
            loginPw: {
                required,
                minLength: 1,
                maxLength: 30
            }
        }
    },
    mounted() {
        if(commonUtils.$isLocal()) {
            $(".urlInfo").text("LOCAL");
        }
    },
    methods: {
        $doLogin() {
            if(!this.$checkValid()) {
                return;
            }

            const url = constants.serverUrl.concat("/auth/login");
            let param = {
                loginId: this.loginParam.loginId,
                loginPw: this.loginParam.loginPw
            };

            param.loginPw =  sha256(param.loginPw).toString(CryptoJS.enc.Hex);
            console.log("url",url);
            customAxios.post(url, qs.stringify(param)).then((response) => {
                console.log("response",response);
                const msg = response.emplyName+"["+response.emplyId+"] 님 반값습니다.";
                alert(msg);
                window.location.href = "/";
            }).catch((error) => {
                const errorCode = error.response.data.code;
                const message = error.response.data.message;
                if(message !== null) {
                    alert(message);
                } else {
                    if(errorCode === "FAIL00001") {
                        alert("일치하는 사용자 정보가 없습니다.");
                    } else {
                        alert("오류가 발생하였습니다.\n관리자에게 연락부탁드립니다.");
                    }
                }

            });
        },

        $checkValid() {
            if(!this.$v.loginParam.loginId.required) {
                alert("아이디를 입력해 주세요");
                this.$refs.loginId.forcus();
                return false;
            }

            if(!this.$v.loginParam.loginPw.required) {
                alert("비밀번호를 입력해 주세요");
                this.$refs.loginPw.forcus();
                return false;
            }

            return true;
        }
    }
};
</script>

<style>
@import "~@assets/css/login.css";
</style>