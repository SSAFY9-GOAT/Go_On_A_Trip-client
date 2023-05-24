<template>
    <div>
        <p>NaverCallback</p>
    </div>
</template>

<script>
// import axios from "axios";

import axios from "axios";
import jwtDecode from "jwt-decode";
import {mapState} from "vuex";

const memberStore = "memberStore";

export default {
    name: "NaverCallback",
    computed: {
        ...mapState(memberStore, ["isLogin", "isLoginError", "loginUser"]),
    },
    mounted() {
        let code = this.$route.query.code;
        let state = this.$route.query.state;
        console.log("this.$route = ", this.$route);
        console.log("state = ", state);
        const url = "http://localhost:8080/naverLogin?code=" + code + "&state=" + state;
        axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/",
                "Access-Control-Allow-Headers": 'Authorization',
                // Authorization: sessionStorage.getItem("access-token"),
            },
            params: {
                // code: code,
                // state: state
            }
        })
            .then(response => {
                console.log(response);
                const data = response.data;
                if (data.result === null) {
                    let accessToken = data.token.access;
                    let refreshToken = data.token.refresh;
                    console.log("[네아로] 토큰들 >> ", accessToken, refreshToken);
                    // this.$store.commit()
                    this.$store.commit("memberStore/SET_IS_LOGIN", true);
                    this.$store.commit("memberStore/SET_IS_LOGIN_ERROR", false);
                    this.$store.commit("memberStore/SET_IS_VALID_TOKEN", true);
                    // this.$store.commit("SET_IS_LOGIN", true);
                    // this.$store.commit("SET_IS_LOGIN_ERROR", false);
                    // this.$store.commit("SET_IS_VALID_TOKEN", true);
                    sessionStorage.setItem("access-token", accessToken);
                    sessionStorage.setItem("refresh-token", refreshToken);

                    let token = sessionStorage.getItem("access-token");
                    console.log("1. confirm() token >> " + token);
                    let decodeToken = jwtDecode(token);
                    console.log("2. getUserInfo() decodeToken :: ", decodeToken);
                    if (this.isLogin) {
                        this.userInfo = decodeToken.loginUser;
                        this.$store.state.memberStore.loginUser = this.userInfo;
                        console.log("4. confirm() userInfo :: ", this.userInfo);
                        this.$router.push({name: "index"});
                    }
                } else {
                    this.$store.commit("memberStore/SET_IS_LOGIN", false);
                    this.$store.commit("memberStore/SET_IS_LOGIN_ERROR", true);
                    this.$store.commit("memberStore/SET_IS_VALID_TOKEN", false);
                }
                // this.article = response.data.data;
                // this.article.createdDate = this.article.createdDate.replace('T', ' ');
            })
            .catch(error => {
                alert(error.response.data.message);
                this.$router.push({name: "login"});
                console.log(error.response.data.message);
            })


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