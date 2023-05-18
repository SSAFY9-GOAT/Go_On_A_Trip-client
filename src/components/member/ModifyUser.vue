<template>
    <b-col>
        <div class=" d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom
      col-md-7 col-lg-8">
            <h1 class="h2">정보 변경</h1>
            <div class="btn-toolbar mb-2 mb-md-0 ">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="modifyUserInfo">변경하기</button>
                </div>
            </div>
        </div>

        <div>
            <div class="col-md-7 col-lg-8">
                <form class="needs-validation" novalidate>
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="userId" class="form-label">아이디</label>
                            <div class="input-group ">
                                <input type="text" class="form-control" id="userId" name="userId" placeholder="아이디"
                                       v-model="userInfo.loginId" disabled>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="userName" class="form-label">이름</label>
                            <input type="text" class="form-control" id="userName" name="userName" placeholder=""
                                   v-model="userInfo.name"
                                   disabled>
                        </div>

                        <div class="col-sm-6">
                            <label for="userNickname" class="form-label">별명</label>
                            <input type="text" class="form-control" id="userNickname" name="userNickname" placeholder=""
                                   v-model="userInfo.nickname">
                        </div>
                        <div class="col-sm-6">
                            <label for="userEmail" class="form-label">이메일</label>
                            <input type="text" class="form-control" id="userEmail" name="userEmail" placeholder="아이디"
                                   v-model="userInfo.email">
                        </div>

                        <div class="col-sm-6">
                            <label for="userTel" class="form-label">전화번호</label>
                            <input type="text" class="form-control" id="userTel" name="userTel" placeholder=""
                                   v-model="userInfo.phone" maxlength="13" @keyup="getPhoneMask(userInfo.phone)"
                            >
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="userBirth" class="form-label">생년월일</label>
                            <input type="text" class="form-control" id="userBirth" name="userBirth" placeholder=""
                                   v-model=" userInfo.birth  " disabled>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="userGender" class="form-label">성별</label>
                            <input type="text" class="form-control" id="userGender" name="userGender" placeholder=""
                                   v-model="userInfo.gender" disabled>
                        </div>
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <label for="userBirth" class="form-label">비밀번호 확인</label>
                            <input type="password" class="form-control" id="userBirth" name="userBirth" placeholder=""
                                   v-model="passwordCheck">
                            <div class="invalid-feedback">
                                Valid last name is required.
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

export default {
    name: "ModifyUser",
    data() {
        return {
            userInfo: null,
            passwordCheck: ""
        }
    },
    methods: {
        getUserInfo() {
            // user 정보 요청 api 주소
            const API_URL = `http://localhost:8080/mypage`;
            // axios 요청 (Spring Boot Rest API 참고)
            axios({
                url: API_URL,
                method: "get",
                params: {
                    loginId: this.$store.state.memberStore.loginUser.loginId,
                },
                headers:{
                    "Access-Control-Allow-Origin":"http://localhost:3000/",
                    "Access-Control-Allow-Headers":'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }

            }).then((res) => {
                // res.data;
                console.log("[정보수정페이지] 유저 정보 응답={}", res);
                if (res.data) {
                    this.userInfo = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getPhoneMask(val) {
            this.userInfo.phone = this.getMask(val)
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
        },
        modifyUserInfo() {
            const API_URL = `http://localhost:8080/modify`;

            axios({
                url: API_URL,
                method: 'post',
                data: {
                    loginId: this.userInfo.loginId,
                    password: this.passwordCheck,
                    email: this.userInfo.email,
                    phone: this.userInfo.phone,
                    nickname: this.userInfo.nickname
                },
                headers:{
                    "Access-Control-Allow-Origin":"http://localhost:3000/",
                    "Access-Control-Allow-Headers":'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }
            }).then((res) => {
                if (res.data === 1) {
                    alert("정보가 변경 되었습니다.")
                    this.getUserInfo();
                    this.$router.push('/mypage')
                }
            })
        },
    },
    created() {
        this.$store.state.myPageState = "modify";
        this.getUserInfo();
    }
}
</script>


<style scoped>

</style>