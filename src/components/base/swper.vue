<template>
    <swiper class="swper" :options="swiperOption">
        <slot></slot>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { swiper } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "swper",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.swper {
  flex: 1;
}
</style>
