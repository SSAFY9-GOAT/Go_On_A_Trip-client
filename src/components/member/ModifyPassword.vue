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
                          <div class="small checkbox-wrapper-11" >
                            <input value="2" name="r" type="checkbox" id="02-11" v-model="validPwLength" disabled>
                            <label for="02-11" :class="{'text-danger': !validPwLength}">8자 ~ 20자</label>
                          </div>
                          <div class="small checkbox-wrapper-11" >
                            <input value="2" name="r" type="checkbox" id="02-11" v-model="validPwIncludeEng" disabled>
                            <label for="02-11" :class="{'text-danger': !validPwIncludeEng}">영어 포함</label>
                          </div>
                          <div class="small checkbox-wrapper-11" >
                            <input value="2" name="r" type="checkbox" id="02-11" v-model="validPwIncludeNum" disabled>
                            <label for="02-11" :class="{'text-danger': !validPwIncludeNum}">숫자 포함</label>
                          </div>
                          <div class="small checkbox-wrapper-11" >
                            <input value="2" name="r" type="checkbox" id="02-11" v-model="validPwIncludeSc" disabled>
                            <label for="02-11" :class="{'text-danger': !validPwIncludeSc}">특수문자(!, @, #, $, %) 포함</label>
                          </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="passwordCheck" class="form-label">비밀번호 확인</label>
                            <input type="password" class="form-control" id="passwordCheck" name="passwordCheck"
                                   placeholder="비밀번호 확인"
                                   v-model="passwordCheck" @keyup="samePassword">
                          <div class="small checkbox-wrapper-11" v-if="passwordCheck.length > 0">
                            <input value="2" name="r" type="checkbox" id="02-11" v-model="samePw" disabled>
                            <label for="02-11" :class="{'text-danger': !samePw}">비밀번호가 일치하지 않습니다.</label>
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
            this.validPwIncludeSc = false;

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





.checkbox-wrapper-11 {
  --text: #414856;
  --check: #4f29f0;
  --disabled: #C3C8DE;
  --border-radius: 10px;
  border-radius: var(--border-radius);
  position: relative;
  padding: 5px;
  display: grid;
  grid-template-columns: 30px auto;
  align-items: center;
}

.checkbox-wrapper-11 label {
  color: var(--text);
  position: relative;
  cursor: pointer;
  display: grid;
  align-items: center;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  transition: color 0.3s ease;
}

.checkbox-wrapper-11 label::before,
.checkbox-wrapper-11 label::after {
  content: "";
  position: absolute;
}

.checkbox-wrapper-11 label::before {
  height: 2px;
  width: 8px;
  left: -27px;
  background: var(--check);
  border-radius: 2px;
  transition: background 0.3s ease;
}

.checkbox-wrapper-11 label:after {
  height: 4px;
  width: 4px;
  top: 8px;
  left: -25px;
  border-radius: 50%;
}

.checkbox-wrapper-11 input[type=checkbox] {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  height: 15px;
  width: 15px;
  outline: none;
  border: 0;
  margin: 0 15px 0 0;
  cursor: pointer;
  background: var(--background);
  display: grid;
  align-items: center;
}

.checkbox-wrapper-11 input[type=checkbox]::before, .checkbox-wrapper-11 input[type=checkbox]::after {
  content: "";
  position: absolute;
  height: 2px;
  top: auto;
  background: var(--check);
  border-radius: 2px;
}

.checkbox-wrapper-11 input[type=checkbox]::before {
  width: 0px;
  right: 60%;
  transform-origin: right bottom;
}

.checkbox-wrapper-11 input[type=checkbox]::after {
  width: 0px;
  left: 40%;
  transform-origin: left bottom;
}

.checkbox-wrapper-11 input[type=checkbox]:checked::before {
  -webkit-animation: check-01-11 0.4s ease forwards;
  animation: check-01-11 0.4s ease forwards;
}

.checkbox-wrapper-11 input[type=checkbox]:checked::after {
  -webkit-animation: check-02-11 0.4s ease forwards;
  animation: check-02-11 0.4s ease forwards;
}

.checkbox-wrapper-11 input[type=checkbox]:checked + label {
  color: var(--disabled);
  -webkit-animation: move-11 0.3s ease 0.1s forwards;
  animation: move-11 0.3s ease 0.1s forwards;
}

.checkbox-wrapper-11 input[type=checkbox]:checked + label::before {
  background: var(--disabled);
  -webkit-animation: slice-11 0.4s ease forwards;
  animation: slice-11 0.4s ease forwards;
}

.checkbox-wrapper-11 input[type=checkbox]:checked + label::after {
  -webkit-animation: firework-11 0.5s ease forwards 0.1s;
  animation: firework-11 0.5s ease forwards 0.1s;
}

@-webkit-keyframes move-11 {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }

  100% {
    padding-right: 4px;
  }
}

@keyframes move-11 {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }

  100% {
    padding-right: 4px;
  }
}

@-webkit-keyframes slice-11 {
  60% {
    width: 100%;
    left: 4px;
  }

  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}

@keyframes slice-11 {
  60% {
    width: 100%;
    left: 4px;
  }

  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}

@-webkit-keyframes check-01-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }

  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}

@keyframes check-01-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }

  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}

@-webkit-keyframes check-02-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }

  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}

@keyframes check-02-11 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }

  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}

@-webkit-keyframes firework-11 {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
  }
}

@keyframes firework-11 {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
  }
}
</style>