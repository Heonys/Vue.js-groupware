import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        bLoading: false,
        userInfo: {
            userId: "",
            userNm: "",
            hpNo: "",
            enterDate: "",
            birthDate: "",
            zipNo: "",
            address: "",
            addressDetail:""
        },
        userMenuList: [],
        sessionMaxInactiveInterval : 0,
        sessionConnectionTime : 0
    },
    getters: {
    },
    mutations: {
        setLoading(state, bLoading) {
            state.bLoading = bLoading;
        },
        setUserInfo(state, user) {
            state.userInfo.userId = user.userId;
            state.userInfo.userNm = user.userNm;
            state.userInfo.hpNo = user.hpNo;
            state.userInfo.enterDate = user.enterDate;
            state.userInfo.birthDate = user.birthDate;
            state.userInfo.zipNo = user.zipNo;
            state.userInfo.address = user.address;
            state.userInfo.addressDetail = user.addressDetail;
        },
        setUserMenu(state, userMenu) {
            state.userMenuList = userMenu;
        }
    },
    actions: {
    },
    modules: {
    }
});
