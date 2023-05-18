<template>
  <b-col>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom col-md-7 col-lg-8"
    >
      <h1 class="h2">회원 탈퇴</h1>
      <div class="btn-toolbar mb-2 mb-md-0 ">
        <div class="btn-group me-2">
          <button id="btn-delete-member" type="button" class="btn btn-sm btn-danger" @click="withdrawal">탈퇴하기</button>
        </div>
      </div>
    </div>
    <div>
      <div class="col-md-7 col-lg-8">
        <input type="hidden" name="action" value="modifyPw">
        정말로 삭제하시겠습니까?
        <div class="row g-3">
          <div class="col-12">
            <label for="pw" class="form-label">비밀번호를 입력하세요</label>
            <div class="input-group ">
              <input type="password" class="form-control" id="pw" name="pw"
                     required>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
import axios from "axios";

export default {
  name: "WithdrawalUser",
  data(){
    return{
      password:"",
    }
  },
  methods:{
    withdrawal(){
      const API_URL = `http://localhost:8080/withdrawal`;
      axios({
        url: API_URL,
        method: "post",
        data: {
          password: this.password,
        },
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Headers": 'Authorization',
          Authorization: sessionStorage.getItem("access-token"),
        }

      }).then((res) => {
        // res.data;
        console.log("[정보수정페이지] 유저 정보 응답={}", res);
        if (res.data === 1) {
          alert("비밀번호 변경이 완료되었습니다. 다시 로그인 하세요.")
          this.userLogout(this.$store.state.memberStore.loginUser.loginId);
          sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
          sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
          if (this.$route.path != "/") this.$router.push({name: "login"});
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.disabled = true;
      setTimeout(() => {
  this.disabled = false
}, 1500)
    },
  },
  created() {
    this.$store.state.myPageState = "withdrawal";
  }
}
</script>

<style scoped>

</style>