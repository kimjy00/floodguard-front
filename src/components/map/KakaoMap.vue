<template>
    <div id="map">
      <slot name="overlay">
        <div class="overlay-popup" ref="overlayContent">
          <div v-if="selectedMarker">
            <h3>{{ selectedMarker.name }}</h3>
            <div v-if="selectedMarker.loaded">
              <video class="cctv-video" autoplay ref="videoPlayer">
              <source :src="selectedMarker.url" type="video/mp4">
            </video>
            </div>
            <div v-else>
              <div class="spinner-border" role="status" style="margin: auto;">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <br>
            <a href="#" @click.prevent="closeOverlay()">close</a>
          </div>
        </div>
      </slot>
    </div>
</template>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
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
import axios from 'axios';
import KaKaoOverlay from "@/components/map/overlay";
export default {
  name: "KakaoMap", // 컴포넌트 이름 지정
  props: ['item'],
  data() {
    return {
      // map 객체 설정
      map: null,
      overlay: null,
      selectedMarker: null,
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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=e1f93f9c861e7e2dc5674becfdcdf4a9&autoload=false"; 
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
        this.createMarker(mouseEvent.latLng);
      });
      window.kakao.maps.event.addListener(this.map, 'click', () => {
        this.closeOverlay();
      });
      this.overlay = new KaKaoOverlay(this.map,this.$refs.overlayContent)

      axios.get('/api/v1/pins/pin').then(res => {
        if(res.status != 200){
            console.log("잘못된 api 호출 : GET : /pins/pin");
            return;
        }
        res.data.result.forEach(element => {
            this.addMarker(new window.kakao.maps.LatLng(element.coordy, element.coordx),element.no,element.name);
        });
      });
    },
    // 포지션에 마커 추가
    addMarker(position,id,title){
      var marker = new window.kakao.maps.Marker({
          position: position,
          title: title,
        });
        marker.id = id;
        marker.name = title;
        this.setMarker(marker);
    },
    createMarker(position){
      var marker = new window.kakao.maps.Marker({
          position: position
        });
        this.setMarker(marker)
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
    closeOverlay(){
      this.overlay.hide()
    },
  },
};
</script>