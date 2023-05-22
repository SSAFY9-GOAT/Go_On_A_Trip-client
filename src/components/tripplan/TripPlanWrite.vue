<template>
    <div class="container">
        <main class="container">
            <div class="p-4 p-md-5 mb-4 text-secondary rounded bg-white shadow">
                <div class="col-md-6 px-0">
                    <h1 class="display-5 fst-italic">나만의 여행 계획 세우기</h1>
                    <p class="lead my-3">나만의 여행 계획을 세워보세요!</p>
                </div>
            </div>
            <!-- start section -->
            <div class="container d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <form class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="관광지 검색" aria-label="keyword" id="keyword"
                               value="" v-model="condition"/>
                    </div>
                    <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasScrolling" @click="loadData">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                        <i class="bi bi-search"></i>
                        <button type='button' class='btn btn-success' onclick='done()'>일정 확정</button>
                    </div>
                </form>
            </div>
            <!-- start album -->

            <div class="row">
<!--                맵 표시-->
                <TripPlanMap class='col-8 mh-100' ref="map"></TripPlanMap>
                                <div class="col-4">
                                    <form id="planList" method="post" action="${root}/tripPlan/create">
                                        <input type="hidden" id="contentList" name="contentList" value="">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" >제목</span>
                                            <input type="text" class="form-control" name="planTitle" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
                                        </div>
                                        <table id="plan" class="table table-hover ">
                                            <tr>
                                                <th class="pb-2">여행 경로</th>
                                            </tr>
                                            <tr v-for="tripPlan in tripPlanList" :key="tripPlan.id">
                                                <td class="py-1">{{tripPlan.title}}</td>
                                            </tr>
                                        </table>
                                        <button id="createPlan" type='submit' class='btn btn-success' >최적의 경로로 등록하기</button>
                                    </form>
                                </div>
            </div>

            <!-- end album -->
            <!-- start right bar -->

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel"
                 :class="{'show': showOffcanvas}"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">검색 결과</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                            @click="toggleOffcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="album py-5">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-1 g-3" id="tour-list">
                                <!-- 관광지 정보 비동기 통신 -->
                                <div class="col">
                                    <div v-for="attraction in attractionList" :key="attraction.id" class="card shadow-sm">
                                        <img :src=attraction.firstImage alt=""/>
                                        <div class="card-body">
                                            <h5 class="card-title">{{ attraction.title }}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">{{ attraction.addr1 }}</h6>
                                        </div>
                                        <span>
                                        <b-button class="mx-2 mb-2" variant="outline-secondary" @click="addMarker(attraction)">보기</b-button>
                                        <b-button class="mx-2 mb-2" variant="outline-success" @click="addAttraction(attraction)">추가</b-button>

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end right bar -->


        </main>
    </div>
</template>

<script>
import axios from "axios";
import TripPlanMap from "@/components/tripplan/TripPlanMap.vue";

export default {

    name: "TripPlanWrite",
    components: {TripPlanMap},
    data() {
        return {
            condition: "",
            attractionList: [],
            attraction: null,
            tripPlanList: [],
            showOffcanvas: false,
        };
    },
    methods: {
        toggleOffcanvas() {
            this.showOffcanvas = !this.showOffcanvas;
        },
        write() {
            let tripplan = {};
            this.$emit("write", tripplan);
        },
        loadData() {
            const title = this.condition;
            const API_URL = `http://localhost:8080/tripplan/tripPlanList/${title}`
            axios({
                url: API_URL,
                method: 'GET'
            }).then((res) => {
                this.attractionList = res.data;
            })
            this.toggleOffcanvas();
        },
        addMarker(attraction) {
            this.$refs.map.addMarker(attraction);
        },
        addAttraction(attraction) {
            // console.log(attraction);
            this.tripPlanList.push(attraction);
            console.log(this.tripPlanList);
            this.$refs.map.addMarker(attraction);
            // todo: 추가를 누르면 삭제 버튼으로 바꾸고 삭제 기능 추가
        }
// todo: 경로그리기, 마커 한눈에 들어오기, db에 저장
    }
}
</script>

<style scoped>

</style>