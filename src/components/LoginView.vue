<template>
    <div>
        <div id="wrapper" class="text-center">
            <main class="form-signin w-100 m-auto">
                <div id="login-form">
                    <img class="mb-4" src="@/assets/img/logo/logo_1x1.png" alt="" width="280" height="280"/>
                    <h1 class="h3 mb-3 fw-normal">로그인</h1>

                    <div class="form-floating">
                        <input
                                type="text"
                                class="form-control"
                                id="userId"
                                name="userId"
                                placeholder="userId"
                                v-model="user.id"
                        />
                        <label for="userId">아이디</label>
                    </div>
                    <div class="form-floating mt-1">
                        <input
                                type="password"
                                class="form-control"
                                id="userPassword"
                                name="userPassword"
                                placeholder="userPassword"
                                v-model="user.password"
                        />
                        <label for="userPassword">비밀번호</label>
                    </div>

                    <div class="checkbox mb-3">
                        <label> <input type="checkbox" value="remember-me"/> Remember me </label>
                    </div>
                    <button id="btn-login" class="w-100 mb-3 btn btn-lg btn-primary" type="button"
                            @click="confirm">로그인
                    </button>
                    <!--                     <img src="@/assets/img/NaverLoginBtn.png" @click="naverLogin" class="w-100 mb-3"> -->
                    <button
                            type="button"
                            class="w-100 mb-3 btn btn-sm btn-outline-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#findIdModal"
                    >
                        아이디 찾기
                    </button>
                    <button to="/findPassword"
                            type="button"
                            class="w-100 mb-3 btn btn-sm btn-outline-warning"
                            @click="openFindPwModal"
                    >
                        비밀번호 찾기
                    </button>

                </div>
                <div class="pt-3">
                    <router-link to="/regist" class="register">
                        아직 계정이 없으신가요?<br/>계정 만들기
                    </router-link>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import jwtDecode from "jwt-decode";

import FindPassword from "@/components/member/FindPassword.vue";

const memberStore = "memberStore";
export default {
    components: {FindPassword},
    name: "LoginView",
    data() {
        return {
            user: {
                id: "",
                password: "",
            },
            findPwModal : false,

        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "isLoginError", "loginUser"]),
    },
    methods: {
        ...mapActions(memberStore, ["userConfirm"]),
        async confirm() {
            await this.userConfirm(this.user);
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
        },
        movePage() {
            this.$router.push({name: "join"});
        },
        openFindPwModal() {
        },
        closeFindPwModal() {
        },
        doFindPwSend() {
            if (this.message.length > 0) {
                alert(this.message)
                this.message = ''
                this.closeModal()
            } else {
                alert('메시지를 입력해주세요.')
            }
        },
    },
}
</script>

<style scoped>


#wrapper {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    /* background-color: #f5f5f5; */
}

.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
}

.bi {
    vertical-align: -.125em;
    fill: currentColor;
}

.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}


.register {
    text-decoration: none;
    color: darkgray;
}

.register:hover {
    color: black;
}
</style>