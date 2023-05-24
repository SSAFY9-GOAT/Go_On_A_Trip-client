<template>
  <b-col>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom col-md-7 col-lg-8"
    >
      <h1 class="h2">마이페이지</h1>
      <div class="btn-toolbar mb-2 mb-md-0 ">
        <div class="btn-group me-2">
        </div>
      </div>
    </div>

    <div>
      <div class="col-md-7 col-lg-8">
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-12">
              <label for="userId" class="form-label">아이디</label>
              <div class="input-group ">
                <template v-if="this.$store.state.memberStore.loginUser.snsUser">
                  <input type="text" class="form-control"
                         id="userId" name="userId"
                         placeholder="네이버 로그인 이용자"
                         disabled>
                </template>
                <template v-else>
                  <input type="text" class="form-control" id="userId" name="userId" placeholder="아이디"
                         v-model="userInfo.loginId" disabled></template>
              </div>
            </div>
            <div class="col-sm-6">
              <label for="userName" class="form-label">이름</label>
              <input type="text" class="form-control" id="userName" name="userName" placeholder=""
                     v-model="userInfo.name"
                     disabled>
            </div>

            <div class="col-sm-6">
              <label for="userNickname" class="form-label">별명</label>
              <input type="text" class="form-control" id="userNickname" name="userNickname" placeholder=""
                     v-model="userInfo.nickname" disabled>
            </div>
            <div class="col-sm-6">
              <label for="userEmail" class="form-label">이메일</label>
              <input type="text" class="form-control" id="userEmail" name="userEmail" placeholder="아이디"
                     v-model="userInfo.email" disabled>
            </div>

            <div class="col-sm-6">
              <label for="userTel" class="form-label">전화번호</label>
              <input type="text" class="form-control" id="userTel" name="userTel" placeholder=""
                     v-model="userInfo.phone"
                     disabled>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-sm-6">
              <label for="userBirth" class="form-label">생년월일</label>
              <input type="text" class="form-control" id="userBirth" name="userBirth" placeholder=""
                     v-model=" userInfo.birth  " disabled>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
            <div class="col-sm-6">
              <label for="userGender" class="form-label">성별</label>
              <input type="text" class="form-control" id="userGender" name="userGender" placeholder=""
                     v-model="userInfo.gender" disabled>
            </div>
          </div>
        </form>
      </div>
    </div>
  </b-col>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: null,
    }
  },
  methods: {
    getUserInfo() {
      // user 정보 요청 api 주소
      const API_URL = `http://localhost:8080/mypage`;
      // axios 요청 (Spring Boot Rest API 참고)
      axios({
        url: API_URL,
        method: "get",
        params: {
          loginId: this.$store.state.memberStore.loginUser.loginId,
        },
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Headers": 'Authorization',
          Authorization: sessionStorage.getItem("access-token"),
        }

      }).then((res) => {
        // res.data;
        console.log("[마이페이지] 유저 정보 응답={}", res);
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
    console.log("[마이페이지] 로그인 한 유저={}", this.$store.state.memberStore.loginUser)
    this.getUserInfo();
  }
}
</script>

<style scoped>

</style>