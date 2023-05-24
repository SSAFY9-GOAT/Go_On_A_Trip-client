<template>
  <div>
    <div>
      <div class="container">
        <form class="row">
          <!--                <form class="row">-->
          <div class="col-3">
            <select class="form-select" aria-label="sidoCode" id="sidoCode" v-model="sidoCode"
                    v-on:change="getGugun">
              <option v-for="sido in sidos" :key="sido.code" :value="sido.code">{{ sido.name }}</option>
            </select>
          </div>
          <div class="col-3">
            <select class="form-select" aria-label="gugunCode" id="gugunCode" v-model="gugunCode">
              <option v-for="gugun in guguns" :key="gugun.code" :value="gugun.code">{{ gugun.name }}
              </option>
            </select>
          </div>
          <div class="col-3">
            <select class="form-select" aria-label="contentTypeId" id="contentTypeId"
                    v-model="contentTypeId">
              <option value="12">관광지</option>
              <option value="14">문화시설</option>
              <option value="15">축제공연행사</option>
              <option value="28">레포츠</option>
              <option value="32">숙박</option>
              <option value="38">쇼핑</option>
              <option value="39">음식점</option>
            </select>
          </div>
          <div class="col-3">
            <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
                @click="clickGetAttraction">
              결과 열기
            </button>
          </div>
          <!-- getTourList() -->
        </form>
      </div>
      <!-- start map -->
      <AttractionMap ref="map" @click="toggleOffcanvas"></AttractionMap>
      <!-- end map -->
      <!-- start right bar -->

      <div
          class="offcanvas offcanvas-start"
          :class="{'show': showOffcanvas}"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">검색 결과</h5>
          <button
              type="button"
              class="btn-close"
              @click="toggleOffcanvas"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="album py-5">
            <div class="container">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-1 g-3" id="tour-list">
                <div class="col">
                  <div v-for="attraction in attractions" :key="attraction.id" class="card shadow-sm mb-2">
                      <img v-if='attraction.firstImage === ""' :src="require(`@/assets/img/no-img.jpg`)" alt=""/>
                      <img v-else :src=attraction.firstImage alt=""/>
                    <div class="card-body">
                      <h5 class="card-title">{{ attraction.title }}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">{{ attraction.addr1 }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttractionMap from "@/components/attraction/AttractionMap.vue";
import axios from "axios";

export default {
  name: "AttractionDisplay",
  components: {
    AttractionMap,
  },
  data() {
    return {
      sidos: [],
      guguns: [],
      sidoCode: 1,
      gugunCode: 1,
      contentTypeId: 12,
      attractions: [],
      showOffcanvas: false,
    };
  },
  created() {
    const SIDO_URL = `http://localhost:8080/api/attraction/sido`;
    axios.get(SIDO_URL)
        .then(response => {
          this.sidos = response.data;
        })
    this.getGugun();
  },
  mounted() {
    this.getAttraction();
  },
  methods: {
    toggleOffcanvas() {
      this.showOffcanvas = false;
    },
    getGugun() {
      let sidoCode = this.sidoCode;
      this.gugunCode = 1;
      const GUGUN_URL = `http://localhost:8080/api/attraction/gugun/${sidoCode}`;
      axios.get(GUGUN_URL)
          .then(response => {
            this.guguns = response.data;
          })
    },
    clickGetAttraction() {
      this.getAttraction();
      this.$refs.map.refreshMap(this.attractions);
      if(!this.showOffcanvas)
        this.showOffcanvas = true;

    },
    getAttraction() {
      const SEARCH_URL = `http://localhost:8080/api/attraction/search`;
      axios({
        url: SEARCH_URL,
        method: 'GET',
        params: {
          sidoCode: this.sidoCode,
          gugunCode: this.gugunCode,
          contentTypeId: this.contentTypeId,
        }
      }).then((res) => {
        this.attractions = res.data;
      })

    }
  }
}

</script>

<style scoped>

</style>