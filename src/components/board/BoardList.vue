<template>
    <div>
        <main class="p-3 mb-3 border-bottom container-sm">
            <div class="container-sm">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <form class="row g-3" method="get" action="${root}/article/list">
                        <input type="hidden" name="action" value="list">
                        <div class="col-auto">
                            <input type="text" class="form-control" name="condition" v-model="condition"
                                   placeholder="제목">
                        </div>
                        <div class="col-auto">
                            <select class="form-select" name="sortCondition">
                                <option value="1" selected>최신등록순</option>
                                <option value="2">보기순</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-secondary mb-3" @click="loadData">검색</button>
                            <button type="button" class="btn btn-primary mb-3" @click="moveWrite">글쓰기</button>
                        </div>
                    </form>
                </div>
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start ">
                    <table class="table m-auto wrapper">
                        <thead>
                        <tr>
                            <th scope="col" class=' text-center'>번호</th>
                            <th scope="col" class=' text-center'>제목</th>
                            <th scope="col" class=' text-center'>작성자</th>
                            <th scope="col" class=' text-center'>조회수</th>
                            <th scope="col" class=' text-center'>등록일</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider">
                        <tr v-for="article in articleList" :key="article.articleId">
                            <td>{{ article.articleId }}</td>
                            <td>
                                <router-link :to="{name: 'boardview', params: {articleId: article.articleId}}">
                                    {{ article.title }}
                                </router-link>
                            </td>
                            <td>{{ article.nickname }}</td>
                            <td>{{ article.hit }}</td>
                            <td>{{ article.createdDate }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination
                        :current-page="currentPage"
                        :total-pages="totalPages"
                        @update-page="updatePage"
                ></Pagination>
            </div>
        </main>
    </div>
</template>

<script>

import axios from "axios";
import Pagination from "@/components/common/Pagination.vue";

export default {
    name: 'BoardList',
    components: {
        Pagination,
    },
    data() {
        return {
            condition: "",
            currentPage: 1,
            totalPages: 0,
            articleList: [],
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        moveWrite() {
            this.$router.push({name: 'boardwrite'});
        },
        loadData() {
            const API_URL = `http://localhost:8080/articles`;
            const headers = {
                Authorization: sessionStorage.getItem("access-token"),
                'access-token': sessionStorage.getItem("access-token"),
            };
            const params = {
                page: this.currentPage,
                condition: this.condition,
            }
            axios.get(API_URL, {headers, params})
                .then(response => {
                    this.articleList = response.data.data.content;
                    this.articleList.forEach(function (article) {
                        article.createdDate = article.createdDate.replace('T', ' ');
                    })
                    this.totalPages = response.data.data.totalPages;
                    //todo : 검색 시 페이징 처리
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updatePage(page) {
            this.currentPage = page;
            this.loadData();
        },
    }
}
</script>

<style scoped>

</style>