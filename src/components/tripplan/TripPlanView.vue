<template>
    <div>
        <div class="container">
            <main class="container">
                <div class="p-4 p-md-5 mb-4 text-secondary rounded bg-white shadow">
                    <div class="col-md-6 px-0">
                        <h1 class="display-5 fst-italic">나만의 여행 계획 세우기</h1>
                        <p class="lead my-3">나만의 여행 계획을 세워보세요!</p>
                    </div>
                </div>
                <!-- start section -->

                <!-- start album -->

                <div class="row">
                    <DetailPlanMap class='col-8 mh-100' v-if="tripPlan" :detail-plans="tripPlan.detailPlans"></DetailPlanMap>
                    <div class="col-4">
                        <div class="input-group mb-3">
                            <span class="input-group-text">제목</span>
                            <input type="text" class="form-control" v-if="tripPlan" :value="tripPlan.title" name="planTitle"
                                   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                   readonly>
                        </div>
                        <table id="plan" class="table table-hover ">
                            <tr>
                                <th>여행 리스트</th>
                            </tr>
                            <tr v-for="Plan in tripPlan.detailPlans" :key="Plan.detailPlanId">
                                <td>{{ Plan.title }}</td>
                            </tr>

                        </table>
                        <div v-if="tripPlan">
                        <div v-if="$store.state.memberStore.loginUser.nickname === tripPlan.nickname" >
                            <button type='button' class='btn btn-danger' @click="deleted">삭제하기</button>
                        </div>
                        </div>


                    </div>
                </div>
                <div></div>


                <!-- end album -->
            </main>
        </div>
    </div>
</template>

<script>
import DetailPlanMap from "@/components/tripplan/DetailPlanMap.vue";
import axios from "axios";

export default {
    name: "TripPlanView",
    components: {
        DetailPlanMap,
    },
    data() {
        return {
            tripPlan: null,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            let tripPlanId = this.$route.params.tripPlanId;
            const API_URL = `http://localhost:8080/tripplan/${tripPlanId}`;
            axios.get(API_URL, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }
            })
                .then(res => {
                    console.log(res.data)
                    this.tripPlan = res.data;
                })
        },
        deleted() {
            this.$emit("delete", this.$route.params.tripPlanId);
        }
    }
}
</script>

<style scoped>

</style>