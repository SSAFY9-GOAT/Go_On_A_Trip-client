<template>
  <div id="app">
    <nav>
        <header-nav :user="user"></header-nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view @login="login"/>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import axios from "axios";

export default {
    name: "App",
    components: {
        HeaderNav,
    },
    data() {
        return {
            user: null,
        };
    },
    methods: {
        logout() {
            this.user = null;
        },
        login(user) {
            // user 정보 요청 api 주소
            const API_URL = `http://localhost:8080/login`;
            console.log(user);
            // axios 요청 (Spring Boot Rest API 참고)
            axios({
                url: API_URL,
                method: "post",
                data:{
                    user
                }
            })
                .then((res) => {
                    // res.data;
                    console.log(res.data());
                    if(res.data){
                      const loginUser = res.data;
                      localStorage.setItem("login-user",loginUser);
                      this.$router.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style>
#app {
  font-family: 'GmarketSansMedium', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
