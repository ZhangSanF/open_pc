<template>
  <div class="forecastOverview">
    <v-header :isShowCodeList="false"></v-header>
    <div class="banner">
      <img src="../assets/images/planbanner.png" alt>
    </div>
    <div class="codeList">
      <div class="content pageWidth">
        <div class="navContainer">
          <ul class="nav">
            <li
              v-for="(item, index) of ruleLottery"
              :class="{'active':item.code == isForecastRuleCode}"
              @click="changeLotteryCode(item.code)"
              :key="index"
              v-show="index < 10"
            >{{item.name}}</li>
            <li
              :class="['gamesHall', {'navHover': mouseonNavGameshall || mouseonGamesContainer}]"
              @mousemove="mouseonNavGameshall = true"
              @mouseout="mouseonNavGameshall = false"
              v-show="ruleLottery.length > 10"
            >
              更多彩种
              <i class="fas fa-bars"></i>
            </li>
          </ul>
          <div
            class="gamesContainer"
            v-show="mouseonNavGameshall || mouseonGamesContainer"
            @mousemove="mouseonGamesContainer = true"
            @mouseout="mouseonGamesContainer = false"
          >
            <div class="gamesCol" v-for="(item, index) of ruleLottery" v-show="index > 9" :key="index">
              <ul class="games">
                <li
                  class="game"
                  :class="{'active':item.code == isForecastRuleCode}"
                  :key="index"
                  @click="changeLotteryCode(item.code)"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tebleBox pageWidth">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <th colspan="11">
            <h2>{{ruleName}}计划</h2>
          </th>
        </tr>
        <tr>
          <th>专家</th>
          <th v-for="(item, index) in ruleLocationNames" :key="index">{{item}}</th>
        </tr>
        <tr v-if="imgLoaderShow">
          <td colspan="11">
            <img src="../assets/images/Ellipsis-1s-100px.gif" alt="">
          </td>
        </tr>
        <tr v-for="(item,index) in forecastOverviewData.expert" :key="index">
          <td>{{item.name}}</td>
          <td v-for="(location, _key) in ruleLocationNames" :key="_key">
            <span @click="goTo(item.id, _key+1, obj, '/Data/numberPlan')" :title="'查看'+obj+'码计划'" v-for="(obj, key) in item.forecast_quantity" :key="key">{{obj}}码&nbsp;&nbsp;</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VNav from "./header/VNav";
import VHeader from "./header/VHeader";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "forecastOverview",
  components: { VHeader, VNav },
  data() {
    return {
      forecastOverviewData: [],
      mouseonNavGameshall: false,
      mouseonGamesContainer: false,
    };
  },
  created(){
    this.getforecastOverviewFunc(this.curLotteryCode)
  },
  methods: {
    ...mapActions(["getforecastOverview", "chengecurLotteryCode"]),

    goTo(expertId, location, forecastQuantity, path){
      this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity});
      this.$router.push({ path: path});
    },

    getforecastOverviewFunc(code) {
      this.forecastOverviewData = []
      this.getforecastOverview(code).then(res => {
        if (res.code == 200) {
          this.forecastOverviewData = res.data;
          this.$store.commit('IMG_LOADING', {name: 'preciseNumberPlan', show: false});
        }
      });
    },

    // 切换彩种
    changeLotteryCode(code) {
      this.chengecurLotteryCode(code);
    }
  },
  computed:{
    ...mapGetters(['curLotteryCode', 'lotteryCodes', 'imgLoading']),

    // 判断进入页面时当前彩种是否支持计划，不支持返回第一个 code
    isForecastRuleCode() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          if(item.is_forecast_rule == 0) {
            this.chengecurLotteryCode(this.ruleLottery[0].code);
            return this.ruleLottery[0].code
          }else {
            return this.curLotteryCode
          }
        }
      }
    },
    // 加载 loading
    imgLoaderShow() {
      for(let item of this.imgLoading) {
        if(item.name == 'preciseNumberPlan') {
          return item.show
        }
      }
    },
    // 拿 lotteryCodes 所有开启计划的彩种列表
    ruleLottery() {
      let arr = []
      for(let item of this.lotteryCodes) {
        if(item.is_forecast_rule == 1) {
          arr.push(item)
        }
      }
      return arr
    },
    // 计划 name
    ruleName() {
      for(let item of this.ruleLottery) {
        if(item.code == this.curLotteryCode) {
          return item.name
        }
      }
    },
    // 计划名次
    ruleLocationNames() {
      for(let item of this.ruleLottery) {
        if(item.code == this.curLotteryCode) {
          return item.lottery_location_names
        }
      }
    }
  },
  watch:{
    curLotteryCode() {
      this.getforecastOverviewFunc(this.curLotteryCode);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-img{
    text-align: center
  }
.forecastOverview {
  .banner {
    background-color: #393d49;
    text-align: center;
  }
  .codeList {
    background-color: #fff;
    .navContainer{width: 100%;height: 40px;position: relative;
      .nav{height: 100%;display: flex;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 14px;
          flex: 1;
          cursor: pointer;
          &:hover,
          &.active {
            color: #e73f3f;
            background-color: #fff;
          }
          svg {
            margin-left: 5px;
          }
        }
      }
    }
  }
  .gamesHall {
    margin-bottom: 0;
  }
  .navHover,
  .router-link-active {
    color: #e73f3f !important;
    background-color: #fff;
  }
  .gamesContainer {
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 9;
    width: 130px;
    box-sizing: border-box;
    min-height: 200px;
    background-color: #fff;
    border: 1px solid #eee;
    border-top: none;
    box-shadow: 10px 9px 13px -11px #1f1f1f;
    .gamesCol {
      text-align: center;
      border-bottom: 1px solid #efefef;
      vertical-align: middle;
      &:nth-last-of-type(1) {
        border: none;
      }
      .title {
        display: inline-block;
        width: 10%;
        font-weight: 600;
        color: #555;
        font-size: 15px;
      }
      .games {
        display: inline-block;
        text-align: center;
        .game {
          display: inline-block;
          margin: 0 10px 0 10px;
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
          color: #555;
          &:hover,
          &.active {
            background: #e73f3f;
            color: #fff !important;
          }
        }
      }
    }
  }
  .tebleBox {
    background: #fff;
    margin: 10px auto;
    padding: 15px;
    overflow: hidden;
    min-height: 200px;
    .all-nodata{font-size: 20px;color: #666;text-align: center;line-height: 45px;}
    table {
      tr {
        th {
          background-color: #f9f9f9;
          font-size: 13px;
          color: #666;
          font-weight: 400;
          h2 {
            font-weight: 400;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
          }
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          line-height: 36px;
          text-align: center;
        }
        td{
          span{
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

