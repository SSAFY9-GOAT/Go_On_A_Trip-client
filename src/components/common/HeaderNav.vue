<template>
    <div class="container-fluid">
        <div class="row">
            <router-link to="/" id="index-link" class="col">
                <img src="@/assets/img/logo/logo_1x1.png" alt="" width="100"/>
                <span class="index-text">여행을 떠나요</span>
            </router-link>

            <ul class="nav nav-pills col">
                <li class="nav-item cta">
                  <span class="hover-underline-animation">
                    <router-link :to="{name: 'attraction'}" class="button nav-link px-3 link-dark">관광지조회</router-link>
                    </span>
                </li>
                <li class="nav-item cta">
                  <span class="hover-underline-animation">
                    <router-link :to="{name: 'articles'}" class="button nav-link px-3 link-dark">자유게시판</router-link>
                    </span>
                </li>
                <li class="nav-item cta">
                  <span class="hover-underline-animation">
                    <router-link :to="{name: 'hotplaces'}" class="button nav-link px-3 link-dark">핫플레이스</router-link>
                    </span>
                </li>
                <li class="nav-item cta">
                  <span class="hover-underline-animation">
                    <router-link :to="{name: 'tripplan'}" class="button nav-link px-3 link-dark">여행계획</router-link>
                    </span>
                </li>
                <li class="nav-item cta">

                  <router-link :to="{name: 'notice'}" class="button nav-link px-3 link-dark"><span class="hover-underline-animation">공지사항</span></router-link>
                </li>
                <template v-if="this.$store.state.memberStore.isLogin">
                    <li class="nav-item cta">
                      <span class="hover-underline-animation">
                        <router-link to="/mypage" class="button nav-link link-dark px-3">마이페이지</router-link>
                        </span>
                    </li>
                    <li class="nav-item cta">
                      <span class="hover-underline-animation">
                        <!--                        <router-link to="/logout" class="nav-link link-dark px-3">로그아웃</router-link>-->
                        <button class="button nav-link link-dark px-3" @click="onClickLogout">로그아웃</button>
                        </span>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item cta col">
                      <span class="hover-underline-animation">
                        <router-link to="/login" class="button nav-link link-dark px-3">로그인</router-link>
                        </span>
                    </li>
                    <li class="nav-item cta col">
                      <span class="hover-underline-animation">
                        <router-link to="/regist" class="button nav-link link-dark px-3">회원가입</router-link>
                      </span>
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
            await this.$store.dispatch("memberStore/userLogout", this.loginUser.loginId);
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

.button {
  font-size: 18px;
  color: #92af67;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;
}

.button:focus,
.button:hover {
  color: #92af67;
}

.button:focus:after,
.button:hover:after {
  width: 100%;
  left: 0%;
}

.button:after {
  content: "";
  pointer-events: none;
  bottom: -2px;
  left: 50%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #92af67;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: width, left;
}

</style>