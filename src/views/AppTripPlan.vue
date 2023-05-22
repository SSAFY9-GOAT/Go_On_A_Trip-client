<template>
    <div>
        <router-view @write="write"></router-view>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AppTripPlan",
    data() {
        return {
            tripplan: null,
        };
    },
    methods: {
        write(tripplanList, planTitle) {
            const API_URL = `http://localhost:8080/tripplan/write`;
            let tripPlanList = [];
            tripplanList.forEach (function (tripPlan) {
                tripPlanList.push(tripPlan.id);
                // id 값만 받아오기
            });
            console.log(tripPlanList)
            axios({
                url: API_URL,
                method: "POST",
                data:{
                    title: planTitle,
                    tripPlanIdList: tripPlanList,
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
                this.$router.push(`/tripplan`)
            }).catch((err) => {
                console.log(err);
            })

        }
    },
}
</script>

<style scoped>

</style>