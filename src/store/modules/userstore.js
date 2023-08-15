import router from "@/router/router";

const userstore = {
    namespaced: true,
    state : {
        loadingStatus: false,
        logined : false,
        userId: '',
        userName: '',
        token: '',
    },
    getters : {
        getloginedState: function(state) {
          return state.logined;
        },
        getToken: function(state){
            return state.token;
        },
      },
      mutations : {
        loginedStateChange : function(state, value){
            state.logined = value;
        },
        login: function (state, payload) {
            state.token = "Bearer "+ payload.token;
            state.logined = true;
            router.go(0)
        },
        logout: function(state){
          state.logined = false;
          state.token = null;
          router.go(0)
        }
      },
};

export default userstore;