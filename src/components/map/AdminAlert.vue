<template>
    <div v-if="this.$store.state.popupstore.alertPopup">
        <div class="marker-modal">
            <div class="child">
                <h2>*알림*</h2>
                <h4>지역 이름</h4>
                <div class="box" style="margin-top:15px">
                    <select v-model="selected">
                        <option>서울시(광진교)</option>
                        <option>서울시(너부대교)</option>
                        <option>서울시(대곡교)</option>
                        <option>서울시(대치교)</option>
                        <option>서울시(신대방1교)</option>
                        <option>서울시(신림5교)</option>
                        <option>서울시(오금교)</option>
                        <option>서울시(월계2교)</option>
                        <option>서울시(잠수교)</option>
                        <option>서울시(중량교)</option>
                        <option>서울시(창동교)</option>
                        <option>서울시(청담대교)</option>
                        <option>서울시(한강대교)</option>
                        <option>서울시(행주대교)</option>
                    </select>
                </div>
                <div style="display: flex; justify-content: space-between;margin:20px;margin-top:90px;">
                    <div class="submit">
                        <button @click="alert">테스트 알림</button>
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
.marker-modal {
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
}

.child {
    color: white;
    position: relative;
    width: 300px;
    height: 230px;
    background-color:
        black;
    text-align: center;
    justify-content: center;
    border-radius: 30px;
}

body {
    margin: 0;
    padding: 0;
    background-color: #004882;
}

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.box select {
    background-color: #a3a7abaf;
    color: white;
    padding: 12px;
    width: 250px;
    border: none;
    font-size: 20px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    -webkit-appearance: button;
    appearance: button;
    outline: none;
}

.box::before {
    content: "\f13a";
    font-family: FontAwesome;
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    text-align: center;
    font-size: 28px;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
}

.box:hover::before {
    color: rgba(255, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
    padding: 30px
}
</style>

<script>
import axios from '@/components/api/axio';
export default {
    name: "AdminAlert",
    data() {
        return {
            selected : null,
        }
    },
    methods: {
        close() {
            this.$store.state.popupstore.alertPopup = false;
        },
        alert(){
            axios.get('/alert/'+this.selected);
            console.log(this.selected)
            this.close();
        }
    },
}
</script>