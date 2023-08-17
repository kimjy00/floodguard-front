<template>
    <div class="marker-modal">
    <div class="child">
        <h2>마커 생성기</h2>
                    <div class="login_id">
                        <h4>지역 이름</h4>
                        <input style = "width: 220px;height:40px;border-radius: 10px;" type="text" name="" id="" v-model="pos">
                    </div>
                    <div v-if="images" class="w-full h-full flex items-center">
                        <img :src="images" alt="image" style="max-width: 300px ; max-height: 100px;">
                    </div>
                    지역 사진 올리기:<input type="file" class="hidden" label="File Input" name="image" accept="image/*" @change="selectImg">
                    <div class="login_pw">
                        <h4>코멘트</h4>
                        <input style = "width: 220px;height:40px;border-radius: 10px;" type="text" name="" id="" v-model="comment">
                    </div>
                    <div style="display: flex;justify-content: space-between;margin: 30px;">
                        <div class="submit">
                        <a  href="#" class="gradient-btn" @click="create">생성</a>
                    </div>
                    <div class="submit">
                        <a href="#" class="gradient-btn" @click="close">닫기</a>
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
  position: relative; 
  width: 100%; 
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 7;
  .child{
    color:white;
    position: relative; 
    width: 300px; 
    height: 450px;  
    background-color: 
    black; 
    text-align: center;
    justify-content: center;
    border-radius: 30px;
  }
}


.gradient-btn {
	display: inline-block;
	padding: 1em 2em;
	border-radius: 0;
	color: #b2876f;
	margin-top: 2rem;
	font-weight: bold;
	font-size: 0.678rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-decoration: none;
	background: linear-gradient(
		to right,
		rgba(#b2876f, 0) 25%,
		rgba(#b2876f, 0.8) 75%
	);
	background-position: 1% 50%;
	background-size: 400% 300%;
	border: 1px solid #b2876f;
	@include transition;

	&:hover {
		color: white;
		color: #fff;
		background-position: 99% 50%;
	}
}


</style>

<script>
import axios from '@/components/api/axio';
export default {
    name : "MarkerModal",
    props:["latlng"],
    data() {
        return {
            pos:"경기도",
            comment:null,
            images:null,
            imageFile:null,
            info:{
                latlng: null,
            } 
        }
    },
    mounted() {
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(this.latlng.getLng(), this.latlng.getLat(),(result,status)=>{
            if (status === window.kakao.maps.services.Status.OK) {
                this.pos = result[0].address.address_name
            }
        });
    },
    methods:{
        create(){
            const param = {
                pos : this.pos,
                coordx : this.latlng.getLng(),
                coordy : this.latlng.getLat(),
                comment : this.comment
            }
            console.log(this.imageFile)
            let form = new FormData();
            form.append('file',this.imageFile);
            axios.post('/upload/file', form, {
                header: { 'Content-Type': 'multipart/form-data' }
            }).then( ({data}) => {
                console.log(data)
            })
            .catch( err => console.log(err))
            axios
                .post(`/pins/pin`, param, {})
                .then((res) => {
                console.log("---axios Post 성공---- ");
                this.info.id = res.data.result;
                this.info.latlng = this.latlng;
                this.info.pos = this.pos;
                this.$emit("create",this.info)
                console.log("아이디:"+ res.data.result)
            })
                .catch((res) => {
                console.error(res);
            });
        },
        selectImg(e){
            var files = e.target.files[0];
            this.imageFile = files;
            this.images = URL.createObjectURL(files)
            console.log(this.images)
        },
        close(){
            this.$emit('cancel')
        }
    }
}
</script>
