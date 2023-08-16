const popupstore = {
    namespaced: true,
    state : {
        loginPopUp: false,
        alertPopup: false,
    },
    getters : {
        getloginPopUp: function(state) {
          return state.loginPopUp;
        },
        getalertPopup: function(state) {
          return state.alertPopup;
        },
      },
      mutations : {
        loginPopUpStateChange : function(state, value){
            state.loginPopUp = value;
        },
        alertPopupStateChange : function(state, value){
          state.alertPopup = value;
        },
      },
};

export default popupstore;