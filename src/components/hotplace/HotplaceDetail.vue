<template>
    <div>
        <div class="p-4 p-md-5 mb-4 text-secondary rounded bg-white shadow">
            <div class="col-md-6 px-0">
                <h1 class="display-5 fst-italic">핫플 인증</h1>
                <p class="lead my-3">방문했던 핫플레이스를 자랑하세요!</p>
            </div>
        </div>
        <main class="container">
            <!-- start album -->

            <div class="row">

                <div class="col text-end">
                    <kakao-map ref="kakaoMap" @initialized="handleKakaoMapInitialized"></kakao-map>
                </div>
                <div class="col col-6">
                    <div class="mb-3" align="center">
                        <img :src="require(`@/assets/img/userUpload/${hotPlace.image}`)"
                             class="img-fluid   col-md-4"
                             alt="..." style="width: auto; height: 370px;">
                    </div>
                    <div class="mb-3 row g-3">
                        <div class="col-md-6">
                            <label for="nickname" class="form-label">작성자</label>
                            <input type="text" class="form-control" id="nickname" name="nickname"
                                   v-model="hotPlace.nickname"
                                   disabled>
                        </div>
                        <div class="col-md-6">
                            <label for="visitedDate" class="form-label">방문 날짜</label>
                            <input type="text" class="form-control" id="visitedDate" name="visitedDate"
                                   v-model="hotPlace.visitedDate" disabled>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">핫플레이스 이름</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="hotPlace.name" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="desc" class="form-label">핫플레이스 설명</label>
                        <textarea class="form-control" id="desc" rows="5" v-model="hotPlace.desc" disabled></textarea>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <router-link :to="{name:'hotplaces'}" class="btn btn-secondary" type="button">목록</router-link>
                    </div>
                </div>
            </div>
            <!-- end album -->
        </main>
    </div>
</template>

<script>
import axios from "axios";
import KakaoMap from "@/components/hotplace/KakaoMap.vue";

export default {
    name: "HotplaceDetail",
    components: {KakaoMap},
    data() {
        return {
            hotPlace: null,
            isKakaoMapInitialized: false,
        };
    },
    created() {
        let hotplaceId = this.$route.params.hotPlaceId;
        const API_URL = `http://localhost:8080/hotplaces/${hotplaceId}`;
        console.log("[핫플레이스] 정보 요청");
        axios({
            url: API_URL,
            method: "get",
            params: {
                hotplaceId: hotplaceId,
                id: this.$store.state.memberStore.loginUser.id,
            },
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/",
                "Access-Control-Allow-Headers": "Authorization",
                Authorization: sessionStorage.getItem("access-token"),
            },
        })
            .then((res) => {
                console.log("[핫플레이스] 단건조회 정보 응답={}", res);
                this.hotPlace = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        getImagePath(fileName) {
            return "/img/userUpload/" + fileName;
        },
        handleKakaoMapInitialized() {
            this.isKakaoMapInitialized = true;
            this.$nextTick(() => {
                this.$refs.kakaoMap.panToHotPlace(this.hotPlace); // KakaoMap 컴포넌트의 panToHotPlace 메서드 호출
            });
        },
    },
};
</script>

<style scoped>

</style>