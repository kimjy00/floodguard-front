import router from "@/router/router";
const userstore = {
    namespaced: true,
    state : {
        loadingStatus: false,
        TitlePopup: true,
        logined : false,
        userId: '',
        userName: '',
        userRole: '',
        token: '',
    },
    getters : {
        getloginedState: function(state) {
          return state.logined;
        },
        getToken: function(state){
            return state.token;
        },
        geTitlePopup: function(state) {
          return state.TitlePopup;
        },
      },
      mutations : {
        loginedStateChange : function(state, value){
            state.logined = value;
        },
        login: function (state, payload) {
            state.token = "Bearer "+ payload.token;
            state.userId = payload.userid;
            state.userName = payload.username;
            state.userRole = payload.role;
            state.logined = true;
            router.go(0);
        },
        logout: function(state){
          state.logined = false;
          state.userId = null;
          state.userName = null;
          state.userRole = null;
          state.token = null;
          router.go(0)
        },
        TitlePopupStateChange : function(state, value){
          state.TitlePopup = value;
        },
      },
};

export default userstore;