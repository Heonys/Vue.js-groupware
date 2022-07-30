<template>
    <div class="layout-header">
        <h1><a href="#/" @click.prevent="$getHome()"></a></h1>

        <div class="header-info">

            <p class="user">
                <strong>{{userInfo.userNm}}님</strong>
                <button class="config">설정</button>
                <button class="logout" @click.prevent="$logout">로그아웃</button>
            </p>
        </div>
    </div>
</template>

<script>
import constants from "@/plugins/constants";
import util from "@/plugins/util";

export default {
    name: "LayoutHeader",
    data: () => ({
        userInfo: "",
        sessionChkTimer : null,
        sessionRemainTime: "00:00"
    }),
    methods: {
        $logout() {
            if(confirm("로그아웃하시겠습니까?")) {
                let url = constants.apiUrl + "/auth/logout";
                this.$axios.get(url).then(response => {
                    console.log(response);
                    window.location.href = "/";
                });
            }
        },

        $getHome() {
            console.log("11111");
        },

        $printSessionRemainTime() {

            const _this = this;

            let zadd = function(v){
                return (v<10)? "0"+v:v;
            };

            let timeCal = function(v, d) {
                if( d === "HH" )      return parseInt((v / 1000) / 3600);
                else if( d === "MI" ) return parseInt((v / 1000) % 3600 / 60);
                else if( d === "SS" ) return parseInt((v / 1000) % 3600 % 60) ;
            };

            const v = this.$store.state.sessionMaxInactiveInterval - this.$store.state.sessionConnectionTime;
            if(v > 0) {
                if(this.$store.state.sessionMaxInactiveInterval >= (60 * 1000 * 3600)) {
                    _this.sessionRemainTime = zadd(timeCal(v, "HH")) + ":" + zadd(timeCal(v, "MI")) + ":" + zadd(timeCal(v, "SS"));
                } else {
                    _this.sessionRemainTime = zadd(timeCal(v, "MI")) + ":" + zadd(timeCal(v, "SS"));
                }
                this.$store.state.sessionConnectionTime = this.$store.state.sessionConnectionTime + 1000;
            } else {
                console.log("타임아웃");
                clearInterval(this.sessionChkTimer);
            }
        }
    },
    mounted() {
        const _this = this;
        (
            async () => {
                await util.checkSessionTime();
                if((_this.sessionChkTimer === null) && !constants.isLocal()) {
                    _this.sessionChkTimer = setInterval(_this.$printSessionRemainTime, 1000);
                }
            }
        )();
    },

    created() {
        this.userInfo = this.$store.state.userInfo;
    }
};
</script>

<style scoped>

</style>
