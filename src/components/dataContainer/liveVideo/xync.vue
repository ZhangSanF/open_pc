<template>
  <div class="xync">
    <div id="videobox">
      <div class="content">
        <div class="animate">
          <div class="cqncAnimate">
            <div class="bodybg">
              <img src="../../../assets/video/images/xync/cqnc_video.jpg">
            </div>
            <div class="loading">
              <div class="loadtxt">LOADING...</div>
            </div>
            <div class="position">
              <div class="current_code">
                <span>
                  第
                  <span class="codeNow"></span>期
                </span>
              </div>
              <div class="kaiNum">
                <ul>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                  <li class></li>
                </ul>
                <span class="soundsIcon on"></span>
              </div>
            </div>
            <div class="numCircle">
              <ul class="circle_t">
                <li class="roll_1"></li>
                <li class="roll_2"></li>
                <li class="roll_3"></li>
                <li class="roll_4"></li>
                <li class="roll_5"></li>
                <li class="roll_6"></li>
                <li class="roll_7"></li>
              </ul>
              <ul class="circle_r">
                <li class="roll_8"></li>
                <li class="roll_9"></li>
                <li class="roll_10"></li>
              </ul>
              <ul class="circle_d">
                <li class="roll_11"></li>
                <li class="roll_12"></li>
                <li class="roll_13"></li>
                <li class="roll_14"></li>
                <li class="roll_15"></li>
                <li class="roll_16"></li>
                <li class="roll_17"></li>
              </ul>
              <ul class="circle_l">
                <li class="roll_18"></li>
                <li class="roll_19"></li>
                <li class="roll_20"></li>
              </ul>
            </div>
            <div class="detail">
              <div class="detail_l">
                <div class="nowIssue">
                  本期
                  <span></span>
                </div>
                <ul class="numlist">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <div class="sum">
                  和值&nbsp;:&nbsp;
                  <span></span>
                </div>
                <div class="longhu">
                  <span class="danxu"></span>
                  <span class="daxiao"></span>
                  <span class="weixiao"></span>
                  <!--<span>虎</span>-->
                </div>
              </div>
              <div class="detail_r">
                <span class="cutTime">开奖倒计时</span>
                <span class="timeing">00：00：00</span>
                <span class="startBtn">试试手气</span>
                <p id="mnkai_text">即将开奖，禁止模拟</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: none;">
      <audio id="bgsound" loop="loop">
        <source :src="require('../../../assets/video/sound/bg.mp3')" type="audio/mpeg" loop="loop">
      </audio>
      <audio id="kaisound" loop="loop">
        <source :src="require('../../../assets/video/sound/kaijiin.mp3')" type="audio/mpeg">
      </audio>
      <audio id="emptsound" loop="loop">
        <source :src="require('../../../assets/video/sound/empt.mp3')" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
import "../../../assets/video/css/cqnc_video.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import { init, statusFun,stopanimate,stopAll } from "../../../assets/video/js/cqnc.js";

export default {
  name: "xync",
  data() {
    return {
      firstLoad: true,
      curReslut: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      init();
      $(".loading").hide();
      this.firstLoad = true;
      let curCode = this.$route.params.code;
      this.chengecurLotteryCode(curCode)
      this.getLotteryExpect(curCode);
      this.insertDataWarp(this.openResult);
    });
  },
  destroyed(){
    stopAll();
  },
  methods: {
    ...mapActions(["getLotteryExpect","chengecurLotteryCode"]),

    insertDataWarp(openResult, isOPen) {
      if (openResult.code != this.curLotteryCode) return;
      var ticking = isOPen ? 0 : openResult.next_open_seconds;
      if (!openResult.next_open_seconds) return;
      if (this.firstLoad) {
        statusFun(
          openResult.expect,
          openResult.open_numbers,
          openResult.next_open_seconds,
          true
        );
      } else {
        setTimeout(function() {
          stopanimate(openResult.open_numbers, ticking);
        }, 1000);
      }
    }
  },

  computed: {
    ...mapGetters([
      "curLotteryCode",
      "openResult",
      "lotteryCodes",
      "socketOpenResult"
    ])
  },
  watch: {
    openResult() {
      this.firstLoad = true;
      this.insertDataWarp(this.openResult);
    },

    socketOpenResult() {
      let isOPen =
        parseInt(this.openResult.expect) -
          parseInt(this.socketOpenResult.expect) >=
          2 &&
        parseInt(this.openResult.expect) -
          parseInt(this.socketOpenResult.expect) <=
          3;
      if (this.socketOpenResult.code == this.curLotteryCode) {
        this.insertDataWarp(this.socketOpenResult, isOPen);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.xync {
  width: 1200px;
  position: relative;
}
</style>
