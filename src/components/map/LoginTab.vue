<template>
     <div class="login" v-if="this.$store.state.popupstore.loginPopUp">
            <div class="child">
              <h1>로그인</h1>
              <div>
              아이디:<input type="text" v-model="id"><br>
              패스워드:<input type="password" v-model="password"><br>
              <button @click="login">생성</button>
              <button @click="close">닫기</button>
              </div>
            </div>
     </div>
</template>

<style scoped>
.login{
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  position: absolute; 
  width: 100%; 
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
  .child{
    position: relative; 
    width: 300px; 
    height: 500px;  
    background-color: 
    rgba(255, 255, 255, 1); 
    text-align: center;
    justify-content: center;
  }
}
</style>

<script>
import axios from '@/components/api/axio';
export default {
    name:":LoginTab",
    data() {
      return {
        id:"",
        password:"",
      }
    },
    methods: {
      close(){
        this.$store.state.popupstore.loginPopUp = false;
      },
      login(){
        const param = {
          userid: this.id,
          password: this.password
        }
        console.log("1?")
        axios
            .post(`/api/v1/users/login`, param, {})
            .then((res) => {
              if(res.data == "아이디나 비밀번호가 틀립니다."){
                console.log("틀림")
              }
              else{
                const payload = {
                token : res.data
                }
                console.log("3?")
                this.$store.commit('userstore/login', payload);
                this.close()
                console.log(res.data)
              }
              console.log("---axios Post 성공---- ");
        })
      }
    },
}
</script>