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
                        <button type="submit" class="btn btn-secondary mb-3" @click="loadData">검색</button>
                        <router-link :to="{name: 'hotplace-write'}" class="ms-1 btn btn-primary mb-3">글쓰기</router-link>
                    </div>
                </div>
            </div>
            <div
                    class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div class="col-4" style="width: 300px" v-for="hotplace in hotPlaceList"
                         :key="hotplace.hotPlaceId">
                        <div class="card h-100">
                            <div class="position-relative">
                                <img :src="require(`@/assets/img/userUpload/${hotplace.storeFileName}`)"
                                     class="card-img-top"
                                     alt="..." style="width: 100%; height: 300px; object-fit:cover;">
                                <div class="rating ">
                                    <input
                                            :value="hotplace.hotPlaceId"
                                            name="star-radio"
                                            :id="'star-' + hotplace.hotPlaceId"
                                            type="checkbox"
                                            :checked="isLiked(hotplace.hotPlaceId)"

                                    >
                                    <label for="star-1">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                    d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                                    pathLength="360"
                                                    @click="likeIt(!isLiked(hotplace.hotPlaceId), hotplace.hotPlaceId)"></path>
                                        </svg>
                                    </label>
                                </div>
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
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">{{ hotplace.createdDate }}</small>
                            </div>
                        </div>
                    </div>
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
            userLike: []
        }
    },
    created() {
        this.getUserLike();
        // this.loadData();
        console.log("[핫플레이스] created된 핫플 목록 = ", this.hotPlaceList);
        console.log("[핫플레이스] created된 좋아요 목록 = ", this.userLike);
    },
    mounted() {
        console.log("[핫플레이스] mounted 핫플 목록 = ", this.hotPlaceList);
        console.log("[핫플레이스] mounted 좋아요 목록 = ", this.userLike);
    },
    computed: {
        isLiked() {
            return (hotplaceId) => {
                console.log("[핫플레이스] hotplaceId = ", hotplaceId);
                console.log("[핫플레이스] 포함? = ", this.userLike.includes(hotplaceId));
                return this.userLike.includes(hotplaceId);
            };
        },
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
                console.log("[핫플레이스] 리스트 정보 응답={}", res.data);
                this.hotPlaceList = res.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        getUserLike() {
            if (!this.$store.state.memberStore.isLogin) {
                this.userLike = [];
                console.log("[핫플레이스] 로그인 유저 없음 : 유저 좋아요 목록 초기화")

            } else {
                const API_URL = `http://localhost:8080/hotplaces/getLike/${this.$store.state.memberStore.loginUser.id}`;
                console.log("[핫플레이스] 좋아요 목록 요청")
                axios({
                    url: API_URL,
                    method: "post",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000/",
                        "Access-Control-Allow-Headers": 'Authorization',
                        Authorization: sessionStorage.getItem("access-token"),
                    }
                }).then((res) => {
                    console.log("[핫플레이스] 좋아요 목록 응답={}", res.data);
                    this.userLike = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
            this.loadData();
        },
        likeIt(liked, hotplaceId) {
            if (!this.$store.state.memberStore.isLogin) {
                alert("로그인 후 이용가능합니다.")
                return;
            }
            if (!liked) {
                const API_URL = `http://localhost:8080/hotplaces/unLike/${hotplaceId}/${this.$store.state.memberStore.loginUser.id}`;
                console.log("[핫플레이스] 좋아요 취소 요청");
                axios({
                    url: API_URL,
                    method: "post",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000/",
                        "Access-Control-Allow-Headers": "Authorization",
                        Authorization: sessionStorage.getItem("access-token"),
                    },
                })
                    .then((res) => {
                        console.log("[핫플레이스] 좋아요 취소 응답 =", res.data);
                        // 좋아요 목록에서 제거하는 로직 등 원하는 작업 수행
                        const index = this.userLike.indexOf(hotplaceId);
                        if (index !== -1) {
                            this.userLike.splice(index, 1);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {

                const API_URL = `http://localhost:8080/hotplaces/userLike/${hotplaceId}/${this.$store.state.memberStore.loginUser.id}`;
                console.log("[핫플레이스] 좋아요 요청")
                axios({
                    url: API_URL,
                    method: "post",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000/",
                        "Access-Control-Allow-Headers": 'Authorization',
                        Authorization: sessionStorage.getItem("access-token"),
                    }
                }).then((res) => {
                    console.log("[핫플레이스] 좋아요 응답={}", res);
                    this.userLike.push(res.data);
                }).catch((err) => {
                    console.log(err);
                });

            }
        },
    }
}
</script>

<style scoped>
.rating {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.3rem;
    --stroke: #666;
    --fill: #ffc73a;
}

.rating input {
    appearance: unset;
}

.rating label {
    cursor: pointer;
}

.rating svg {
    width: 3rem;
    height: 3rem;
    overflow: visible;
    fill: transparent;
    stroke: var(--stroke);
    stroke-linejoin: bevel;
    stroke-dasharray: 12;
    animation: idle 4s linear infinite;
    transition: stroke 0.2s, fill 0.5s;
}

@keyframes idle {
    from {
        stroke-dashoffset: 24;
    }
}

.rating label:hover svg {
    stroke: var(--fill);
}

.rating input:checked ~ label svg {
    transition: 0s;
    animation: idle 4s linear infinite, yippee 0.75s backwards;
    fill: var(--fill);
    stroke: var(--fill);
    stroke-opacity: 0;
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
}

@keyframes yippee {
    0% {
        transform: scale(1);
        fill: var(--fill);
        fill-opacity: 0;
        stroke-opacity: 1;
        stroke: var(--stroke);
        stroke-dasharray: 10;
        stroke-width: 1px;
        stroke-linejoin: bevel;
    }

    30% {
        transform: scale(0);
        fill: var(--fill);
        fill-opacity: 0;
        stroke-opacity: 1;
        stroke: var(--stroke);
        stroke-dasharray: 10;
        stroke-width: 1px;
        stroke-linejoin: bevel;
    }

    30.1% {
        stroke: var(--fill);
        stroke-dasharray: 0;
        stroke-linejoin: miter;
        stroke-width: 8px;
    }

    60% {
        transform: scale(1.2);
        fill: var(--fill);
    }
}

</style>