<template>
    <div class="menu">
    <label for="expand-menu"><div>메뉴</div></label>
    <input type="checkbox" id="expand-menu" name="expand-menu">
    <ul>
        <li v v-if="!this.$store.state.userstore.logined"><a href="#" @click="openLogin" class="item"><div>로그인 기능</div></a></li>
        <li v v-else><a href="#" class="item" @click="logout"><div>로그아웃 기능</div></a></li>
        <li><a href="#" class="item"><div>핀 sort 기능</div></a></li>
        <li><a href="#" class="item"><div>관심사 핀 관리</div></a></li>
        <li><a href="#" class="item"><div>내가 생성한 핀 관리</div></a></li>
        <li><a href="#" class="item"><div>설정</div></a></li>
    </ul>
</div>
</template>
<style scoped>
.menu {
    position:absolute;top:10px;right:10px;overflow:hidden;margin:0;padding:0;z-index:1;font-size:12px;font-family:'Malgun Gothic', '맑은 고딕', sans-serif;background-color: white;z-index: 2;
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