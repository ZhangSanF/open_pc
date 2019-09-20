<template>
  <div class="searchBoxPop" v-show="isShowRank">
    <div class="searchBox">
      <div class="title">
        <span>搜索计划</span>
        <span class="close" @click="closeRank">╳</span>
      </div>
      <div class="content">
        <p>
          选择游戏：
          <select name="select" id="ssgamecode" v-model="curCode">
            <option
              :value="item.code"
              v-for="(item,index) in lotteryCodes"
              v-show="item.is_forecast_rule == 1"
              :key="index"
              :selected="curLotteryCode == item.code?'selected':''"
            >{{item.name}}</option>
          </select>&nbsp;&nbsp;选择码数：
          <select name="select" id="ssma" v-model="curQuantity">
            <option
              :value="item"
              v-for="(item,index) in ForecastQuantityList"
              :key="index"
            >{{item}}码</option>
          </select>
          <a id="ssbtn" href="javascript:void(0)">立即搜索</a>
        </p>
        <div class="list">
          <div class="plan-tab-main-index">
            <ul class="dlbg">
              <li>专家名称</li>
              <li>车道</li>
              <li>码数</li>
              <li>成绩</li>
              <li>胜率</li>
              <li>盈利</li>
              <li>查看</li>
            </ul>
            <div class="plan-table-content">
              <ul class="item" v-for="(item,index) in getCurList(list)" :key="index" @click="goTo(item.expert_id, item.location_key, item.forecast_quantity)">
                <li>{{item.name}}</li>
                <li>{{item.location}}</li>
                <li>{{item.forecast_quantity}}码</li>
                <li>{{item.last_sum}}中{{item.result_sum}}</li>
                <li style="color:red">{{(item.result*100).toFixed(2)}}%</li>
                <li style="color:green">{{item.profit}}元</li>
                <li>查看</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ForecastRanking",
  props: ["planData", "curForecastQuantity", "isShowRank"],
  data() {
    return {
      curCode: this.curLotteryCode,
      curQuantity: 0,
      list: [],
      ForecastQuantityList: []
    };
  },
  methods: {
    ...mapActions(["getForecastRanking", "chengecurLotteryCode"]),

    goTo(expertId, location, forecastQuantity) {
      this.chengecurLotteryCode(this.curCode)
      this.closeRank();
      this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity})
    },

    getCurList(list) {
      let obj = [];
      list && list.forEach(item => {
        if (item.name == this.curQuantity) {
          obj = item.list;
        }
      });
      return obj;
    },

    closeRank() {
      this.$emit("closeRank", false);
    },

    getForecastRankingFunc(code) {
      this.ForecastQuantityList = []
      this.getForecastRanking(code).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          res.data.forEach((item) => {
            this.ForecastQuantityList.push(item.forecast_quantity)
          })
          this.changecurQuantity()
        }
      });
    },

    changecurQuantity() {
      let flag = this.ForecastQuantityList.includes(this.curQuantity)
      if(flag == false) {
        this.curQuantity = this.ForecastQuantityList[0]
      }
    }
  },
  created() {
    
    this.curCode = this.curLotteryCode;
    this.getForecastRankingFunc(this.curCode);
  },
  computed: {
    ...mapGetters(["lotteryCodes", "curLotteryCode"])
  },
  watch: {
    curQuantity(){
      this.getCurList(this.list);
    },
    curCode() {
      this.getForecastRankingFunc(this.curCode);
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
.searchBoxPop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .searchBox {
    width: 600px;
    height: 450px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    .title {
      height: 40px;
      background-color: #444;
      padding: 0 20px;
      overflow: hidden;
      display: flex;
      font-size: 14px;
      color: #fff;
      justify-content: space-between;
      align-items: center;
      .close {
        padding: 10px 20px;
        box-sizing: border-box;
        user-select: none;
        cursor: pointer;
      }
    }
    .content {
      padding: 10px;
      p {
        select {
          border: 1px solid #ddd;
          height: 30px;
          line-height: 30px;
          border-radius: 2px;
        }
        #ssbtn {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          text-align: center;
          padding: 0 6px 0 6px;
          border-radius: 3px;
          font-size: 14px;
          background: #e73f3f;
          color: #fff;
        }
      }
      .plan-tab-main-index {
        margin-top: 4px;
        ul {
          background: #fbfbfb;
          width: 100%;
          display: flex;
          li {
            height: 32px;
            line-height: 32px;
            float: left;
            display: block;
            text-align: center;
            font-size: 13px;
            color: #777;
            overflow: hidden;
            flex: 1;
          }
        }
        .plan-table-content {
          .item{
            cursor: pointer;
          }
          a {
            display: block;
            background: #fff;
            cursor: pointer;
            &:link {
              color: #333;
              text-decoration: none;
            }
            ul { 
              overflow: hidden;
              clear: both;
            }
          }
        }
      }
    }
  }
}
</style>
