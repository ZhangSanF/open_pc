<template>
  <div class="trend">
    <div class="nav">
      您当前的位置：
      <router-link tag="a" to="index">首页</router-link>>走势图表
    </div>
    <div class="trendList">
      <dl v-for="(item,index) in lotteryCodes" :key="index" v-show="item.is_trend_chart == 1">
        <dt>
          <a href="javascript:;" @click="goTo(item.code, '/Data/trendChart')">
            <img :src="item.logo" alt>
            {{item.name}}
          </a>
        </dt>
        <dd>
          <a href="javascript:;" v-for="(obj,key) in item.lottery_location_names" :key="key" @click="goTo(item.code, '/Data/trendChart/',key)">{{obj}}</a>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
  }
};
</script>


<style lang="scss" scoped>
.trend {
  width: 100%;
  .trendList {
    margin-top: 10px;
    background-color: #fff;
    width: 100%;
    dl {
      dt {
        width: 180px;
        padding: 20px;
        display: inline-block;
        border-top: 1px solid #f1f1f1;
        a {
          font-size: 16px;
          color: #333;
          &:hover {
            color: #e73f3f;
          }
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
        }
      }
      dd {
        display: inline-block;
        a {
          height: 30px;
          line-height: 30px;
          display: inline-block;
          padding: 0 14px;
          margin-right: 10px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 3px;
          &:hover {
            background: #e73f3f;
            color: #fff;
            border-color: #e73f3f;
          }
        }
      }
    }
  }
}
</style>
