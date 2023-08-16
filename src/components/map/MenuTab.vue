<template>
   <div class="menu">
    <label for="expand-menu"><div>메뉴</div></label><input type="checkbox" id="expand-menu" name="expand-menu">
    <ul>
        <li><a href="#" class="item" data-bs-toggle="modal" data-bs-target="#loginModal" style="content: '\f02e';"><div>프로필</div></a></li>
        <li><a href="#" class="item"><div>지도 내 검색</div></a></li>
        <li><a href="#" class="item" data-bs-toggle="modal" data-bs-target="#exampleModal"><div>회원가입</div></a></li>
        <li v v-if="!this.$store.state.userstore.logined"><a class="login-menu" href="#" @click="openLogin"><div>'\e174'</div></a></li>
        <li v v-else><a href="#" class="logout-menu" @click="logout"><div>로그아웃 기능</div></a></li>
        <li><a href="#" class="item"><div>홈</div></a></li>
    </ul>
</div>
</template>
<style scoped>
.menu {
    position:absolute;top:10px;right:10px;overflow:hidden;margin:0;padding:0;z-index:1;font-family:'Malgun Gothic', '맑은 고딕', sans-serif;background-color: white;z-index: 2;
}
    
div.menu {
    display: block;
    overflow: hidden;
    width: 60px;
    background-color: #000;
    color: #fff;
    transition: all 0.5s ease;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
}
.menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.menu a, .menu > label {
    display: block;
    height: 25px;
    padding: 8px;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
}

.menu a:hover {
    color: #000;
}

.menu div {
    position: absolute;
    left: 50px;
    line-height: 1.5;
    font-size: 1em;
    font-family: 'Noto Sans KR';
    padding: 0 0 0 20px;
}

#expand-menu {
    display: none;
   
}

#expand-menu:not(:checked) ~ ul {
    display:none;
}

.menu ::before {
    font-family: 'Material Icons';
    font-size: 1.5em;
    float: left;
    clear: left;
}
.menu label::before{ content: '\e5d2'; }
.login-menu::before{
    content: '\ea77';
}
.logout-menu::before{
    content:'\e9ba' ; 
}


@media screen and (max-width:1023px) {
    .menu {
        width: 60px;
    }
}
@media screen and (max-width:560px) {
    .menu #expand-menu:not(:checked) ~ ul {
        display: none;
    }
}
</style>
<script>
export default {
    name : "MenuTab",
    data() {
        return {
            
        }
    },
    mounted() {

    },
    methods:{
        openLogin(){
            this.$store.state.popupstore.loginPopUp = true;
        },
        logout(){
            this.$store.commit('userstore/logout', true);
        }
    }
}
</script>