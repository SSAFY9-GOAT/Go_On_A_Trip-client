<template>
    <div class="carousel-inner ">
        <div class="carousel-item active">
            <img :src="require(`@/assets/img/logo/main.jpg`)" class="intro d-block w-100 h-25" alt="..."/>
            <div class="carousel-caption d-none d-md-block tongtong pt-5">
                <h1 class="pt-5">
<!--                    <span><img src="${root}/assets/img/goat/goat1.png" width="100px"></span>-->
                    <span>G</span>
                    <span>O</span>
                    <span>A</span>
                    <span>T</span>
<!--                    <span><img src="${root}/assets/img/goat/goat2.png" width="80px"></span>-->
                </h1>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "InfoView",

    created() {

    },
}

</script>


<style scoped>
.carousel-inner{
    background: white;
}
.intro{
    height: 300px;
}

.tongtong {


    /*width: 100%;*/
    height: 100%;
    /*background: #FF7777;*/
    /*padding-top: 100px;*/
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tongtong h1 {
    height: 100px;
}

.tongtong h1 span {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: bounce .3s ease infinite alternate;
    font-family: 'Titan One', cursive;
    font-size: 80px;
    color: #FFF;
    text-shadow: 0 1px 0 #CCC,
    0 2px 0 #CCC,
    0 3px 0 #CCC,
    0 4px 0 #CCC,
    0 5px 0 #CCC,
    0 6px 0 transparent,
    0 7px 0 transparent,
    0 8px 0 transparent,
    0 9px 0 transparent,
    0 10px 10px rgba(0, 0, 0, .4);
}

.tongtong h1 span:nth-child(2) {
    animation-delay: .1s;
}

.tongtong h1 span:nth-child(3) {
    animation-delay: .2s;
}

.tongtong h1 span:nth-child(4) {
    animation-delay: .3s;
}

.tongtong h1 span:nth-child(5) {
    animation-delay: .4s;
}

.tongtong h1 span:nth-child(6) {
    animation-delay: .5s;
}

.tongtong h1 span:nth-child(7) {
    animation-delay: .6s;
}

.tongtong h1 span:nth-child(8) {
    animation-delay: .7s;
}

@keyframes bounce {
    100% {
        top: -20px;
        text-shadow: 0 1px 0 #CCC,
        0 2px 0 #CCC,
        0 3px 0 #CCC,
        0 4px 0 #CCC,
        0 5px 0 #CCC,
        0 6px 0 #CCC,
        0 7px 0 #CCC,
        0 8px 0 #CCC,
        0 9px 0 #CCC,
        0 50px 25px rgba(0, 0, 0, .2);
    }
}
</style>