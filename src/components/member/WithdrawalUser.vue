<template>
  <b-col>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom col-md-7 col-lg-8"
    >
      <h1 class="h2">회원 탈퇴</h1>
      <div class="btn-toolbar mb-2 mb-md-0 ">
        <div class="btn-group me-2" :class="{ shake: disabled }">
          <button id="btn-delete-member" type="button" class="btn btn-sm btn-danger" @click="withdrawal">탈퇴하기</button>
          <template v-if="disabled">비밀번호를 확인하세요</template>
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
              <input type="password" class="form-control" id="pw" name="pw" v-model="password"
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
      disabled:false,
    }
  },
  methods:{
    withdrawal(){
      const API_URL = `http://localhost:8080/withdrawal`;
      console.log("[Vue]회원탈퇴")
      axios({
        url: API_URL,
        method: "post",
        data: {
          loginId:this.$store.state.memberStore.loginUser.loginId,
          loginPw: this.password,
        },
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Headers": 'Authorization',
          Authorization: sessionStorage.getItem("access-token"),
        }

      }).then((res) => {
        // res.data;
        console.log("[회원탈퇴] 응답={}", res);
        if (res.data === 1) {
          alert("탈퇴가 완료되었습니다.")
          // this.userLogout(this.$store.state.memberStore.loginUser.loginId);
          sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
          sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
          if (this.$route.path != "/") this.$router.push({name: "index"});
        }else{
          this.disabled = true;
          setTimeout(() => {
            this.disabled = false
          }, 1500)
        }
      }).catch((err) => {
        console.log(err);

      });
    },
  },
  created() {
    this.$store.state.myPageState = "withdrawal";
  }
}
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>