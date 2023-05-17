<template>
    <div>
        <div class="container">
            <form class="row" onchange="getTourList()">
<!--                <form class="row">-->
                <div class="col-3">
                    <select class="form-select" aria-label="sidoCode" id="sidoCode" onchange="getSigunguCode(this.value)">
<!--                        <c:forEach items="${sidos}" var="sido">-->
<!--                            <option value="${sido.code}">${sido.name}</option>-->
<!--                        </c:forEach>-->
                    </select>
                </div>
                <div class="col-3">
                    <select class="form-select" aria-label="gugunCode" id="gugunCode">
<!--                        <c:forEach items="${guguns}" var="gugun">-->
<!--                            <option value="${gugun.code}">${gugun.name}</option>-->
<!--                        </c:forEach>-->
                    </select>
                </div>
                <div class="col-3">
                    <select class="form-select" aria-label="contentTypeId" id="contentTypeId">
                        <option value="12">관광지</option>
                        <option value="14">문화시설</option>
                        <option value="15">축제공연행사</option>
                        <option value="25">여행코스</option>
                        <option value="28">레포츠</option>
                        <option value="32">숙박</option>
                        <option value="38">쇼핑</option>
                        <option value="39">음식점</option>
                    </select>
                </div>
                <div class="col-3">
                    <button
                            class="btn btn-primary"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasScrolling"
                            aria-controls="offcanvasScrolling">
                        결과 열기
                    </button>
                </div>
                <!-- getTourList() -->
            </form>
        </div>
        <!-- start map -->
        <div class="mt-3">
            <div id="map" style="width: 100%; height: 600px"></div>
        </div>
        <!-- end map -->
        <!-- start right bar -->

        <div
                class="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabindex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">검색 결과</h5>
                <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <div class="album py-5">
                    <div class="container">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-1 g-3" id="tour-list">
<!--                            <c:forEach items="${attractions}" var="attraction">-->
<!--                                <div class="col">-->
<!--                                    <div class="card shadow-sm">-->
<!--                                        <img src="${attraction.firstImage}" alt=""/>-->
<!--                                        <div class="card-body">-->
<!--                                            <h5 class="card-title">${attraction.title}</h5>-->
<!--                                            <h6 class="card-subtitle mb-2 text-muted">${attraction.addr1}</h6>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </c:forEach>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AttractionMap",
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        }
        else {
            this.loadScript();
        }
    },
    methods: {
        loadScript() {
            const script = document.createElement("script");
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?appkey=67bf9df1f860d845304095814dcc0bb0&autoload=false";
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
        }
    }
}
</script>

<style scoped>
.wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}
</style>