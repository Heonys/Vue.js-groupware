import axios from "axios";
import store from "@/store";


const timeout = 30 * 1000;

axios.defaults.timeout = timeout;

axios.interceptors.request.use(config => {
    store.commit("setLoading", true);
    return config;
}, error => {
    store.commit("setLoading", false);
    axios.defaults.timeout = timeout;
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    store.state.sessionConnectionTime = 0;
    store.commit("setLoading", false);
    axios.defaults.timeout = timeout;
    return response.data;
}, error => {
    store.state.sessionConnectionTime = 0;
    store.commit("setLoading", false);
    axios.defaults.timeout = timeout;
    return Promise.reject(error);
});


export default axios;
