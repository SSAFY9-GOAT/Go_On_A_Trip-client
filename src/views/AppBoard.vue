<template>
    <div>
        <router-view @write="write" @modify="modify" @deleted="deleted"></router-view>
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
        write(article) {
            const API_URL = `http://localhost:8080/articles/write`;
            console.log(this.$store.state.memberStore.loginUser.id);
            axios({
                url: API_URL,
                method: "POST",
                data:{
                    title: article.title,
                    content: article.content,
                },
                params:{
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                },
                headers:{
                    Authorization: sessionStorage.getItem("access-token"),
                    'access-token': sessionStorage.getItem("access-token"),
                },
            }).then((res) => {
                console.log(res);
                this.$router.push(`/articles`)
            }).catch((err) => {
                console.log(err);
            });
        },
        modify(article) {
            let articleId = article.articleId;
            const API_URL = `http://localhost:8080/articles/${articleId}/modify`;
            console.log(article);
            axios({
                url: API_URL,
                method: "POST",
                data:{
                    title: article.title,
                    content: article.content,
                },
                params:{
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                }
            }).then(() => {
                this.$router.push(`/articles/${articleId}`)
            }).catch((err) => {
                console.log(err);
            });
        },
        deleted(articleId) {
            const API_URL = `http://localhost:8080/articles/${articleId}/delete`;
            axios({
                url: API_URL,
                method: "POST",
                params:{
                    loginUserId: this.$store.state.memberStore.loginUser.id,
                }
            }).then(() => {
                this.$router.push(`/articles`)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>