<template>
  <div class="liveVideo">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "liveVideo",
};
</script>
<style lang="scss" scoped>
  .liveVideo {
    width: 100%;
    text-align: center;
    overflow: hidden;
    height:100%;
  }
</style>
