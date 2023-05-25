<template>
    <div>
        <div class='shadow m-lg-auto m-lg-5 m-5 m-auto p-lg-5 container-sm justify-content-center align-content-center'>
            <div class='notion-head m-auto'>
                <div class='notion-title'>
                    <h1 class='h3 mb-3'>{{ notice.title }}</h1>
                    <h1 class='h6'>운영자 | {{ notice.createdDate }}</h1>
                </div>
            </div>
            <hr>
            <div class='notion-body p-lg-5'>
                <div>
                    <div class='notion-content'>
                        {{ notice.content }}
                    </div>
                </div>
            </div>
            <hr>
            <div v-if="$store.state.memberStore.loginUser">
            <div v-if="$store.state.memberStore.loginUser.authority === 'ADMIN'" class='notion-footer mt-5 '>
                <router-link :to="{name: 'noticemodify', params: {noticeId: notice.id}}"
                             class='btn btn-outline-success'>수정하기
                </router-link>
                <button type="button" class='btn btn-outline-danger' @click="deleted">삭제하기</button>
            </div>
                </div>

            <div class='m-auto container-sm justify-content-center align-content-center'>
                <div class='row justify-content-end'>
                    <router-link to="/notice" class=' col-1 btn btn-outline-info'>목록으로</router-link>
                </div>
            </div>
            <!-- end section -->
            <!-- 삭제 Modal -->
            <!--<div class="modal fade" id="notificationDeleteModal" tabindex="-1" aria-labelledby="notificationDeleteModalLabel"-->
            <!--     aria-hidden="true">-->
            <!--    <div class="modal-dialog modal-dialog-centered">-->
            <!--        <div class="modal-content">-->
            <!--            <div class="modal-header">-->
            <!--                <h1 class="modal-title fs-5" id="notificationDeleteModal">공지 삭제</h1>-->
            <!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            <!--            </div>-->
            <!--            <div class="modal-body">-->
            <!--                공지를 삭제하겠습니까?-->
            <!--            </div>-->
            <!--            <div class="modal-footer">-->
            <!--                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>-->
            <!--                <button type="button" class="btn btn-danger" data-bs-target="#DeleteConfirmModal"-->
            <!--                        data-bs-toggle="modal" data-bs-dismiss="modal">삭제하기-->
            <!--                </button>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="modal fade" id="DeleteConfirmModal" aria-hidden="true" aria-labelledby="DeleteConfirmModalLabel"-->
            <!--     tabindex="-1">-->
            <!--    <div class="modal-dialog modal-dialog-centered">-->
            <!--        <div class="modal-content">-->
            <!--            <div class="modal-header">-->
            <!--                <h5 class="modal-title" id="DeleteConfirmModal">Modal 2</h5>-->
            <!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            <!--            </div>-->
            <!--            <div class="modal-body">-->
            <!--                삭제되었습니다.-->
            <!--            </div>-->
            <!--            <div class="modal-footer">-->
            <!--                <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"-->
            <!--                        data-bs-dismiss="modal">확인-->
            <!--                </button>-->
            <!--            </div>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NoticeView",
    data() {
        return {
            notice: [],
        }
    },
    created() {
        let noticeId = this.$route.params.noticeId;
        const API_URL = `http://localhost:8080/notice/${noticeId}`;
        axios.get(API_URL, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/",
                "Access-Control-Allow-Headers": 'Authorization',
                Authorization: sessionStorage.getItem("access-token"),
            }
        })
            .then(response => {
                this.notice = response.data.data;
                this.notice.createdDate = this.notice.createdDate.replace('T', ' ');
            })
            .catch(error => {
                alert(error.response.data.message);
                this.$router.push({name: "login"});
                console.log(error.response.data.message);
            })
    },
    methods: {
        deleted() {
            this.$emit("deleted", this.$route.params.noticeId);
        }
    }
}
</script>

<style scoped>

</style>