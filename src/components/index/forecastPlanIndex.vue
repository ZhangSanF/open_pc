<template>
  <div class="forecastPlanIndex">
    <ul v-if="Object.keys(disposeCodesData).length !== 0">
      <li
        v-for="(item,index) in forecastPlanIndexData"
        @click="goTo(item.code, item.expert_id, item.location, item.forecast_quantity)"
        :key="index"
        v-if="disposeCodesData[item.code].is_forecast_rule !== 0"
      >
        <div>
          <img src="../../assets/images/2_03.png" width="60" height="60">
          <i>
            胜率 :
            <b class="col6">{{(item.win_rate*100).toFixed(2)}}%</b>
          </i>
        </div>
        <div>
          <img src="../../assets/images/3_05.png" width="60" height="60">
          <i>
            盈利 :
            <b class="col5">{{Math.round(item.profit)}}</b>
          </i>
        </div>
        <div class="plan_cont plan_three">
          <h6>{{item.name}}计划</h6>
          <p>提供5/6/7/8码单</p>
          <p>期计划跟投赢面大</p>
          <h6>
            <b class="col6">{{item.last_count}}</b>期 中
            <b class="col6">{{item.result_sum}}</b>期
          </h6>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "forecastPlanIndex",
  data() {
    return {
      forecastPlanIndexData: []
    };
  },
  created() {
    this.getForecastPlanIndexFunc();
  },
  methods: {
    ...mapActions(["getForecastPlanIndex","chengecurLotteryCode"]),

    goTo(code, expertId, location, forecastQuantity) {
      this.chengecurLotteryCode(code) 
      this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity});
      this.$router.push({name: 'numberPlan'})   
    },

    getForecastPlanIndexFunc() {
      this.getForecastPlanIndex().then(res => {
        if (res.code == 200) {
          this.forecastPlanIndexData = res.data
        }
      });
    }
  },
  computed: {
    ...mapGetters(['disposeCodesData'])
  }
};
</script>

<style lang="scss" scoped>
.forecastPlanIndex {
  cursor: pointer;
  border-top: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  // margin: 15px 0;
  margin-bottom: 15px;
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.3%;
      padding: 15px;
      display: flex;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6;
      &:nth-child(3n + 2) {
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
      div {
        text-align: center;
        img {
          display: block;
          height: auto;
          max-width: 100%;
          margin: 0 22px 10px;
        }
        i {
          font-style: normal;
        }
        h6 {
          margin-bottom: 5px;
          height: 20px;
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: normal;
        }
        p {
          color: #999;
          font-size: 12px;
          line-height: 22px;
        }
        &:nth-of-type(1) {
          border-right: 1px solid #e6e6e6;
          b {
            color: #f02f22;
          }
        }
        &:nth-of-type(2) {
          b {
            color: #50c668;
          }
        }
        &:nth-of-type(3) {
          b {
            color: #f02f22;
          }
        }
      }
    }
  }
}
</style>

