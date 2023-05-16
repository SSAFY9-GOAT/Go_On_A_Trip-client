<template>
    <div>
        <router-view @write="write" @modify="modify"></router-view>
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
            console.log(this.$store.state.loginUser.id);
            axios({
                url: API_URL,
                method: "POST",
                data:{
                    title: article.title,
                    content: article.content,
                },
                params:{
                    loginUserId: this.$store.state.loginUser.id,
                }
            }).then((res) => {
                console.log(res);
                this.$router.push(`/articles`)
            }).catch((err) => {
                console.log(err);
            });
        },
        modify(article) {
            let articleId = article.articleId;
            const API_URL = `http://localhost:8080/articles/"${articleId}"/modify`;
            console.log(article);
            axios({
                url: API_URL,
                method: "POST",
                data:
                article,
            }).then(() => {
                this.$router.push(`/articles/"${articleId}"`)
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>