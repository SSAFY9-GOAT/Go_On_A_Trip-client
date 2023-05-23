<template>
    <div class="mt-3">
        <div ref="map" style="width: 100%; height: 600px"></div>
    </div>
</template>

<script>
export default {
    name: "DetailPlanMap",
    props: ['detailPlans'],
    data() {
        return {
            map: null,
            linePath: [],
            markers: [],
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
            script.onload = () => window.kakao.maps.load(() =>{this.loadMap});

            document.head.appendChild(script);
        },
        loadMap() {
            let container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스
            const options = { //지도를 생성할 때 필요한 기본 옵션
                // center: new kakao.maps.LatLng(${attractions.get(0).latitude}, ${attractions.get(0).longitude}), //지도의 중심좌표.
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
            // this.getTourList();
            this.map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            this.setMarker();
            this.setLine();
        },
        setMarker() {
            let map = this.map;
            let markers = this.markers;
            this.detailPlans.forEach(function (detailPlan){
                let x = detailPlan.latitude;
                let y = detailPlan.longitude;
                let markerPosition = new window.kakao.maps.LatLng(x, y);

                let marker = new window.kakao.maps.Marker({position: markerPosition});
                marker.setMap(map);

                markers.push(marker.getPosition());
            })
            let bounds = new window.kakao.maps.LatLngBounds();
            for (let i = 0; i < this.markers.length; i++) {
                bounds.extend(this.markers[i]);
            }
            this.map.setBounds(bounds);

        },
        setLine() {
            let linePath = this.linePath;
            this.detailPlans.forEach(function (detailPlan){
                let x = detailPlan.latitude;
                let y = detailPlan.longitude;
                linePath.push(new window.kakao.maps.LatLng(x, y));
            })
            let polyline = new window.kakao.maps.Polyline({
                path: this.linePath,
                strokeWeight: 5, // 선의 두께 입니다
                strokeColor: '#FF0000', // 선의 색깔입니다
                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid' // 선의 스타일입니다
            });
            polyline.setMap(this.map);
        }
    }

}
</script>

<style scoped>

</style>