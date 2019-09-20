<template>
  <div class="hot-lottery">
      <hotLotteryCard 
        v-for="(item,index) in lotteryCodes" 
        :key="index" 
        v-show="curCodeType == 'hot' ? item.is_hot == 1: curCodeType == item.code_type" 
        :result="item">
      </hotLotteryCard>
  </div>
</template>

<script>
import hotLotteryCard from "./hotLotteryCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "hotLottery",
  components: { hotLotteryCard },
  data() {
    return {
      curCodeType: "hot",
    };
  },
  computed: {
    ...mapGetters(["lotteryCodes"])
  },
  methods: {

  },
  mounted() {

  }
};
</script>


<style lang="scss" scoped>
  .hot-lottery{display: flex;flex-wrap: wrap;background: #fff}
</style>
