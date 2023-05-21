<template>
    <div class="container">
        <main class="container">
            <div class="p-4 p-md-5 mb-4 text-secondary rounded bg-white shadow">
                <div class="col-md-6 px-0">
                    <h1 class="display-5 fst-italic">나만의 여행 계획 세우기</h1>
                    <p class="lead my-3">나만의 여행 계획을 세워보세요!</p>
                </div>
            </div>
            <!-- start section -->
            <div class="container d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <form class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="관광지 검색" aria-label="keyword" id="keyword"
                               value=""/>
                    </div>
                    <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasScrolling" onclick="getTourList()">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                        <i class="bi bi-search"></i>
                        <button type='button' class='btn btn-success' onclick='done()'>일정 확정</button>
                    </div>
                </form>
            </div>
            <!-- start album -->

            <div class="row">
                <TripPlanMap class='col-8 mh-100' :plans="plans"></TripPlanMap>
<!--                <div class="col-4">-->
<!--                    <form id="planList" method="post" action="${root}/tripPlan/create">-->
<!--                        <input type="hidden" id="contentList" name="contentList" value="">-->
<!--                        <div class="input-group mb-3">-->
<!--                            <span class="input-group-text" >제목</span>-->
<!--                            <input type="text" class="form-control" name="planTitle" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>-->
<!--                        </div>-->
<!--                        <table id="plan" class="table table-hover ">-->
<!--                            <tr>-->
<!--                                <th>여행 경로</th>-->
<!--                            </tr>-->
<!--                        </table>-->
<!--                        <button id="createPlan" type='submit' class='btn btn-success' >최적의 경로로 등록하기</button>-->
<!--                    </form>-->
<!--                </div>-->
            </div>

            <!-- end album -->
            <!-- start right bar -->

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">검색 결과</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="album py-5">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-1 g-3" id="tour-list">
                                <!-- 관광지 정보 비동기 통신 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end right bar -->


        </main>
    </div>
</template>

<script>
import TripPlanMap from "@/components/tripplan/TripPlanMap.vue";

export default {
    name: "TripPlanWrite",
    components: {TripPlanMap},
    data() {
        return {
            plans: [],
        };
    },
    methods: {
        write() {
            let tripplan = {

            };
            this.$emit("write", tripplan);
        }
    }
}
</script>

<style scoped>

</style>