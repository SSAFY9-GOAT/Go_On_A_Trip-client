<template>
  <div>
      <b-container fluid>
          <b-row>
              <mypage-nav></mypage-nav>
              마이페이지
              <router-view></router-view>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import MypageNav from "@/components/member/mypageNav.vue";
import axios from "axios";

export default {
    name: "AppMypage",
    data() {
        return {
            userInfo: null,
        };
    },
    components: {MypageNav},
    methods:{
        getUserInfo(){
            // user 정보 요청 api 주소
            const API_URL = `http://localhost:8080/mypage`;
            // axios 요청 (Spring Boot Rest API 참고)
            axios({
                url: API_URL,
                method: "get",
                data:
                this.$store.state.loginUser.id,

            }).then((res) => {
                // res.data;
                console.log(res.data);
                if (res.data) {
                    this.userInfo = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    created() {
        this.$store.state.myPageState = "my-info";
    }
}


</script>

<style scoped>

</style>