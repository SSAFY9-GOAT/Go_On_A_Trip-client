<template>
    <div>
        <info-view></info-view>
        <trend-view></trend-view>
    </div>
</template>

<script>
import TrendView from "@/components/index/TrendView.vue";
import InfoView from "@/components/index/InfoView.vue";

export default {
    name: "IndexView",
    components: {InfoView, TrendView}
}
</script>

<style scoped>

</style>