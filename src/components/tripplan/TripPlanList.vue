<template>
    <div class="container">
        <main class="p-3 mb-3 border-bottom container-sm">
            <div class="container-sm">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <form class="row g-3" method="get" action="${root}/tripPlan/list">
                        <input type="hidden" name="action" value="list">
                        <div class="col-auto">
                            <input type="text" class="form-control" name="condition" v-model="condition" placeholder="작성자, 제목">
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
                            <th scope="col" class=' text-center'>등록일</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="plan in tripPlanList" :key="plan.tripPlanId">
                                <td>{{plan.tripPlanId}}</td>
                                <td>
                                    <router-link :to="{name: 'tripplanview', params: {tripPlanId: plan.tripPlanId}}">
                                        {{plan.tripPlanId}}
                                    </router-link>
                                </td>
                                <td class='text-center'>{{plan.nickname}}</td>
                                <td class='text-center'>{{plan.createdDate}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <TripPlanPagination
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @update-page="updatePage"
                ></TripPlanPagination>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import TripPlanPagination from "@/components/tripplan/TripPlanPagination.vue";

export default {
    name: "TripPlanList",
    components: {
        TripPlanPagination,
    },
    data() {
        return {
            condition: "",
            currentPage: 1,
            totalPages: 0,
            tripPlanList: [],
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        moveWrite() {
            this.$router.push({name: 'tripplanwrite'});
        },
        loadData() {
            const API_URL = `http://localhost:8080/tripplan`;
            const headers = {
                Authorization: sessionStorage.getItem("access-token"),
                'access-token': sessionStorage.getItem("access-token"),
            };
            const params = {
                page : this.currentPage,
                condition : this.condition,
            }
            axios.get(API_URL, {headers, params})
                .then(response => {
                    this.tripPlanList = response.data.data.content;
                    this.tripPlanList.forEach(function (plan) {
                        plan.createdDate = plan.createdDate.replace('T', ' ');
                    })
                    this.totalPages = response.data.data.totalPages;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updatePage(page) {
            this.currentPage = page;
            this.loadData();
        }
    }
}
</script>

<style scoped>

</style>