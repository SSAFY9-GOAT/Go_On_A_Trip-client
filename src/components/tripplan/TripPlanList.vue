<template>
    <div class="container">
        <main class="p-3 mb-3 border-bottom container-sm">
            <div class="container-sm">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <form class="row g-3" method="get" action="${root}/tripPlan/list">
                        <input type="hidden" name="action" value="list">
                        <div class="col-auto">
                            <input type="text" class="form-control" id="condition" name="condition" placeholder="작성자, 제목">
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-secondary mb-3">검색</button>
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
<!--                <%&#45;&#45; 페이징 시작 &#45;&#45;%>-->
<!--                <div class="d-flex justify-content-center mt-3">-->
<!--                    <nav aria-label="Page navigation example">-->
<!--                        <ul class="pagination">-->
<!--                            <%&#45;&#45; 이전버튼시작 &#45;&#45;%>-->
<!--                            <c:if test="${page.prev}">-->
<!--                                <li class="page-item">-->
<!--                                    <a class="page-link"-->
<!--                                       href="${root}/tripPlan/list&pageNum=${page.startPage-1}&amount=${page.amount}">이전</a>-->
<!--                                </li>-->
<!--                            </c:if>-->
<!--                            <%&#45;&#45; 이전버튼종료 &#45;&#45;%>-->
<!--                            <%&#45;&#45; 페이징번호 처리시작 &#45;&#45;%>-->
<!--                            <c:forEach var="num" begin="${page.startPage}" end="${page.endPage}">-->
<!--                                <li class="page-item">-->
<!--                                    <a class="page-link" href="${root}/tripPlan/list?pageNum=${num}&amount=${page.amount}">${num}</a>-->
<!--                                </li>-->
<!--                            </c:forEach>-->
<!--                            <%&#45;&#45; 페이징번호 처리종료 &#45;&#45;%>-->
<!--                            <%&#45;&#45; 시작버튼시작 &#45;&#45;%>-->
<!--                            <c:if test="${page.next}">-->
<!--                                <li class="page-item">-->
<!--                                    <a class="page-link"-->
<!--                                       href="${root}/tripPlan/list&pageNum=${page.endPage + 1}&amount=${page.amount}">다음</a>-->
<!--                                </li>-->
<!--                            </c:if>-->
<!--                            <%&#45;&#45; 시작버튼종료 &#45;&#45;%>-->
<!--                        </ul>-->
<!--                    </nav>-->
<!--                </div>-->
<!--                <%&#45;&#45; 페이징 종료 &#45;&#45;%>-->
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "TripPlanList",
    components: {

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
    }
}
</script>

<style scoped>

</style>