<template>
    <b-col>
        <div class=" d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom
      col-md-7 col-lg-8">
            <h1 class="h2">비밀번호 변경</h1>
            <div class="btn-toolbar mb-2 mb-md-0 ">
                <div class="btn-group me-2" :class="{ shake: disabled }">
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="modifyPassword">변경하기</button>
                    <template v-if="disabled">비밀번호를 확인하세요</template>
                </div>
            </div>
        </div>

        <div>
            <div class="col-md-7 col-lg-8">
                <form class="needs-validation" novalidate>
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="oldPassword" class="form-label">기존 비밀번호 입력</label>
                            <div class="input-group ">
                                <input type="password" class="form-control" id="oldPassword" name="oldPassword"
                                       placeholder="기존 비밀번호"
                                       v-model="oldPassword">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="newPassword" class="form-label">새로운 비밀번호</label>
                            <input type="password" class="form-control" id="newPassword" name="newPassword"
                                   placeholder="새로운 비밀번호"
                                   @keyup="validPwCheck"
                                   v-model="newPassword"
                            >
                            <div class="small text-sm-start "
                                 :class="{'text-danger': !validPwLength, 'text-success' : validPwLength }">
                                <b-icon icon="check" aria-hidden="false"></b-icon>
                                8자 ~ 20자
                            </div>
                            <div class="small text-sm-start "
                                 :class="{'text-danger': !validPwIncludeEng, 'text-success' : validPwIncludeEng }">
                                <b-icon icon="check" aria-hidden="false"></b-icon>
                                영어 포함
                            </div>
                            <div class="small text-sm-start "
                                 :class="{'text-danger': !validPwIncludeNum, 'text-success' : validPwIncludeNum }">
                                <b-icon icon="check" aria-hidden="false"></b-icon>
                                숫자 포함
                            </div>
                            <div class="small text-sm-start "
                                 :class="{'text-danger': !validPwIncludeSc, 'text-success' : validPwIncludeSc }">
                                <b-icon icon="check" aria-hidden="false"></b-icon>
                                특수문자(!, @, #, $, %) 포함
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="passwordCheck" class="form-label">비밀번호 확인</label>
                            <input type="password" class="form-control" id="passwordCheck" name="passwordCheck"
                                   placeholder="비밀번호 확인"
                                   v-model="passwordCheck" @keyup="samePassword">
                            <div class="small text-sm-start text-danger" v-if="!samePw">
                                <b-icon icon="check" aria-hidden="false"></b-icon>
                                비밀번호가 일치하지 않습니다.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </b-col>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";

const memberStore = "memberStore";

export default {
    name: "ModifyPassword",
    data() {
        return {
            samePw: true,
            disabled: false,
            validPwLength: false,
            validPwIncludeNum: false,
            validPwIncludeEng: false,
            validPwIncludeSc: false,
            oldPassword: "",
            newPassword: "",
            passwordCheck: "",
        }
    },
    methods: {
        ...mapActions(memberStore, ["userLogout"]),
        modifyPassword() {
            if (this.validPwLength && this.validPwIncludeNum && this.validPwIncludeEng && this.validPwIncludeSc && this.samePw) {
                this.disabled = false;

                const API_URL = `http://localhost:8080/modipyPw`;
                axios({
                    url: API_URL,
                    method: "post",
                    data: {
                        id: this.$store.state.memberStore.loginUser.id,
                        originalPw: this.oldPassword,
                        newPw: this.newPassword,
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
            }
        },
        samePassword() {
            if (this.newPassword === this.passwordCheck) {
                this.samePw = true;
            } else {
                this.samePw = false;
            }
        },
        validPwCheck() {
            this.validPwLength = this.newPassword.length >= 8 && this.newPassword.length <= 20;

            var pattern1 = /[0-9]/; //숫자
            var pattern2 = /[a-zA-Z]/; //영어
            var pattern3 = ["!", "@", "#", "$", "%"];

            this.validPwIncludeNum = pattern1.test(this.newPassword);
            this.validPwIncludeEng = pattern2.test(this.newPassword)

            for (var i = 0; i < pattern3.length; i++) {
                if (this.newPassword.indexOf(pattern3[i]) > -1) {
                    this.validPwIncludeSc = true;
                    break;
                }
            }

        },
    },
    created() {
        this.$store.state.myPageState = "modifyPw";
        this.getUserInfo();
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