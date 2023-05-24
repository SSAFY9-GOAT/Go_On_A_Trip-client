<template>
    <div class="wrapper p-lg-5">
        <br>
        <h1>모험과 발견의 향연,</h1>
        <h1> 여행으로 세상을 만나다</h1>
        <br>
        <h5>자연 속으로, 여행의 모험을 떠나보세요 </h5>
        <br>

        <iframe v-if="num===0" width="720" height="405"
                src="https://www.youtube.com/embed/0J7DrnZThIY?autoplay=1&mute=1&controls=0&loop=1&playlist=0J7DrnZThIY"></iframe>
        <iframe v-else-if="num===1" width="720" height="405"
                src="https://www.youtube.com/embed/xLD8oWRmlAE?autoplay=1&mute=1&controls=0&loop=1&playlist=xLD8oWRmlAE"></iframe>
        <iframe v-else-if="num===2" width="720" height="405"
                src="https://www.youtube.com/embed/XRw69fOzQv4?autoplay=1&mute=1&controls=0&loop=1&playlist=XRw69fOzQv4"></iframe>
        <iframe v-else-if="num===3" width="720" height="405"
                src="https://www.youtube.com/embed/fNbwEdwYUdY?autoplay=1&mute=1&controls=0&loop=1&playlist=fNbwEdwYUdY"></iframe>
        <iframe v-else-if="num===4" width="720" height="405"
                src="https://www.youtube.com/embed/HOCfCWJyT78?autoplay=1&mute=1&controls=0&loop=1&playlist=HOCfCWJyT78"></iframe>
        <iframe v-else-if="num===5" width="720" height="405"
                src="https://www.youtube.com/embed/dqkfpKJw348?autoplay=1&mute=1&controls=0&loop=1&playlist=dqkfpKJw348"></iframe>
        <iframe v-else-if="num===6" width="720" height="405"
                src="https://www.youtube.com/embed/5YjuF4_ZKVs?autoplay=1&mute=1&controls=0&loop=1&playlist=5YjuF4_ZKVs"></iframe>
        <iframe v-else-if="num===7" width="720" height="405"
                src="https://www.youtube.com/embed/bagb1zxqMTg?autoplay=1&mute=1&controls=0&loop=1&playlist=bagb1zxqMTg"></iframe>
        <iframe v-else-if="num===8" width="720" height="405"
                src="https://www.youtube.com/embed/1JWYe3K4j18?autoplay=1&mute=1&controls=0&loop=1&playlist=1JWYe3K4j18"></iframe>
        <iframe v-else width="720" height="405"
                src="https://www.youtube.com/embed/GvxfWPJaTdA?autoplay=1&mute=1&controls=0&loop=1&playlist=GvxfWPJaTdA"></iframe>

    </div>
</template>

<script>

export default {
    name: "YoutubeView",
    data() {
        return {
            num: Math.ceil(Math.random() * 10),
            // videoId: 'lG0Ys-2d4MA',
            // playerVars: {
            //     autoplay: 1
            // }
        }
    },
    methods: {
        playing() {
            console.log('we are watching!!!')
        }
    },
}
</script>

<style scoped>
.wrapper {
    background: white;
    height: 700px;
}
</style>