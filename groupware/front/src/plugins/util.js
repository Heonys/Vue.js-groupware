import axios from "@/plugins/axios";
import constants from "@/plugins/constants";
import store from "@/store";

export default {

    checkSessionTime() {
        return new Promise(function(resolve) {
            let url = constants.apiUrl + "/sessionTime";
            axios.get(url)
                .then(response => {
                    store.state.sessionMaxInactiveInterval = response * 1000;

                    store.state.sessionMaxInactiveInterval -= (60 * 1000);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    store.state.sessionMaxInactiveInterval = 0;
                    resolve();
                });
        });
    }
};
