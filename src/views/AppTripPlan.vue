<template>
  <div>
      <router-view @write="write"></router-view>
  </div>
</template>

<script>
export default {
    name: "AppTripPlan",
    data() {
        return {
            tripplan: null,
        };
    },
    methods: {
        // write(tripplan) {
        // }
    },
}
</script>

<style scoped>

</style>