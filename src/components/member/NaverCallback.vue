<template>
<div>
<p>NaverCallback</p>
</div>
</template>

<script>
export default {
  name: "NaverCallback",
  mounted() {
    const naver_id_login =  new window.naver_id_login("TjbFSfFWxEGU5lsUKvzz", "http://localhost:3000/naverLogin");
    // console.log("[네이버 로그인] access token = ", naver_id_login.getAccessToken());
    let error = this.$route.params.error;
    if(typeof error !== 'undefined') {
      console.log("[네이버 로그인] error 발생 = ",error);
      this.$router.push({name: "login"});
    }else{
      console.log(naver_id_login.getProfileData('email'));

      // let hashValue = this.$route.hash.state;console.log(naver_id_login.getProfileData('nickname'));
      console.log(naver_id_login.getProfileData('email'));
      console.log(naver_id_login.getProfileData('gender'));
      console.log(naver_id_login.getProfileData('id'));
      console.log(naver_id_login.getProfileData('name'));
      console.log(naver_id_login.getProfileData('birthday'));
      console.log(naver_id_login.getProfileData('birthyear'));
      console.log(naver_id_login.getProfileData('mobile'));
      // naver_id_login.get_naver_userprofile("naverSignInCallback()");
      // const accessToken = this.getAccessTokenFromHash(hashValue);
      //#access_token=AAAAOazKwQ0aQfbggB8jBPOS5xBhSvK9VEWxl5W-ZuLwfoDvud-DPmHOEm9lvvZd_maSTQflgyqeb25q1cCFc0lhzZQ
      // state=4de7b92f-632d-444b-89e9-a04b9c3ca1e6
      // token_type=bearer
      // expires_in=3600
    }

  },
  methods: {
    getAccessTokenFromHash(hashValue) {
      const params = new URLSearchParams(hashValue.slice(1));
      return params.get('access_token');
    },
  },
}
</script>

<style scoped>

</style>