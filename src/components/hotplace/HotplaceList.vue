<template>
    <div class="p-3 mb-3 border-bottom container-sm">
        핫플레이스 리스트
        <div class="container-sm">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div class="row g-3" method="get" action="${root}/hotPlace/list">
                    <input type="hidden" name="action" value="list">
                    <div class="col-auto">
                        <input type="text" class="form-control" id="name" name="name" placeholder="작성자, 제목, 내용">
                    </div>
                    <div class="col-auto">
                        <select class="form-select" name="select">
                            <option value="1" selected>최신등록순</option>
                            <option value="2">인기순</option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-secondary mb-3">검색</button>
                        <router-link :to="{name: 'hotplace-write'}" class="ms-1 btn btn-primary mb-3">글쓰기</router-link>
                    </div>
                </div>
            </div>
            <!--            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">-->
            <!--                <div class="row row-cols-1 row-cols-md-4 g-4">-->
            <!--                    &lt;!&ndash;                    <c:forEach items="${hotPlaces}" var="hotPlace">&ndash;&gt;-->
            <!--                    <div class="col-4" style="width: 300px" v-for="hotplace in hotPlaceList" :key="hotplace.hotPlaceId">-->
            <!--                        <div class="card h-100">-->
            <!--                            <div class="position-relative">-->
            <!--                                <img src="${root}/assets/img/userUpload/${hotPlace.storeFileName}"-->
            <!--                                     class="card-img-top"-->
            <!--                                     alt="..." style="width: 100%; height: 300px; object-fit:cover;">-->

            <!--                            </div>-->
            <!--                            <div class="card-body">-->
            <!--                                <h5 class="card-title">${hotPlace.name}</h5>-->
            <!--                                <p class="card-text text-truncate">${hotPlace.desc}</p>-->
            <!--                                <div class="text-end">-->
            <!--                                    조회수 : ${hotPlace.hit} | 작성자 : ${hotPlace.nickname}-->
            <!--                                </div>-->
            <!--                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">-->
            <!--                                    <button type="button" class="btn btn-primary"-->
            <!--                                            onclick="location.href='/hotPlace/${hotPlace.hotPlaceId}'">더보기-->
            <!--                                    </button>-->
            <!--                                    &lt;!&ndash;                                        <%&#45;&#45;&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                        <button type="button" class="btn btn-primary" &#45;&#45;%>&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                            <%&#45;&#45;&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                            onclick="location.href='/hotPlace/mvedit&hotPlaceId=${hotPlace.hotPlaceId}'">수정&#45;&#45;%>&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                            <%&#45;&#45;&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                        </button>&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                        &#45;&#45;%>&ndash;&gt;-->
            <!--                                    <button type="button" class="btn btn-primary"-->
            <!--                                            onclick="location.href='/likeHotPlace?hotPlaceId=${hotPlace.hotPlaceId}'">-->
            <!--                                        담기-->
            <!--                                    </button>-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                            <div class="card-footer">-->
            <!--                                <small class="text-body-secondary">${hotPlace.createdDate}</small>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                    &lt;!&ndash;                    </c:forEach>&ndash;&gt;-->
            <!--                </div>-->
            <!--            </div>-->
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
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            // user 정보 요청 api 주소
            const API_URL = `http://localhost:8080/hotplaces`;
            // axios 요청 (Spring Boot Rest API 참고)
            axios({
                url: API_URL,
                method: "get",
                // params: {
                //     loginId: this.$store.state.memberStore.loginUser.loginId,
                // },
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }
            }).then((res) => {
                // res.data;
                console.log("[핫플레이스] 리스트 정보 응답={}", res);
                // if (res.data) {
                //     this.userInfo = res.data;
                // }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>