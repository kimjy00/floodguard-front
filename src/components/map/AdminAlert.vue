<template>
    <div v-if="this.$store.state.popupstore.alertPopup">
        <div class="marker-modal">
    <div class="child">
        <h2>마커 생성기</h2>
                    <div class="login_id">
                        <h4>지역 이름</h4>
                        <input style = "width: 220px;height:40px;border-radius: 10px;" type="text" name="" id="" v-model="pos">
                    </div>
                    <div class="login_pw">
                        <h4>코멘트</h4>
                        <input style = "width: 220px;height:40px;border-radius: 10px;" type="text" name="" id="" v-model="comment">
                    </div>

                    <div style="display: flex;justify-content: space-between;margin: 30px;">
                        <div class="submit">
                        <button @click="create">생성</button>
                    </div>
                    <div class="submit">
                        <button @click="close">닫기</button>
                    </div>
                </div>
                    
    </div>
    </div>
    </div>
</template>

<style scoped>
.marker-modal{
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  position: absolute; 
  width: 100%; 
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
  .child{
    color:white;
    position: relative; 
    width: 300px; 
    height: 350px;  
    background-color: 
    black; 
    text-align: center;
    justify-content: center;
    border-radius: 30px;
  }
}
</style>

<script>
export default {
    name:"AdminAlert",
    data() {
        return {
            
        }
    },
    methods: {
        close(){
            this.$store.state.popupstore.alertPopup = false;
        }
    },
}
</script>