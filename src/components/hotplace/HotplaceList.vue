<template>
    <div class="p-3 mb-3 border-bottom container-sm">
        핫플레이스 리스트
        <div class="container-sm">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div class="row g-3" method="get" action="${root}/hotPlace/list">
                    <input type="hidden" name="action" value="list">
                    <div class="col-auto">
                        <input type="text" v-model="name" class="form-control" id="name" name="name"
                               placeholder="작성자, 제목, 내용">
                    </div>
                    <div class="col-auto">
                        <select class="form-select" name="select" type="number" v-model="sortCondition">
                            <option value=1 selected>최신등록순</option>
                            <option value=2>인기순</option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-secondary mb-3">검색</button>
                        <router-link :to="{name: 'hotplace-write'}" class="ms-1 btn btn-primary mb-3">글쓰기</router-link>
                    </div>
                </div>
            </div>
            <div
                    class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <!--                    <c:forEach items="${hotPlaces}" var="hotPlace">-->
                    <div class="col-4" style="width: 300px" v-for="hotplace in hotPlaceList"
                         :key="hotplace.hotPlaceId">
                        <div class="card h-100">
                            <div class="position-relative">
                                <img :src="require(`@/assets/img/userUpload/${hotplace.storeFileName}`)"
                                     class="card-img-top"
                                     alt="..." style="width: 100%; height: 300px; object-fit:cover;">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ hotplace.name }}</h5>
                                <p class="card-text text-truncate">{{ hotplace.desc }}</p>
                                <div class="text-end">
                                    조회수 : {{ hotplace.hit }} <br> 작성자 : {{ hotplace.nickname }}
                                </div>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <router-link
                                            :to="{name: 'hotplace-detail', params: {hotPlaceId: hotplace.hotPlaceId}}"
                                            type="button" class="btn btn-primary"
                                    >더보기
                                    </router-link>
                                    <button type="button" class="btn btn-primary"
                                            onclick="location.href='/likeHotPlace?hotPlaceId=${hotPlace.hotPlaceId}'">
                                        담기
                                    </button>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">{{ hotplace.createdDate }}</small>
                            </div>
                        </div>
                    </div>
                    <!--                    </c:forEach>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "hotplace-list",
    data() {
        return {
            hotPlaceList: [],
            name: "",
            sortCondition: 1,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        getImagePath(fileName) {
            return require(`@/assets/img/userUpload/${fileName}`);
        },
        loadData() {
            const API_URL = `http://localhost:8080/hotplaces`;
            console.log("[핫플레이스] 리스트 요청")
            axios({
                url: API_URL,
                method: "get",
                params: {
                    name: this.name,
                    sortCondition: parseInt(this.sortCondition),
                },
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }
            }).then((res) => {
                console.log("[핫플레이스] 리스트 정보 응답={}", res);
                this.hotPlaceList = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>