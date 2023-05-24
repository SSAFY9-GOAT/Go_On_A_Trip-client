<template>
  <div>
    <div class="mt-3">
      <div id="map" style="width: 100%; height: 600px"></div>
    </div>
  </div>

</template>

<script>

export default {
  name: "AttractionMap",
  data() {
    return {
      map: null,
      overlays: [],
      markers: [],
    };
  },
  created() {
  },
  mounted() {
    if (window.kakao && window.kakao.maps && window.kakao.maps.Map) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          process.env.VUE_APP_KAKAO_MAP_API_KEY +
          "&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    loadMap() {
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = { //지도를 생성할 때 필요한 기본 옵션
        // center: new kakao.maps.LatLng(${attractions.get(0).latitude}, ${attractions.get(0).longitude}), //지도의 중심좌표.
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      this.map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    },
    refreshMap(attractions) {
      // 기존의 마커와 오버레이를 제거
      this.markers.forEach(marker => marker.setMap(null));
      this.overlays.forEach(overlay => overlay.setMap(null));
      this.markers = [];
      this.overlays = [];

      this.setCenter(attractions)
      this.marker(attractions);
    },
    setCenter(response) {
      // 이동할 위도 경도 위치를 생성합니다
      let attraction = response[0];
      // todo: 지도를 이동시킬때 전체를 볼 수 있게끔?
      var moveLatLon = new window.kakao.maps.LatLng(attraction.latitude, attraction.longitude);

      // 지도 중심을 이동 시킵니다
      this.map.setCenter(moveLatLon);
    },
    marker(response) {
      let attractions = response;
      var positions = [];
      attractions.forEach(function (attraction) {
        let data = {
          content: attraction.title,
          latlng: new window.kakao.maps.LatLng(attraction.latitude, attraction.longitude)
        }
        positions.push(data)
      });
      for (var i = 0; i < positions.length; i++) {

        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].latlng
        });

        this.markers.push(marker);
        if(!attractions[i].firstImage)
          attractions[i].firstImage = require(`@/assets/img/no-img.jpg`);

        let content = '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            attractions[i].title +
            '            <div class="close" @click="closeOverlay()" title="닫기"></div>' +
            '        </div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="' + attractions[i].firstImage + '" width="73" height="70">' +
            '           </div>' +
            '            <div class="desc">' +
            '                <div class="ellipsis">' + attractions[i].addr1 + '</div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        var overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: this.map,
          position: positions[i].latlng
        });
        this.overlays.push(overlay);
      }
      //
      // let bounds = new window.kakao.maps.LatLngBounds();
      // for (let i = 0; i < this.markers.length; i++) {
      //   bounds.extend(this.markers[i]);
      // }
      // this.map.setBounds(bounds);
    }
  },
}
</script>

<style>
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  line-height: 1.5;
}

.wrap * {
  padding: 0;
  margin: 0;
}

.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}

.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info:after {
  content: '';
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
}

.info .link {
  color: #5085BB;
}
</style>