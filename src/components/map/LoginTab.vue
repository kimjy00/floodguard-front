<template>
  <div v-if="!isregister">
    <div class="login-back" v-if="this.$store.state.popupstore.loginPopUp">
      <div class="wrap">
        <div class="login">
          <img src="../../assets/images/x.png" alt="dfsdf" data-bs-dismiss="modal"
            style="width:10%;height:8%;position:absolute;top:4%;right:10%" @click="close">
          <h2>Log-in</h2>
          <div class="login_id">
            <h4>ID</h4>
            <input type="text" name="" id="" placeholder="ID" v-model="id">
          </div>
          <div class="login_pw">
            <h4>Password</h4>
            <input type="password" name="" id="" placeholder="Password" v-model="password">
          </div>
          <div class="login_etc">
            <div class="checkbox">
              <input type="checkbox" name="" id=""> Remember Me?
            </div>
            <div class="forgot_pw">
              <a href="#" @click="toggleRegister">회원가입 하기</a>
            </div>
          </div>
          <div class="submit">
            <button @click="login">로그인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="r-login" v-if="this.$store.state.popupstore.loginPopUp">
      <div class="child">
        <h1>회원가입</h1>
        <div v-if="error">{{ error }}</div>
        <div>
          아이디:<input type="text" v-model="id"><br>
          이메일:<input type="text" v-model="email"><br>
          패스워드:<input type="password" v-model="password"><br>
          패스워드 재입력:<input type="password" v-model="rePassword"><br>
          전화번호:<input type="text" v-model="phonenumber"><br>
          <button @click="register">회원가입</button>
          <button @click="close">닫기</button>
          <button @click="toggleRegister">로그인하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;

  font-family: "Noto Sans KR", sans-serif;
}

.login-back {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  color: black;
}

li {
  list-style: none;
}

.wrap {
  width: 600px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

.login {
  width: 100%;
  height: 600px;
  background: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login2 {
  width: 100%;
  height: 800px;
  background: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  color: tomato;
  font-size: 2em;
}

.login_sns li {
  padding: 0px 15px;
}

.login_id {
  margin-top: 20px;
  width: 80%;
}

.login_id input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_pw {
  margin-top: 20px;
  width: 80%;
}

.login_pw input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_etc {
  padding: 10px;
  width: 80%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.submit {
  margin-top: 50px;
  width: 80%;
}

.submit button {
  width: 100%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: linear-gradient(to left, rgb(7, 7, 7), rgb(70, 69, 69));
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
}

.r-login {
  display: flex;
  justify-content: center;
  /* 수평 가운데 정렬 */
  align-items: center;
  /* 수직 가운데 정렬 */
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;

  .child {
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
  name: ":LoginTab",
  data() {
    return {
      id: "",
      password: "",
      isregister: false,
      email: "",
      phonenumber: "",
      rePassword: "",
      error: null
    }
  },
  methods: {
    toggleRegister() {
      this.isregister = !this.isregister
    },
    close() {
      this.$store.state.popupstore.loginPopUp = false;
    },
    register() {
      const param = {
        email: this.email,
        username: this.id,
        password: this.password,
        passwordCheck: this.rePassword,
        phonenumber: this.phonenumber
      }
      axios.post('/users/register', param, {})
        .then((res) => {
          console.log(res)
          this.login();
        })
        .catch((res) => {
          this.error = "재 입력해주십시오";
          if (res.response.status == 300) {
            this.error = "이메일을 작성해주십시오.";
          }
          console.log(res.response.status)
        })
    },
    login() {
      const param = {
        userid: this.id,
        password: this.password
      }
      axios
        .post(`/users/login`, param, {})
        .then((res) => {
          if (res.data == "아이디나 비밀번호가 틀립니다.") {
            console.log("틀림")
          }
          else {
            axios.create({
              headers: {
                Authorization: "Bearer " + res.data,
              }
            })
              .get("/users/info")
              .then((res2) => {
                const payload = {
                  token: res.data,
                  userid: res2.data.result.userid,
                  username: res2.data.result.username,
                  role: res2.data.result.role
                }
                this.$store.commit('userstore/login', payload);
                this.close()
              });
          }
          console.log("---axios Post 성공---- ");
        })
    }
  },
}
</script>