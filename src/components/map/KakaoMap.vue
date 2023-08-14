<template>
    <div id="map">
      <slot>
        <div name="overlay" class="overlay-popup" ref="overlayContent">
          <h3>오버레이 제목</h3>
          <a href="#" @click.prevent="closeOverlay()">close</a>
        </div>
      </slot>
    </div>
</template>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
<script>
// import axios from 'axios'
import KaKaoOverlay from "@/components/map/overlay/";
export default {
  name: "KakaoMap", // 컴포넌트 이름 지정
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
      console.log(this.overlay)
    } else {
      this.loadScript();
    }
    
    // axios.get('/api/v1/users/test').then(res => { 
    //     console.log(res.data);
    //   });
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
        level: 3,
        disableDoubleClickZoom: true
      };

      this.map = new window.kakao.maps.Map(container, options);
      window.kakao.maps.event.addListener(this.map, 'dblclick', (mouseEvent) => {
        this.addMarker(mouseEvent.latLng);
      });
      this.overlay = new KaKaoOverlay(this.map,this.$refs.overlayContent)
    },
    // 포지션에 마커 추가
    addMarker(position){
        var marker = new window.kakao.maps.Marker({
          position: position
        });
        marker.setMap(this.map);
        window.kakao.maps.event.addListener(marker,'click',() => {
            this.selectedMarker = marker
            var pos = marker.getPosition();
            this.overlay.showAt(pos.getLat(),pos.getLng());
        })
    },
    closeOverlay(){
      this.overlay.hide()
    },
  },
};
</script>