<template>
  <div class="mt-3">
    <div id="map" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
export default {
  name: "TripPlanMap",
  data() {
    return {
      map: null,
      linePath: [],
      markers: [],
      detailMarkers: [],
      polyLine: null,
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  created() {

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
      // this.getTourList();
      this.map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    },
    addMarker(attraction) {
      let x = attraction.latitude;
      let y = attraction.longitude;
      let markerPosition = new window.kakao.maps.LatLng(x, y);

      let marker = new window.kakao.maps.Marker({position: markerPosition});
      marker.setMap(this.map);

      this.markers.push(marker.getPosition());
      let bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i]);
      }
      this.map.setBounds(bounds);

    },
    setLoc(tripPlanList) {
      for (let i = 0; i < this.detailMarkers.length; i++) {
        this.detailMarkers[i].setMap(null);
      }
      this.detailMarkers = [];

      this.linePath = [];
      if (this.polyline) {
        this.polyline.setMap(null);
      }
      this.polyline = null;

      for (const tripPlan of tripPlanList) {
        let x = tripPlan.latitude;
        let y = tripPlan.longitude;

        let markerPosition = new window.kakao.maps.LatLng(x, y);
        let marker = new window.kakao.maps.Marker({ position: markerPosition });
        marker.setMap(this.map);

        this.detailMarkers.push(marker);
        let bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < this.detailMarkers.length; i++) {
          bounds.extend(this.detailMarkers[i].getPosition());
        }
        this.map.setBounds(bounds);
        /// 마커

        this.linePath.push(new window.kakao.maps.LatLng(x, y));
      }

      this.polyline = new window.kakao.maps.Polyline({
        path: this.linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      if (this.linePath.length > 1) {
        this.polyline.setMap(this.map);
      }
    },
      // this.detailMarkers.setMap(null);
      // this.detailMarkers = [];
      // tripPlanList.forEach(function (tripPlan) {
      //   let x = tripPlan.latitude;
      //   let y = tripPlan.longitude;
      //   let markerPosition = new window.kakao.maps.LatLng(x, y);
      //
      //   let marker = new window.kakao.maps.Marker({position: markerPosition});
      //   marker.setMap(this.map);
      //
      //   this.detailMarkers.push(marker.getPosition());
      //   let bounds = new window.kakao.maps.LatLngBounds();
      //   for (let i = 0; i < this.detailMarkers.length; i++) {
      //     bounds.extend(this.detailMarkers[i]);
      //   }
      //   this.map.setBounds(bounds);
      //
      //   this.linePath.push(new window.kakao.maps.LatLng(x, y));
      //
      //   let polyline = new window.kakao.maps.Polyline({
      //     path: this.linePath,
      //     strokeWeight: 5, // 선의 두께 입니다
      //     strokeColor: '#FF0000', // 선의 색깔입니다
      //     strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      //     strokeStyle: 'solid' // 선의 스타일입니다
      //   });
      //   polyline.setMap(null);
      //   polyline.setMap(this.map);
      // })


    removeLine() {
      if (this.polyline) {
        this.polyline.setMap(null);
        this.polyline = null;
      }
    },
  },

}
</script>

<style scoped>

</style>