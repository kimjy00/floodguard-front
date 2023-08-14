<template>
  <KakaoMap ref = "maps" @updateData="updateData"></KakaoMap>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
</template>

<script>
import KakaoMap from "./components/map/KakaoMap.vue";
import LoadingSpinner from '@/components/LoadingSpinner.vue';
export default {
  name: "App",
  components: {
    KakaoMap,
    LoadingSpinner
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted(){
    
  },
  methods:{
    updateData (param) {
      this.isLoading = param;
    }
  }
};
</script>