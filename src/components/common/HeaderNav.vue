<template>
    <div class="container-fluid">
        <div class="row">
            <router-link to="/" id="index-link" class="col">
                <img src="@/assets/img/logo/logo_1x1.png" alt="" width="100"/>
                <span class="index-text">여행을 떠나요</span>
            </router-link>

            <ul class="nav nav-pills col">
                <li class="nav-item">
                    <a href="${root}/attraction/search" class="nav-link px-3 link-dark">관광지조회</a>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'articles'}" class="nav-link px-3 link-dark">자유게시판</router-link>
                </li>
                <li class="nav-item">
                    <a href="${root}/hotPlace/list" class="nav-link px-3 link-dark">핫플레이스</a>
                </li>
                <li class="nav-item">
                    <a href="${root}/tripPlan/list" class="nav-link px-3 link-dark">여행계획</a>
                </li>
                <li class="nav-item">
                    <a href="${root}/notion/list" class="nav-link px-3 link-dark">공지사항</a>
                </li>
                <template v-if="getUser">
                    <li class="nav-item">
                        <router-link to="/mypage" class="nav-link link-dark px-3">마이페이지</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/logout" class="nav-link link-dark px-3">로그아웃</router-link>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item col">
                        <router-link to="/login" class="nav-link link-dark px-3">로그인</router-link>
                    </li>
                    <li class="nav-item col">
                        <router-link to="/regist" class="nav-link link-dark px-3">회원가입</router-link>
                    </li>
                </template>
            </ul>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    name: "HeaderNav",
    props: {
        user: null,
    },
    methods: {
        logout() {
            this.$emit("logout");
        },
    },
    computed: {
        getUser() {
            if (this.user) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {

    }
};
</script>

<style scoped>
.container-fluid {
    width: 100%;
}

#index-link {
    color: black;
    font-size: larger;
}

.index-text {
    padding-left: 10px;
    font-size: larger;
}


</style>