<template>
  <div class="live">
    <div class="nav">
      您当前的位置：
      <router-link tag="a" to="index">首页</router-link>>开奖直播
    </div>
    <div class="trendList">
      <live-box :result="item" v-for="(item,index) in lotteryCodes" :key="index"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import liveBox from "../base/liveBox";

export default {
  name: "trend",
  methods: {
    ...mapActions(["chengecurLotteryCode"]),
    goTo(code, path,num) {
      this.chengecurLotteryCode(code);
      this.$router.push({path: path,query:{id:num}});
    }
  },
  computed: {
    ...mapGetters(["lotteryCodes"])
  },
  components:{
    liveBox
  }
};
</script>


<style lang="scss" scoped>
.live {
  width: 100%;
  .trendList{
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
