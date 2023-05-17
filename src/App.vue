<template>
    <div id="app">
        <nav>
            <header-nav :user="user"></header-nav>
        </nav>
        <router-view  @join="join"/>
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
        join(info){
            const API_URL = `http://localhost:8080/regist`;
            axios({
                url: API_URL,
                method: "post",
                data:
                info,

            }).then((res) => {
                // res.data;
                console.log(res.data);
                if (res.data) {
                    //회원가입 완료
                    console.log("회원가입 성공");
                    this.$router.push('/');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
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
