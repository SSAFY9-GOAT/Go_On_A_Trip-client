<template>
    <div id="trend-container" class="mt-5">
        <div class="container px-4 py-5 text-center" id="featured-3">
            <h2>실시간<br/><strong>인기있는 여행지</strong></h2>
            <div class="row row-cols-1 row-cols-md-5 g-4 mt-3">
                <div class="col">
                    <h3>10대 1위</h3>
                    <div class="card h-100">
                        <img :src="require(`@/assets/img/userUpload/${teenage.firstImage}`)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ teenage.name }}</h5>
                            <p class="card-text">{{ teenage.hit }}</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h3>20대 1위</h3>
                    <div class="card h-100">
                        <img :src="require(`@/assets/img/userUpload/${twenty.firstImage}`)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ twenty.name }}</h5>
                            <p class="card-text">{{ twenty.hit }}</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h3>30대 1위</h3>
                    <div class="card h-100">
                        <img :src="require(`@/assets/img/userUpload/${thirty.firstImage}`)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ thirty.name }}</h5>
                            <p class="card-text">{{ thirty.hit }}</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h3>남성 1위</h3>
                    <div class="card h-100">
                        <img :src="require(`@/assets/img/userUpload/${male.firstImage}`)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ male.name }}</h5>
                            <p class="card-text">{{ male.hit }}</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h3>여성 1위</h3>
                    <div class="card h-100">
                        <img :src="require(`@/assets/img/userUpload/${female.firstImage}`)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ female.name }}</h5>
                            <p class="card-text">{{ female.hit }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "TrendView",
    data() {
        return {
            female: null,
            male: null,
            teenage: null,
            twenty: null,
            thirty: null,
        }
    },
    created() {
        const API_URL = `http://localhost:8080/index`;
        console.log("[인덱스-트랜드] 요청")
        axios({
            url: API_URL,
            method: "get",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/",
                "Access-Control-Allow-Headers": 'Authorization',
                Authorization: sessionStorage.getItem("access-token"),
            }
        }).then((res) => {
            console.log("[인덱스-트랜드] 요청 응답={}", res);
            // this.hotPlaceList = res.data;
            this.female = res.data.female
            this.male = res.data.male
            this.teenage = res.data.teenage
            this.twenty = res.data.twenty
            this.thirty = res.data.thirty
        }).catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style scoped>
#trend-container {
}
</style>