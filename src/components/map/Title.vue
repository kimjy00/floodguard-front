<template>
    <div>
        <div class="marker-modal">
    <div class="child">
        <div>
            <p style="font-size:9em;color:white">Flood Guard</p>
          </div>
          <div>
            <p style="font-size:2em;color:white">안심하세요, Flood Guard가 지켜드립니다.</p>
          </div>

      
    <div style="display: flex; justify-content: space-between;margin:20px;margin-top:90px;">
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
}
  .child {
    color:white;
    position: relative; 
    width: 300px; 
    height: 230px;  
    background-color: 
    black; 
    text-align: center;
    justify-content: center;
    border-radius: 30px;
  }

 </style>

<script>
export default {
    name:"Title",
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