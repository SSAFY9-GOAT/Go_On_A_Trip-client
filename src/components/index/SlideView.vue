<template>
  <swiper
      class="swiper"
      :options="swiperOption">
    <swiper-slide
        v-for="hotplace in hotPlaceList" :key="hotplace.hotPlaceId">
      <div class="card">
        <div class="img" style="background-size:cover; object-fit: cover; height: 100%; width: 100%;"
             :style="{backgroundImage: 'url(' + require(`@/assets/img/userUpload/${hotplace.storeFileName}`) + ')'}">

                </div>
                <div class="textBox">
                    <p class="text head">{{ hotplace.name }}</p>
                    <p class="text price">{{ hotplace.desc }}</p>
                </div>
            </div>
        </swiper-slide>
    </swiper>

</template>

<script>
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import axios from "axios";

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            hotPlaceList: [],
            name: "",
            sortCondition: 1,
            swiperOption: {
                slidesPerView: 7,
                spaceBetween: 20,
                freeMode: true,
                loop: true,
                autoplay: {
                    delay: 8,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                },
                speed: 6000,
                observe: true,
                observeParents: true,
            },
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            const API_URL = `http://localhost:8080/hotplaces`;
            console.log("[핫플레이스] 리스트 요청")
            axios({
                url: API_URL,
                method: "get",
                params: {
                    name: this.name,
                    sortCondition: parseInt(this.sortCondition),
                },
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Headers": 'Authorization',
                    Authorization: sessionStorage.getItem("access-token"),
                }
            }).then((res) => {
                console.log("[핫플레이스] 리스트 정보 응답={}", res);
                this.hotPlaceList = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>


<style scoped>

.swiper {
    height: 300px;
    width: 100%;
    background: white;

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
    }
}

.card {
    width: 300px;
    height: 285px;
    background: whitesmoke;
    border: 0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.2s ease-in-out;
}

.img {
    border-radius: 10px;
    position: absolute;
    transition: 0.2s ease-in-out;
    z-index: 1;
}

.textBox {
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: 0.2s ease-in-out;
    z-index: 2;
}

.textBox > .text {
    font-weight: bold;
}

.textBox > .head {
    font-size: 20px;
}

.textBox > .price {
  font-size: 17px;
}

.textBox > span {
  font-size: 12px;
  color: lightgrey;
}

.card:hover > .textBox {
  opacity: 1;
}

.card:hover > .img {
  filter: blur(7px);
  animation: anim 3s infinite;
}

@keyframes anim {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}

.card:hover {
  transform: scale(1.04) rotate(-1deg);
}


</style>