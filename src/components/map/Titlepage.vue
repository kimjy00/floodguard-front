<template>
    <div v-if="this.$store.state.userstore.TitlePopup" @click="close">
        <div class="marker-modal">
            <div>
                <div style="font-size:9em;color:white; float:top;">Flood Guardian</div>
                <div style="font-size:2em;color:white;text-align: center;">Flood Guardian " 내 손 속에 안전 "</div>
                <div style="font-size:1em;color:white;text-align: center;">평점 : {{rate}} / 5</div>
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
</style>

<script>
import axios from '@/components/api/axio';
export default {
    name: "Title-page",
    data() {
        return {
            rate : 0
        }
    },
    mounted(){
        axios.get("/satisfactions/average").then((res) => {
            this.rate = res.data
        })
    },
    methods: {
        close() {
            console.log(this.$store.state.popupstore.TitlepagePopup)
            this.$store.commit("userstore/TitlePopupStateChange",false)
        }
    },
}
</script>