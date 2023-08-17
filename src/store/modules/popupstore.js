const popupstore = {
    namespaced: true,
    state : {
        loginPopUp: false,
        alertPopup: false,
        TitlepagePopup: true,
        LogManagePopup: false,
    },
    getters : {
        getTitlepagePopup: function(state) {
        return state.TitlepagePopup;
        },
        getloginPopUp: function(state) {
          return state.loginPopUp;
        },
        getalertPopup: function(state) {
          return state.alertPopup;
        },
        getLogManagePopup: function(state) {
          return state.LogManagePopup;
        },
      },
      mutations : {
        TitlepageStateChange : function(state, value){
          state.TitlepagePopup = value;
        },
        loginPopUpStateChange : function(state, value){
            state.loginPopUp = value;
        },
        alertPopupStateChange : function(state, value){
          state.alertPopup = value;
        },
        LogManagePopupStateChange : function(state, value){
          state.LogManagePopup = value;
        },
      },
};

export default popupstore;