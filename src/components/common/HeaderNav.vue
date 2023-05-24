<template>
    <div class="container-fluid">
        <div class="row">
            <router-link to="/" id="index-link" class="col">
                <img src="@/assets/img/logo/logo_1x1.png" alt="" width="100"/>
                <span class="index-text">여행을 떠나요</span>
            </router-link>

            <ul class="nav nav-pills col">
                <li class="nav-item">
                    <router-link :to="{name: 'attraction'}" class="nav-link px-3 link-dark">관광지조회</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'articles'}" class="nav-link px-3 link-dark">자유게시판</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'hotplaces'}" class="nav-link px-3 link-dark">핫플레이스</router-link>
                </li>
                <li class="nav-item">
                    <!--                    <a href="${root}/tripPlan/list" class="nav-link px-3 link-dark">여행계획</a>-->
                    <router-link :to="{name: 'tripplan'}" class="nav-link px-3 link-dark">여행계획</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'notice'}" class="nav-link px-3 link-dark">공지사항</router-link>
                </li>
                <template v-if="this.$store.state.memberStore.isLogin">
                    <li class="nav-item">
                        <router-link to="/mypage" class="nav-link link-dark px-3">마이페이지</router-link>
                    </li>
                    <li class="nav-item">
                        <!--                        <router-link to="/logout" class="nav-link link-dark px-3">로그아웃</router-link>-->
                        <span class="nav-link link-dark px-3" @click="onClickLogout">로그아웃</span>
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
import {mapState, mapGetters, mapActions} from "vuex";
// import memberStore from "@/store/modules/memberStore";

const memberStore = "memberStore";

export default {
    name: "HeaderNav",
    // props: {
    //     user: null,
    // },
    // methods: {
    //     logout() {
    //         this.$emit("logout");
    //     },
    // },
    computed: {
        ...mapState(memberStore, ["isLogin", "loginUser"]),
        ...mapGetters(["checkUserInfo"]),
        // ...mapState(memberStore, ["isLogin", "isLoginError", "loginUer"]),
        // getUser() {
        //     console.log(this.isLogin)
        //     if (this.isLogin) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
    },
    methods: {
        ...mapActions(memberStore, ["userLogout"]),
        async onClickLogout() {
            // this.SET_IS_LOGIN(false);
            // this.SET_USER_INFO(null);
            // sessionStorage.removeItem("access-token");
            // if (this.$route.path != "/") this.$router.push({ name: "main" });
            console.log(this.loginUser.loginId);
            //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
            //+ satate에 isLogin, userInfo 정보 변경)
            // this.$store.dispatch("userLogout", this.userInfo.userid);
            await this.$store.dispatch("memberStore/userLogout",this.loginUser.loginId);
            // await this.userLogout(this.loginUser.loginId);
            sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
            sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
            if (this.$route.path != "/") this.$router.push({name: "index"});
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