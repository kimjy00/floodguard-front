<template>
    <div v-if="this.$store.state.popupstore.LogManagePopup" @click="close">
        <!-- 일단 비워넣기-->
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

export default {
    name: "LogManage",
    data() {
        return {

        }
    },
    methods: {
        close() {
            this.$store.commit("popupstore/LogManagePopupStateChange",false)
            
        }
    },
}
</script>