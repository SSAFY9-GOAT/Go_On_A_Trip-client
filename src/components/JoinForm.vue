<template>
    <div>
        <div id="container">
            <h2>회원 가입</h2>
            <div class="input">
                <div class="label">
                    <label>아이디</label>
                    <p>영문, 숫자, 8~20자</p>
                </div>
                <input v-model="id" type="text" name="loginId" maxlength="20" placeholder="아이디" autocomplete="off"
                       required @keyup="idCheck">
                <b-form-valid-feedback v-if="check.id">Thank you</b-form-valid-feedback>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>비밀번호</label>
                    <p>영문, 숫자, 특수문자 8~20자</p>
                </div>
                <input v-model="password" type="password" name="loginPw" maxlength="20" placeholder="비밀번호"
                       @keyup="chkPW" required>
<!--                <b-icon icon="exclamation-triangle" scale="2" variant="warning"></b-icon>-->
                <input v-model="passwordCheck" type="password" name="checkLoginPw" maxlength="20" placeholder="비밀번호 확인"
                       required>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>이름</label>
                </div>
                <input v-model="name" type="text" name="username" maxlength="20" placeholder="이름" autocomplete="off"
                       required>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>닉네임</label>
                    <p>커뮤니티 활동에 필요</p>
                </div>
                <input v-model="nickName" type="text" name="nickname" maxlength="10" placeholder="닉네임"
                       autocomplete="off" required>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>이메일</label>
                    <!--                    <p>아이디/비밀번호 찾기에 필요</p>-->
                </div>
                <input v-model="email" type="email" name="email" placeholder="이메일" autocomplete="off" required>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>휴대폰번호</label>
                    <p>아이디/비밀번호 찾기에 필요</p>
                </div>
                <input v-model="phone" type="text" name="phone" maxlength="13" placeholder="휴대폰번호 (숫자만 입력)"
                       autocomplete="off" @keyup="getPhoneMask(phone)" required>
                <div class="caution"></div>
            </div>
            <div class="input">
                <div class="label">
                    <label>생년월일</label>
                    <p>아이디/비밀번호 찾기에 필요</p>
                </div>
                <b-row>
                    <b-col md="auto">
                        <b-calendar
                                v-model="birth" class="border rounded p-2" :hide-header="hideHeader" block
                                show-decade-nav label-help="생년월일"/>
                    </b-col>
                </b-row>
            </div>
            <div class="input">
                <div class="label">
                    <label>성별</label>
                    <p></p>
                </div>
                <b-row>
                    <b-col md="auto">
                        <b-form-radio-group v-model="gender" :options="options" :state="state" name="radio-validation"
                                            Inline>
                            <b-form-valid-feedback v-if="gender">Thank you</b-form-valid-feedback>
                            <b-form-invalid-feedback v-else>성별을 골라주세요</b-form-invalid-feedback>
                        </b-form-radio-group>
                    </b-col>
                </b-row>
            </div>

            <b-button type="button" variant="info" class="p-2 mt-3" @click="join">회원가입</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "JoinForm",
    data() {
        return {
            id: "",
            password: "",
            passwordCheck: "",
            name: "",
            nickName: "",
            email: "",
            phone: "",
            birth: '',
            gender: null,
            options: [
                {text: '남성', value: 'M'},
                {text: '여성', value: 'F'}
            ],
            check: {
                id: false,
                pwlen: false,
            }
        }
    },
    computed: {
        state() {
            return Boolean(this.gender)
        }
    },
    methods: {
        join(){
            let userInfo ={
                loginId :this.id,
                loginPw: this.password,
                userName:this.name,
                email:this.email,
                phone:this.phone,
                birth:this.birth.substring(5,10).replace("-",""),
                birthyear:this.birth.substring(0,4),
                gender:this.gender,
                nickname:this.nickName,
            };
            this.$emit("join", userInfo);
        },
        idCheck() {
            this.check.id = this.id.length >= 8 && this.id.length <= 20;
        },
        chkPW() {

            var pw = this.password;
            var num = pw.search(/[0-9]/g);
            var eng = pw.search(/[a-z]/ig);
            var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

            if (pw.length < 8 || pw.length > 20) {

                this.check.pwlen = false
                // return false;
            }
            if (pw.search(/\s/) != -1) {
                // alert("비밀번호는 공백 없이 입력해주세요.");
                return false;
            }
            if (num < 0 || eng < 0 || spe < 0) {
                // alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
                return false;
            } else {
                console.log("통과");
                return true;
            }

        },
        setToday() {
            const now = new Date()
            this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        },
        getPhoneMask(val) {
            this.phone = this.getMask(val)
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
    mounted() {
        this.setToday();
    }

};

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    border: 0
}

a {
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, .05)
}

address, h1, h2, h3, h4, h5, h6 {
    font-weight: normal
}

article, aside, div, figure, nav {
    display: block
}

body {
    color: #292929;
    font-family: "맑은 고딕", "돋움", "Apple SD Gothic Neo", sans-serif;
    letter-spacing: -0.5px;
    background-color: #fff;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

bdi {
    display: none;
}

dl, li, ol, ul {
    list-style-type: none
}

hr {
    clear: both;
    width: auto;
    height: 0;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0)
}

/*img {*/
/*    display: block*/
/*}*/

input, select, textarea {
    outline: none
}

input::placeholder,
textarea::placeholder {
    color: #a6a6a6
}

input[type=button],
input[type=email],
input[type=number],
input[type=password],
input[type=search],
input[type=text],
input[type=submit],
select,
textarea {
    -webkit-appearance: none;
    letter-spacing: -0.5px
}

/*textarea {*/
/*    resize: none*/
/*}*/

#container div.input input[type=email],
#container div.input input[type=password],
#container div.input input[type=text],
#container div.input select {
    display: block;
    box-sizing: border-box;
    margin-top: 4px;
    padding: 8px;
    width: 100%;
    height: 40px;
    line-height: 24px;
    border: 1px solid #ededed;
    border-radius: 12px;
    color: #292929;
    font-size: 16px;
    background-color: #f9f9f9;
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 24px 24px
}

#container {
    padding: 16px 24px 48px 24px
}

#container h2 {
    line-height: 30px;
    color: #292929;
    font-size: 22px;
    font-weight: bold
}

#container h2:not(:first-of-type) {
    margin-top: 48px
}

#container h2.multiple {
    font-weight: normal
}

/*#container p.description {*/
/*    margin-top: 8px;*/
/*    line-height: 20px;*/
/*    color: #737373;*/
/*    font-size: 14px*/
/*}*/

/*#container p.description strong {*/
/*    color: #292929*/
/*}*/

#container div.input {
    margin-top: 24px
}

#container div.input div.label {
    display: flex;
    padding: 0 8px;
}

#container div.input div.label label {
    flex: auto;
    line-height: 20px;
    color: #737373;
//font-size: 12px; text-align: left; font-weight: bold
}

#container div.input div.label p {
    flex-shrink: 0;
    line-height: 20px;
    color: #a6a6a6;
    font-size: 12px
}

/*#container div.input select {*/
/*    //background-image: url("/images/register/register.input.select.png")*/
/*}*/

#container div.input input[type=email],
#container div.input input[type=password],
#container div.input input[type=text] {
    padding-right: 40px
}

#container div.input input[type=email]:focus,
#container div.input input[type=password]:focus,
#container div.input input[type=text]:focus {
    background-color: #fff
}

/*#container div.input input[type=email].search,*/
/*#container div.input input[type=password].search,*/
/*#container div.input input[type=text].search {*/
/*    //background-image: url("/images/register/register.input.search.png")*/
/*}*/

/*#container div.input input[type=email].caution,*/
/*#container div.input input[type=password].caution,*/
/*#container div.input input[type=text].caution {*/
/*    //background-image: url("/images/register/register.input.caution.png")*/
/*}*/

/*#container div.input input[type=email].pass,*/
/*#container div.input input[type=password].pass,*/
/*#container div.input input[type=text].pass {*/
/*    //background-image: url("/images/register/register.input.pass.png")*/
/*}*/

#container div.input div.caution {
    display: none;
    margin: 4px 0 0 8px;
    line-height: 20px;
    color: #c62917;
    font-size: 12px
}

#container input[type=submit] {
    display: block;
    margin-top: 24px;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    background-color: #34aeeb
}

/*#container ol.schools {*/
/*    margin-top: 16px*/
/*}*/

/*#container ol.schools li a {*/
/*    display: block;*/
/*    line-height: 40px;*/
/*    padding: 0 8px;*/
/*    color: #444;*/
/*    font-size: 16px;*/
/*    cursor: pointer*/
/*}*/

/*#container ol.schools li a strong {*/
/*    color: #c62917*/
/*}*/

/*#container ol.schools li.empty {*/
/*    line-height: 20px;*/
/*    padding: 0 8px;*/
/*    color: #a6a6a6;*/
/*    font-size: 14px*/
/*}*/

/*#container div.agreement {*/
/*    margin-top: 16px*/
/*}*/

#container div.agreement label {
    display: block;
    line-height: 40px;
    color: #292929;
    font-size: 12px;
    cursor: pointer
}

#container div.agreement label.bold {
    font-weight: bold
}

#container div.agreement label input[type=checkbox] {
    display: none
}

/*#container div.agreement label input[type=checkbox]:checked~figure.checkbox {
    //background-image: url("/images/register/register.agreement.checkbox.checked.png")
}*/

/*#container div.agreement label figure.checkbox {*/
/*    display: inline-block;*/
/*    margin: 13px 8px 0 0;*/
/*    width: 14px;*/
/*    height: 14px;*/
/*    //background-image: url("/images/register/register.agreement.checkbox.unchecked.png");*/
/*    background-size: 14px 14px;*/
/*    vertical-align: top*/
/*}*/

/*#container div.agreement div.text {*/
/*    overflow: auto;*/
/*    padding: 8px;*/
/*    box-sizing: border-box;*/
/*    height: 144px;*/
/*    border: 1px solid #ededed;*/
/*    border-radius: 12px;*/
/*    background-color: #f9f9f9*/
/*}*/

/*#container div.agreement div.text.small {*/
/*    height: auto*/
/*}*/

/*#container div.agreement div.text h3 {*/
/*    line-height: 18px;*/
/*    color: #737373;*/
/*    font-size: 12px;*/
/*    font-weight: bold*/
/*}*/

/*#container div.agreement div.text h3:not(:first-of-type) {*/
/*    margin-top: 16px*/
/*}*/

/*#container div.agreement div.text h4 {*/
/*    margin-top: 4px;*/
/*    line-height: 18px;*/
/*    color: #737373;*/
/*    font-size: 12px;*/
/*    font-weight: bold*/
/*}*/

/*#container div.agreement div.text p {*/
/*    margin-top: 4px;*/
/*    line-height: 18px;*/
/*    color: #737373;*/
/*    font-size: 12px*/
/*}*/

/*#container div.agreement div.text p:first-child {*/
/*    margin-top: 0*/
/*}*/

/*#container div.agreement div.text ol {*/
/*    margin-top: 4px;*/
/*    padding-left: 12px*/
/*}*/

/*#container div.agreement div.text ol li {*/
/*    list-style-type: decimal;*/
/*    line-height: 18px;*/
/*    color: #737373;*/
/*    font-size: 12px*/
/*}*/

/*#container div.agreement div.text ol ol {*/
/*    margin-top: 0;*/
/*    padding-left: 12px*/
/*}*/

/*#container div.agreement div.text ol ol li {*/
/*    list-style-type: disc*/
/*}*/

/*#container div.agreement div.text ol ol ol li {*/
/*    list-style-type: circle*/
/*}*/

/*#container form {*/
/*    margin-top: 24px*/
/*}*/

/*#container form[data-type=ipin] {*/
/*    margin-top: 8px*/
/*}*/

/*#container form a {*/
/*    display: block;*/
/*    line-height: 40px;*/
/*    border-radius: 12px;*/
/*    font-size: 16px;*/
/*    text-align: center;*/
/*    cursor: pointer*/
/*}*/

/*#container form a.red {*/
/*    color: #fff;*/
/*    font-weight: bold;*/
/*    background-color: #c62917*/
/*}*/

/*#container form a.normal {*/
/*    color: #737373;*/
/*    background-color: #f2f2f2*/
/*}*/

/*#container div.buttons {*/
/*    margin-top: 24px*/
/*}*/

/*#container div.buttons a {*/
/*    display: block;*/
/*    margin-bottom: 8px;*/
/*    height: 40px;*/
/*    line-height: 40px;*/
/*    border-radius: 12px;*/
/*    font-size: 16px;*/
/*    text-align: center;*/
/*    cursor: pointer*/
/*}*/

/*#container div.buttons a.normal {*/
/*    color: #737373;*/
/*    background-color: #f2f2f2*/
/*}*/

/*#container div.buttons a.red {*/
/*    color: #fff;*/
/*    font-weight: bold;*/
/*    background-color: #c62917*/
/*}*/

@media (min-width: 480px) {
    #container {
        box-sizing: border-box;
        border: 1px solid #ededed;
        border-radius: 12px;
        margin: 24px auto;
        padding: 24px;
        width: 480px
    }
}
</style>