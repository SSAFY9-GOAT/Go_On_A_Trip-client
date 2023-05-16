<template>
    <div>
        <b-container fluid>
            <b-row class="ms-auto me-auto">
                <mypage-nav></mypage-nav>
                <router-view></router-view>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import MypageNav from "@/components/member/MypageNav.vue";
import axios from "axios";

export default {
    name: "AppMypage",
    props: {
        user: null,
    },
    components: {MypageNav},
    methods: {
        getUserInfo() {
            // user 정보 요청 api 주소
            const API_URL = `http://localhost:8080/mypage`;
            // axios 요청 (Spring Boot Rest API 참고)
            axios({
                url: API_URL,
                method: "get",
                params: {
                    loginId: this.$store.state.loginUser.id,
                }

            }).then((res) => {
                // res.data;
                console.log(res.data);
                if (res.data) {
                    this.userInfo = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    created() {
        this.$store.state.myPageState = "my-info";
        // console.log("[마이페이지] 로그인 한 유저={}", this.$store.state.loginUser)
        // this.getUserInfo();
    }
}


</script>

<style scoped>

</style>