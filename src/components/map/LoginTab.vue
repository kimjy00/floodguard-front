<template>
  <div v-if="!isregister">
    <div class="login-back" v-if="this.$store.state.popupstore.loginPopUp">
      <div class="wrap">
        <div class="login">
          <img src="../../assets/images/x.png" alt="dfsdf" data-bs-dismiss="modal"
            style="width:4%;height:6%;position:absolute;top:19%;right:35.5%" @click="close">
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

      <!-- Register -->
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="model-body">
            <div class="wrap">
                <div class="login2">
                  <img src="../../assets/images/x.png" alt="dfsdf" data-bs-dismiss="modal"
            style="width:4%;height:6%;position:absolute;top:6.2%;left:60%" @click="close">
                 <h2>Register</h2>
                    <div class="login_id">
                        <h6>E-mail</h6>
                        <div v-if="error" style="color:red">{{ error }}</div>
                        <input type="email" name="" id="" placeholder="Email" v-model="email">
                    </div>
                    <div class="login_pw">
                        <h6>UserName</h6>
                        <input type="text" name="" id="" placeholder="Password" v-model="id">
                    </div>
                    <div class="login_pw">
                        <h6>Password</h6>
                        <input type="password" name="" id="" placeholder="Password" v-model="password">
                    </div>
                    <div class="login_pw">
                        <h6>PasswordCheck</h6>
                        <input type="password" name="" id="" placeholder="Password" v-model="rePassword">
                    </div>
                    <div class="login_pw">
                        <h6>PhoneNumber</h6>
                        <input type="password" name="" id="" placeholder="Password">
                    </div>
                    <div class="submit">
                      <button @click="login">로그인</button>
                    </div>
                    <div class="submit">
                      <button @click="toggleRegister">로그인하기</button>
                    </div>
                    </div>
                </div>
        </div>
      </div>
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
  width: 93%;
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
  width: 93%;
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
            this.error = "이메일이 비어있습니다.";
          }
          if (res.response.status == 301) {
            this.error = "유저이름이 비어있습니다.";
          }
          if (res.response.status == 302) {
            this.error = "비밀번호란이 비어있습니다.";
          }
          if (res.response.status == 303) {
            this.error = "비밀번호 확인란이 비어있습니다.";
          }
          if (res.response.status == 304) {
            this.error = "휴대폰 번호란이 비어있습니다.";
          }
          if (res.response.status == 305) {
            this.error = "중복된 이메일 입니다.";
          }
          if (res.response.status == 306) {
            this.error = "중복된 유저이름 입니다.";
          }
          if (res.response.status == 307) {
            this.error = "중복된 전화번호 입니다.";
          }
          if (res.response.status == 308) {
            this.error = "올바르지 않은 이메일 형식입니다.";
          }
          if (res.response.status == 309) {
            this.error = "올바르지 않은 휴대폰 형식입니다.";
          }
          if (res.response.status == 310) {
            this.error = "이메일 길이는 최대 50자리 까지입니다.";
          }
          if (res.response.status == 311) {
            this.error = "유저이름은 최소 4자리 ~ 최대 50자리 입니다.";
          }
          if (res.response.status == 312) {
            this.error = "비밀번호가 일치하지 않습니다.";
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