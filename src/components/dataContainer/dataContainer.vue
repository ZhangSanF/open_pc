<template>
  <div class="dataContainer pageWidth">
    <div class="openResInfo">
      <!-- :result="curCodeInfo" -->
      <open-res-info :isShowChangLong="false"/>
    </div>
    <ul class="tabBox">
      <router-link to="/Data/historyData" @click="isActiveLive=false;" v-show="curCodeInfo.is_history_data != 0" tag="li">频道首页</router-link>
      <router-link to="/Data/trendChart" @click="isActiveLive=false;" v-show="curCodeInfo.is_trend_chart != 0" tag="li">走势图表</router-link>
      <router-link to="/Data/hotNumber" @click="isActiveLive=false;" v-show="curCodeInfo.is_cold_and_hot_number != 0" tag="li">冷热号码</router-link>
      <router-link :to="activeTab" @click="isActiveLive=false;" v-show="curCodeInfo.is_live !=0" tag="li">开奖直播</router-link>
      <router-link to="/Data/luZhu" @click="isActiveLive=false;" v-show="curCodeInfo.is_road_beads != 0" tag="li">路珠走势</router-link>
      <router-link to="/Data/numberPlan" @click="isActiveLive=false;" v-show="curCodeInfo.is_forecast_rule != 0" tag="li">定位计划</router-link>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import OpenResInfo from "base/openResInfo";
export default {
  name: "dataContainer",
  data() {
    return {
      isActiveLive:false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getLotteryExpectFunc(this.curLotteryCode);      
    });

  },
  methods: {
    ...mapActions(["getLotteryExpect"]),

    // toLive() {
    //   this.isActiveLive=true;
    //   if (this.openResult.code == "cqklsf") {
    //     this.$router.push("/Data/liveVideo/xync/" + this.openResult.code);
    //   } else {
    //     this.$router.push(
    //       "/Data/liveVideo/" + this.openResult.code_type + "/" + this.openResult.code
    //     );
    //   }
    // },

    //  获取开奖信息
    getLotteryExpectFunc(code) {
      this.getLotteryExpect(code);
    }
  },
  computed: {
    ...mapGetters(["curLotteryCode", "openResult", "lotteryCodes"]),

    curCodeInfo() {
      let codes = {};
      this.lotteryCodes.forEach(item => {
        if (item.code == this.curLotteryCode) {
          codes = item;
        }
      });
      return codes;
    },

    activeTab() {
      if(this.openResult.code == "cqklsf") {
        return `/Data/liveVideo/xync/${this.openResult.code}`
      }else {
        return `/Data/liveVideo/${this.openResult.code_type}/${this.openResult.code}`
      }
    }
  },
  components: {
    OpenResInfo
  },
  watch: {
    curLotteryCode: function() {
      this.getLotteryExpectFunc(this.curLotteryCode);
    },
    curCodeInfo() {
      if(this.$route.path == '/Data/numberPlan') {
        if(this.curCodeInfo.is_forecast_rule == 0) {
          this.$router.push('/Data/historyData');
        }
      } else if(this.$route.path == '/Data/luZhu') {
        if(this.curCodeInfo.is_road_beads == 0) {
          this.$router.push('/Data/historyData');
        }
      } else if(this.$route.path == '/Data/hotNumber') {
        if(this.curCodeInfo.is_cold_and_hot_number == 0) {
          this.$router.push('/Data/historyData');
        }
      } else if(this.$route.path == '/Data/trendChart') {
        if(this.curCodeInfo.is_trend_chart == 0) {
          this.$router.push('/Data/historyData');
        }
      } else{
        if(this.curCodeInfo.is_live == 0) {
          this.$router.push('/Data/historyData');
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dataContainer {
  .openResInfo {
    background-color: #fff;
    margin-top: 15px;
  }
  .tabBox {
    border-top: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    margin-bottom: 15px;
    li {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      text-align: center;
      color: #444;
      cursor: pointer;
      // &:hover,&.active {
      //   color: #e73f3f;
      // }
      &:hover,
      &.router-link-active {
        color: #e73f3f;
      }
    }
  }
}
</style>
