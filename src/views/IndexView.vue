<template>
    <div class="background">
        <info-view></info-view>
        <trend-view></trend-view>
        <window-view></window-view>
        <youtube-view></youtube-view>
        <slide-view></slide-view>
    </div>
</template>

<script>
import TrendView from "@/components/index/TrendView.vue";
import InfoView from "@/components/index/InfoView.vue";
import YoutubeView from "@/components/index/YoutubeView.vue";
import SlideView from "@/components/index/SlideView.vue";
import WindowView from "@/components/index/WindowView.vue";

export default {
    name: "IndexView",
    components: {WindowView, SlideView, YoutubeView, InfoView, TrendView}
}
</script>

<style scoped>
.background {
    background: url(https://t1.daumcdn.net/cfile/tistory/995A583359893C8E32?original);
    background-attachment: fixed;
    background-size: cover;
}
</style>