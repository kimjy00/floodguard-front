<template>
    <div>
        <div class="marker-modal">
                    <p style="font-size:9em;color:white">Flood Guard</p>
                    <p style="font-size:2em;color:white">안심하세요, Flood Guard가 지켜드립니다.</p>
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
export default {
    name: "Title-page",
    data() {
        return {

        }
    },
    methods: {
        close() {
            this.$store.state.popupstore.alertPopup = false;
        }
    },
}
</script>