<template>
    <div>
        <router-view @write="write" @modify="modify" @deleted="deleted"></router-view>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AppNotice",
    data() {
        return {
            notice: null,
        };
    },
    methods: {
        write(notice) {
            const API_URL = `http://localhost:8080/notice/write`;
            console.log(this.$store.state.memberStore.loginUser.id);
            axios({
                url: API_URL,
                method: "POST",
                data: {
                    title: notice.title,
                    content: notice.content,
                    top: notice.top,
                },
                params: {
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                },
                headers: {
                    Authorization: sessionStorage.getItem("access-token"),
                    'access-token': sessionStorage.getItem("access-token"),
                },
            }).then((res) => {
                console.log(res);
                this.$router.push(`/notice`)
            }).catch((err) => {
                console.log(err);
            });
        },
        modify(notice) {
            let noticeId = notice.id;
            const API_URL = `http://localhost:8080/notice/${noticeId}/modify`;
            console.log(notice);
            axios({
                url: API_URL,
                method: "POST",
                data: {
                    title: notice.title,
                    content: notice.content,
                    top: notice.top,
                },
                params: {
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                },
                headers: {
                    Authorization: sessionStorage.getItem("access-token"),
                    'access-token': sessionStorage.getItem("access-token"),
                },
            }).then(() => {
                this.$router.push(`/notice/${noticeId}`)
            }).catch((err) => {
                console.log(err);
            });
        },
        deleted(noticeId) {
            const API_URL = `http://localhost:8080/notice/${noticeId}/delete`;
            axios({
                url: API_URL,
                method: "POST",
                params: {
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                },
                headers: {
                    Authorization: sessionStorage.getItem("access-token"),
                    'access-token': sessionStorage.getItem("access-token"),
                },
            }).then(() => {
                this.$router.push(`/notice`)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>