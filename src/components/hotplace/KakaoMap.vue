<template>
    <div id=map></div>
</template>

<script>
export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
            marker: null,
        }
    },
    mounted() {
        console.log("mounted ::");
        if (window.kakao && window.kakao.maps) {

            this.loadMap();
        } else {

            this.loadScript();
        }
    },
    created() {
        console.log("created :: ");
    },
    methods: {
        loadScript() {
            console.log("loadScript :: ");
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
                process.env.VUE_APP_KAKAO_MAP_API_KEY +
                "&autoload=false";
            script.onload = () => window.kakao.maps.load(this.loadMap);

            document.head.appendChild(script);
        },
        loadMap() {
            console.log("loadmap :: ");
            var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
            const options = { //지도를 생성할 때 필요한 기본 옵션
                // center: new kakao.maps.LatLng(${attractions.get(0).latitude}, ${attractions.get(0).longitude}), //지도의 중심좌표.
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
            // this.getTourList();
            this.map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            this.$emit("initialized");
        },
        panTo(lon, lat) {
            // 이동할 위도 경도 위치를 생성합니다
            var moveLatLon = new window.kakao.maps.LatLng(lat, lon);

            if (this.marker) {
                this.marker.setMap(null);
            }

            // 마커가 표시될 위치입니다
            var markerPosition = new window.kakao.maps.LatLng(lat, lon);

            // 마커를 생성합니다
            var marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);

            this.map.panTo(moveLatLon);
        },
        panToHotPlace(hotPlace) {
            if (this.map && hotPlace) {
                let moveLatLon = new window.kakao.maps.LatLng(
                    hotPlace.latitude,
                    hotPlace.longitude
                );

                if (this.marker) {
                    this.marker.setMap(null);
                }

                var markerPosition = new window.kakao.maps.LatLng(
                    hotPlace.latitude,
                    hotPlace.longitude
                );

                this.marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });

                this.marker.setMap(this.map);

                this.map.panTo(moveLatLon);
            }
        },
    }
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>