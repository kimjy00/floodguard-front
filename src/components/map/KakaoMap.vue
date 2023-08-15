<template>
    <div id="map">
      <!------ 오버레이 존 ------>
      <slot name="overlay">
        <div class="overlay-popup" ref="overlayContent">
          <div v-if="selectedMarker">
            <h3>{{ selectedMarker.name }}</h3>
            <div v-if="selectedMarker.loaded">
              <video class="cctv-video" autoplay ref="videoPlayer">
              <source :src="selectedMarker.url" type="video/mp4">
            </video>
            </div>
            <div v-else style="display: flex;justify-content : center;">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <br>
            <a href="#" @click.prevent="closeOverlay()">close</a>
            <div v-if="this.$store.state.userstore.token">
              <a v-if="!isFavorite(selectedMarker.id)" href="#" style="float: right;" @click.prevent="doFavorite()">관심사 등록</a>
            <a v-else href="#" style="float: right;" @click.prevent="doFavorite()">관심사 해제</a>
            </div>
          </div>
        </div>
      </slot>
      <!------>
      <MarkerModal v-if="isMarkerCreate" v-bind:latlng="selectedPos" @cancel="createMarkerCancel" @create="createMarker"></MarkerModal>
      <MenuTab></MenuTab>
    </div>
</template>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
  position:relative;
  overflow:hidden;
  z-index: 1;
}
.overlay-popup{
    background-color: white;
    position: absolute;
    bottom: 35px;
    /* right: 30px; */
    .cctv-video{
      width: 300px;
      height: 200px;
    }
}
</style>
<script>
import axios from '@/components/api/axio';
import KaKaoOverlay from "@/components/map/overlay";
import MenuTab from "@/components/map/MenuTab.vue"
import MarkerModal from './MarkerModal.vue';
export default {
  name: "KakaoMap", // 컴포넌트 이름 지정
  props: ['item'],
  components: {
    MenuTab,
    MarkerModal
  },
  data() {
    return {
      // map 객체 설정
      map: null,
      overlay: null,
      selectedMarker: null,
      selectedPos:null,
      isMarkerCreate: false,
      favorite: [],
    };
  },
  setup() {
  },
  created() {},
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted() {},
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=e1f93f9c861e7e2dc5674becfdcdf4a9&autoload=false&libraries=services"; 
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map"); 
      const options = {
        center: new window.kakao.maps.LatLng(37.56631740067052, 126.97869767937226), 
        level: 10,
        disableDoubleClickZoom: true
      };

      this.map = new window.kakao.maps.Map(container, options);
      window.kakao.maps.event.addListener(this.map, 'dblclick', (mouseEvent) => {
        if(this.$store.state.userstore.token){
          this.isMarkerCreate = true;
          this.selectedPos = mouseEvent.latLng;
        }
      });
      window.kakao.maps.event.addListener(this.map, 'click', () => {
        this.closeOverlay();
      });
      this.overlay = new KaKaoOverlay(this.map,this.$refs.overlayContent)
      
      axios
      .get('/api/v1/pins/pin').then(res => {
        if(res.status != 200){
            console.log("잘못된 api 호출 : GET : /pins/pin");
            return;
        }
        console.log(res.data.result)
        res.data.result.forEach(element => {
            this.addMarker(new window.kakao.maps.LatLng(element.coordy, element.coordx),element.no,element.name,element.type);
        });
      });
      if(this.$store.state.userstore.token){
        console.log(this.$store.state.userstore)
        axios
          .get('/api/v1/pins/pin/pinlist/'+this.$store.state.userstore.userName)
          .then((res) => {
            res.data.result.forEach(element => {
              this.favorite.push(element.pinid)
            })
            console.log(res.data.result)
          })
      }
    },
    // 포지션에 마커 추가
    addMarker(position,id,title,type){
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new window.kakao.maps.Size(24, 35); 
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = null;
      marker = new window.kakao.maps.Marker({
          position: position,
          title: title,
        });
        if(type == 2){
        marker = new window.kakao.maps.Marker({
          position: position,
          title: title,
          image: markerImage
        });
        }
        marker.id = id;
        marker.name = title;
        this.setMarker(marker);
    },
    createMarker(info){
      this.isMarkerCreate = false;
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new window.kakao.maps.Size(24, 35); 
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new window.kakao.maps.Marker({
          position: info.latlng,
          image: markerImage
        });
        this.setMarker(marker)
    },
    createMarkerCancel(){
      this.isMarkerCreate = false;
    },
    setMarker(marker){
      marker.setMap(this.map);
        window.kakao.maps.event.addListener(marker,'click',() => {
            this.$emit('updateData', true)
            this.selectedMarker = marker
            this.selectedMarker.loaded = false;
            if(marker.id){
              var pos = marker.getPosition();
              this.overlay.showAt(pos.getLat(),pos.getLng());
              axios.get('/api/v1/pins/pin/'+marker.id)
              .then(res => {
                if(res.status != 200){
                console.log("잘못된 api 호출 : GET : /pins/"+marker.id);
                return;
              }
              this.selectedMarker.url = res.data.result.url;
              this.selectedMarker.loaded = true;
              this.$refs.videoPlayer.load();
              this.$emit('updateData', false)
            }).catch(err => {
              console.log(err, err.response); 
            })
            }
        })
    },
    doFavorite(){
      if(this.favorite.includes(this.selectedMarker.id)){
        var id = this.selectedMarker.id
        this.favorite = this.favorite.filter(function(data) {
          return data != id;
        });
      }
      else{
        this.favorite.push(this.selectedMarker.id);
      }
      axios.get('/api/v1/pins/pin/register/'+this.selectedMarker.id)
              .then(res => {
                if(res.status != 200){
                console.log("잘못된 api 호출 : GET : /pins/");
                return;
              }
            }).catch(err => {
              console.log(err, err.response); 
            })
    },
    isFavorite(id){
      console.log(id)
      console.log(this.favorite)
      return this.favorite.includes(id)
    },
    closeOverlay(){
      this.overlay.hide()
    },
  },
};
</script>