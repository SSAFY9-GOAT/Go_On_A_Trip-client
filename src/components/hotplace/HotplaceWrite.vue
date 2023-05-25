<template>
    <div>핫플레이스 등록
        <main class="container">
            <div class="p-4 p-md-5 mb-4 text-secondary rounded bg-white shadow">
                <div class="col-md-6 px-0">
                    <h1 class="display-5 fst-italic">핫플 인증</h1>
                    <p class="lead my-3">방문했던 핫플레이스를 자랑하세요!</p>
                </div>
            </div>
            <!-- start album -->

            <div class="row">
                <div class="col text-end">
                    <kakao-map ref="kakaoMap"></kakao-map>
                    <!--                    <div id="map" style="width: 100%; height: 500px"></div>-->
                    <!--                    <AttractionMap :attractions="attractions" ref="map"></AttractionMap>-->
                </div>
                <form class="col col-6" action="${root}/hotPlace/write" method="post" enctype="multipart/form-data">
                    <input type="hidden" id='contentId' name="contentId" value="-1">
                    <input type="hidden" id='contentTypeId' name="contentTypeId" value="-1">
                    <div class="mb-3">
                        <label for="uploadFileName" class="form-label">인증샷</label>
                        <input name="hotplaceImg" type="file" class="form-control" id="uploadFileName"
                               @input="fileUpload">
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">나만의 핫플레이스 이름</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="title">
                    </div>
                    <div class="mb-3">
                        <label for="visitedDate" class="form-label">방문 날짜</label>
                        <input v-model="visitedDate" type="date" class="form-control" id="visitedDate"
                               name="visitedDate">
                    </div>
                    <div class="mb-3">
                        <label for="desc" class="form-label">핫플레이스 설명</label>
                        <textarea v-model="desc" class="form-control" id="desc" rows="3" name="desc"></textarea>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <button class="btn btn-primary me-md-2" type="button" @click="write">글쓰기</button>
                        <button class="btn btn-secondary" type="button">목록</button>
                    </div>
                </form>
            </div>
            <!-- end album -->
        </main>
        <!-- end section -->
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">검색결과</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import KakaoMap from "@/components/hotplace/KakaoMap.vue";
// import image from "@/assets/js/image"

export default {
    name: "HotplaceWrite",
    components: {KakaoMap},
    data() {
        return {
            title: "",
            desc: "",
            visitedDate: "",
            lat: 0,
            lon: 0,
        };
    },
  mounted() {
    const today = new Date().toISOString().substr(0, 10);
    this.visitedDate = today;
  },
    methods: {
        write() {
            let frm = new FormData();
            let file = document.getElementById('uploadFileName');
            console.log(this.$store.state.memberStore.loginUser)
            frm.append('loginId', this.$store.state.memberStore.loginUser.loginId);
            frm.append('name', this.title)
            frm.append('desc', this.desc)
            frm.append('visitedDate', this.visitedDate)
            frm.append('file', file.files[0]);

            const API_URL = `http://localhost:8080/hotplaces/write`;
            axios.post(API_URL, frm, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                console.log("[핫플레이스] 쓰기 응답={}", res);
                if(res.data>0){
                    alert("등록이 완료되었습니다.");
                    this.$router.push("/hotplaces/"+res.data);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // fileUpload(e) {
        fileUpload() {
            let frm = new FormData();
            let file = document.getElementById('uploadFileName');
            // let file = e.target.files[0];
            frm.append('file', file.files[0]);

            const API_URL = `http://localhost:8080/hotplaces/getImageLocation`;
            axios.post(API_URL, frm, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                console.log("[핫플레이스] 업로드 파일 주소 정보 = {}", res);
                this.lon = res.data.lon;
                this.lat = res.data.lat;
                this.$refs.kakaoMap.panTo(this.lon, this.lat);
            }).catch((err) => {
                console.log(err);
            });
        },
    }

}
</script>

<style scoped>
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