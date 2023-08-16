<template>
  <div id="map">
    <!------ 오버레이 존 ------>
    <slot name="overlay">
      <div class="overlay-popup" ref="overlayContent">
        <div v-if="selectedMarker">
          <p style="text-align: center;font-size:25px;">{{ selectedMarker.name }}</p>
          <div v-if="this.selectedMarker.type == 0">
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
          </div>
          <p style="text-align: center;">{{ selectedMarker.comment }}</p>
          <p></p>
          <div style="display: flex;justify-content: space-between;  margin: 20px;">
            <button style="" type="button" @click.prevent="closeOverlay()" class="btn btn-secondary">close</button>
            <div v-if="this.$store.state.userstore.userRole == 'ADMIN' && selectedMarker.type != 2">
              <button style="" type="button" @click.prevent="removeMarker(selectedMarker.id)"
                class="btn btn-secondary">삭제</button>
            </div>
            <div v-if="this.$store.state.userstore.token">
              <div v-if="selectedMarker.type != 2">
                <button v-if="!isFavorite(selectedMarker.id)" style="float:right" type="button"
                  @click.prevent="doFavorite(selectedMarker.id)" class="btn btn-secondary">관심사 등록</button>
                <button v-else style="float:right" type="button" @click.prevent="doFavorite(selectedMarker.id)"
                  class="btn btn-secondary">관심사 해제</button>
              </div>
              <div v-else>
                <a href="#" style="float: right;" @click.prevent="removeMarker(selectedMarker.id)">삭제</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <!------>
    <MarkerModal v-if="isMarkerCreate" v-bind:latlng="selectedPos" @cancel="createMarkerCancel" @create="createMarker">
    </MarkerModal>
    <MenuTab></MenuTab>
  </div>
</template>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.overlay-popup {
  color: white;
  background-color: rgb(34, 33, 33);
  min-width: 200px;
  min-height: 100px;
  position: absolute;
  bottom: 35px;
  border-radius: 30px;

  /* right: 30px; */
  .cctv-video {
    width: 100%;
    height: 200px;
    text-align: center;
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
      selectedPos: null,
      isMarkerCreate: false,
      favorite: [],
    };
  },
  setup() {
  },
  created() { },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted() { },
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
        if (this.$store.state.userstore.token) {
          this.isMarkerCreate = true;
          this.selectedPos = mouseEvent.latLng;
        }
      });
      window.kakao.maps.event.addListener(this.map, 'click', () => {
        this.closeOverlay();
      });
      this.overlay = new KaKaoOverlay(this.map, this.$refs.overlayContent)

      axios
        .get('/pins/pin').then(res => {
          if (res.status != 200) {
            console.log("잘못된 api 호출 : GET : /pins/pin");
            return;
          }
          console.log(res.data.result)
          res.data.result.forEach(element => {
            this.addMarker(new window.kakao.maps.LatLng(element.coordy, element.coordx), element.no, element.name, element.type);
          });
        });
      if (this.$store.state.userstore.token) {
        console.log(this.$store.state.userstore)
        axios
          .get('/pins/pin/pinlist/' + this.$store.state.userstore.userName)
          .then((res) => {
            res.data.result.forEach(element => {
              this.favorite.push(element.pinid)
            })
            console.log(res.data.result)
          })
      }
    },
    // 포지션에 마커 추가
    addMarker(position, id, title, type) {
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new window.kakao.maps.Size(24, 35);
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = null;
      marker = new window.kakao.maps.Marker({
        position: position,
        title: title,
      });
      if (type == 2) {
        marker = new window.kakao.maps.Marker({
          position: position,
          title: title,
          image: markerImage
        });
      }
      marker.id = id;
      marker.name = title;
      marker.type = type
      this.setMarker(marker);
    },
    createMarker(info) {
      this.isMarkerCreate = false;
      this.addMarker(info.latlng, info.id, info.pos, 2)
      this.doFavorite(info.id);
    },
    createMarkerCancel() {
      this.isMarkerCreate = false;
    },
    setMarker(marker) {
      marker.setMap(this.map);
      window.kakao.maps.event.addListener(marker, 'click', () => {
        this.$emit('updateData', true)
        this.selectedMarker = marker
        this.selectedMarker.loaded = false;
        if (marker.id) {
          var pos = marker.getPosition();
          this.overlay.showAt(pos.getLat(), pos.getLng());
          axios.get('/pins/pin/' + marker.id)
            .then(res => {
              if (res.status != 200) {
                console.log("잘못된 api 호출 : GET : /pins/" + marker.id);
                return;
              }
              this.selectedMarker.url = res.data.result.url;
              this.selectedMarker.comment = res.data.result.comment;
              this.selectedMarker.loaded = true;
              this.$refs.videoPlayer.load();
              this.$emit('updateData', false)
            }).catch(err => {
              console.log(err, err.response);
            })
        }
      })
    },
    doFavorite(id) {
      if (this.favorite.includes(id)) {
        this.favorite = this.favorite.filter(function (data) {
          return data != id;
        });
      }
      else {
        this.favorite.push(id);
      }
      axios.get('/pins/pin/register/' + id)
        .then(res => {
          if (res.status != 200) {
            console.log("잘못된 api 호출 : GET : /pins/");
            return;
          }
        }).catch(err => {
          console.log(err, err.response);
        })
      return;
    },
    isFavorite(id) {
      console.log(id)
      console.log(this.favorite)
      return this.favorite.includes(id)
    },
    removeMarker(id) {
      this.selectedMarker.setMap(null);
      this.closeOverlay();
      axios.delete('/pins/pin/' + id);
    },
    closeOverlay() {
      this.selectedMarker = null;
      this.overlay.hide()
    },
  },
};
</script>