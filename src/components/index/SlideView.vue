<template>
    <div class="wrapper" style="transition-timing-function: linear;">
        <swiper
            class="swiper"
            :options="swiperOption">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <div
                class="swiper-pagination"
                slot="pagination"
            >
            </div>
        </swiper>
    </div>

</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
    components:	{
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 5,
                spaceBetween: 20,
                freeMode: true,
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                },
                speed: 5000,
                observe: true,
                observeParents: true,
            },
        }
    },
}
</script>


<style scoped>
.wrapper {
    background: white;

}
.swiper {
    height: 300px;
    width: 100%;

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
    }
}
</style>