<template>
    <div>
        <router-view @write="write" ></router-view>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AppBoard",
    data() {
        return {
            article: null,
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
    }
}
</script>

<style scoped>

</style>