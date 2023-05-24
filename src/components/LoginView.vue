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
                    <div v-if="disabled" class="text-danger " :class="{ shake: disabled }" v-text="loginMessage"></div>
<!--                    <div class="checkbox mb-3">-->
<!--                        <label> <input type="checkbox" value="remember-me"/> Remember me </label>-->
<!--                    </div>-->
                    <button id="btn-login" class="w-100 mb-2 mt-3 btn btn-lg btn-primary p-3" type="button"
                            @click="confirm">로그인
                    </button>
                    <a :href=naverLoginURL>
                        <div id="naver_id_login" class="mb-3"></div>
                    </a>
<!--                    <div @click="naverLogin">-->
<!--                        <div id="naver_id_login" class="mb-3"></div>-->
<!--                    </div>-->
<!--                    <a :href=naverLoginURL><img :src="require(`@/assets/img/NaverLoginBtn.png`)" class="w-100 mb-3"></a>-->
                    <!--                    <img :src="require(`@/assets/img/NaverLoginBtn.png`)" @click="naverLogin" class="w-100 mb-3">-->
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
        <FindPassword @close="closeFindPwModal" v-if="findPwModal">
            <!-- default 슬롯 콘텐츠 -->
            <p>비밀번호 찾기</p>
            <hr>
            <div class="mb-3">
                <label for="findPwId">아이디</label><br>
                <input id="findPwId" v-model="findPwId" class="form-control" placeholder="아이디">
            </div>
            <div>
                <label for="findPwPhone">가입 시 입력한 전화번호를 입력하세요</label><br>
                <input id="findPwPhone" v-model="findPwPhone" @keyup="getPhoneMask(findPwPhone)" class="form-control"
                       placeholder="전화번호"
                       maxlength="13"></div>
            <!-- /default -->
            <!-- footer 슬롯 콘텐츠 -->
            <template slot="footer">
                <button class="btn btn-warning" @click="doFindPwSend">제출</button>
            </template>
            <!-- /footer -->
        </FindPassword>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import jwtDecode from "jwt-decode";

import FindPassword from "@/components/member/FindPassword.vue";
import axios from "axios";

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
            findPwModal: false,
            findPwId: '',
            findPwPhone: "",
            naverLoginURL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=TjbFSfFWxEGU5lsUKvzz&state=STATE_STRING&redirect_uri=http://localhost:3000/naverLogin',
            loginMessage:" ",
            disabled:false,

        };
    },
    computed: {
        ...mapState(memberStore, ["isLogin", "isLoginError", "loginUser"]),
    },
    mounted() {
        const naver_id_login = new window.naver_id_login("TjbFSfFWxEGU5lsUKvzz", "http://localhost:8080/naverLogin");
        // const naver_id_login = new window.naver_id_login(process.env.NAVER_CLIENT_ID, process.env.NAVER_CALLBACK_URL);
        // const state = naver_id_login.getUniqState();
        naver_id_login.setButton("green", 3, 65); // 버튼 설정
        // naver_id_login.setState(state);
        // naver_id_login.setPopup(); // popup 설정을 위한 코드
        naver_id_login.init_naver_id_login();
    },
    methods: {
        ...mapActions(memberStore, ["userConfirm"]),
        async confirm() {
            // await this.userConfirm(this.user);
            await this.$store.dispatch('memberStore/userConfirm', this.user).then((result) => {
                if(result !==1){
                    this.disabled = true;
                    this.loginMessage="아이디 혹은 비밀번호를 확인하세요"
                    setTimeout(() => {
                        this.disabled = false
                        this.loginMessage=" "
                    }, 1500)
                }
            });
            // dispatch('userConfirm', this.user);
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
        naverLogin() {
            const url = this.naverLoginURL;

            // const url = `http://localhost:8080/articles/${articleId}`;
            axios.get(url, {
                headers: {
                    "Access-Control-Allow-Origin":"http://localhost:3000/",
                    "Access-Control-Allow-Headers":'Authorization',
                    // Authorization: sessionStorage.getItem("access-token"),
                }
            })
                .then(response => {
                    console.log(response);
                    const data = response.data;
                    if (data.result === null) {
                        let accessToken = data.token.access;
                        let refreshToken = data.token.refresh;
                        console.log("login success token created!!!! >> ", accessToken, refreshToken);
                        // this.$store.commit()
                        this.$store.commit("SET_IS_LOGIN", true);
                        this.$store.commit("SET_IS_LOGIN_ERROR", false);
                        this.$store.commit("SET_IS_VALID_TOKEN", true);
                        sessionStorage.setItem("access-token", accessToken);
                        sessionStorage.setItem("refresh-token", refreshToken);
                    } else {
                        this.$store.commit("SET_IS_LOGIN", false);
                        this.$store.commit("SET_IS_LOGIN_ERROR", true);
                        this.$store.commit("SET_IS_VALID_TOKEN", false);
                    }
                    // this.article = response.data.data;
                    // this.article.createdDate = this.article.createdDate.replace('T', ' ');
                })
                .catch(error => {
                    // alert(error.response.data.message);
                    this.$router.push({name: "login"});
                    console.log(error.response.data.message);
                })
        },
        movePage() {
            this.$router.push({name: "join"});
        },
        openFindPwModal() {
            this.findPwModal = true;
        },
        closeFindPwModal() {
            this.findPwModal = false;
        },
        doFindPwSend() {
            if (this.findPwId.length > 0 && this.findPwPhone.length > 0) {
                const API_URL = `http://localhost:8080/findPw`;
                axios({
                    url: API_URL,
                    method: "post",
                    data: {
                        loginId: this.findPwId,
                        phone: this.findPwPhone,
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000/",
                        "Access-Control-Allow-Headers": 'Authorization',
                        Authorization: sessionStorage.getItem("access-token"),
                    }
                }).then((res) => {
                    // res.data;
                    console.log("[비밀번호 찾기] 유저 정보 응답={}", res);
                    if (res.data.message === "success") {
                        alert("입력한 전화번호로 임시 비밀번호가 발급되었습니다. 로그인 후 비밀번호를 바꾸세요.")
                        this.closeFindPwModal()
                    } else {
                        alert("입력한 정보와 일치하는 이용자가 없습니다. 입력을 확인하세요.")
                        this.closeFindPwModal()
                    }
                }).catch((err) => {
                    console.log(err);
                });
                this.closeFindPwModal()
            } else {
                alert('메시지를 입력해주세요.')
            }
        },
        getPhoneMask(val) {
            this.findPwPhone = this.getMask(val)
        },
        getMask(phoneNumber) {
            if (!phoneNumber) return phoneNumber
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

            let res = ''
            if (phoneNumber.length < 3) {
                res = phoneNumber
            } else {
                if (phoneNumber.substr(0, 2) == '02') {

                    if (phoneNumber.length <= 5) {//02-123-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
                    } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
                    } else if (phoneNumber.length > 9) {//02-1234-5678
                        res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
                    }

                } else {
                    if (phoneNumber.length < 8) {
                        res = phoneNumber
                    } else if (phoneNumber.length == 8) {
                        res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
                    } else if (phoneNumber.length == 9) {
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                    } else if (phoneNumber.length == 10) {
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                    } else if (phoneNumber.length > 10) { //010-1234-5678
                        res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
                    }
                }
            }
            return res
        }
    },
}
</script>

<style scoped>
#naver_id_login {
    pointer-events: none;
}

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