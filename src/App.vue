<template>
  <Evaluate></Evaluate>
  <Titlepage></Titlepage>
  <LogManage></LogManage>
  <LoginTab></LoginTab>
  <KakaoMap ref = "maps" @updateData="updateData">
  </KakaoMap>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
</template>

<script>
import KakaoMap from "./components/map/KakaoMap.vue";
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import LoginTab from "./components/map/LoginTab.vue";
import LogManage from "./components/map/LogManage.vue";
import Titlepage from "./components/map/Titlepage.vue"
import Evaluate from "./components/map/Evaluate.vue";

export default {
  name: "App",
  components: {
    KakaoMap,
    LoadingSpinner,
    LoginTab,
    LogManage,
    Titlepage,
    Evaluate,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted(){
    console.log(this.$store.state.popupstore.loginPopUp)
  },
  methods:{
    updateData (param) {
      this.isLoading = param;
    }
  }
};
</script>