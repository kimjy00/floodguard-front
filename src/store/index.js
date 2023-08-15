import userstore from '@/store/modules/userstore'
import popupstore from '@/store/modules/popupstore'
import createPersistedState from 'vuex-persistedstate';
import { createStore } from "vuex";

const store = createStore({
    modules: {
        //키: 값 형태로 저장
        userstore,
        popupstore
    },
    plugins: [createPersistedState({
        paths: ["userstore"]
    })]
})

export default store