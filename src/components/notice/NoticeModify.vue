<template>
    <div>
        <div class='shadow m-lg-auto m-lg-5 m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
            <div class='notion-head m-auto'>
                <div class='notion-title'>
                    <div class="mb-3 ">
                        <div class="input-group ">
                            <span class="input-group-text" id="basic-addon2">제목</span>
                            <input type="text" class="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요"
                                   name="title" v-model="notice.title"
                                   aria-describedby="basic-addon2">
                        </div>
                    </div>
                </div>
            </div>
            <div class='notion-body'>
                <div>
                    <div class=' notion-content'>
                        <div class="mb-3">
                            <div class="input-group">
                    <textarea type="text" name="content" class="form-control" id="basic-url"
                              aria-describedby="basic-addon3"
                              aria-label="With textarea" rows='20' v-model="notice.content"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='notion-footer mt-5 '>
                <button type="button" class='btn btn-outline-success' @click="modify">수정하기</button>
            </div>
        </div>
        <div class='m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
            <div class='row justify-content-end'>
                <router-link :to="{name: 'noticelist'}" class='col-1 btn btn-outline-info'>목록으로</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NoticeModify",
    data() {
        return {
            notice: Object,
        }
    },
    created() {
        let noticeId = this.$route.params.noticeId;
        const API_URL = `http://localhost:8080/notice/${noticeId}`;
        axios.get(API_URL)
            .then(response => {
                console.log(response.data);
                this.notice = response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
    },
    methods: {
        modify() {
            this.$emit("modify", this.notice);
        }
    }
}
</script>

<style scoped>

</style>