import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
        counter : 2,
        loadingStatus: false,
    },
});