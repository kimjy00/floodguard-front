const popupstore = {
    namespaced: true,
    state : {
        loginPopUp: false,
    },
    getters : {
        getloginPopUp: function(state) {
          return state.loginPopUp;
        },
      },
      mutations : {
        loginPopUpStateChange : function(state, value){
            state.loginPopUp = value;
        },
      },
};

export default popupstore;