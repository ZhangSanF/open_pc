<template>
  <div class="live _11x5">
    <div id="videobox">
      <div class="content">
        <div class="animate">
          <div class="eleAnimate">
            <div class="loading">
              <div class="loadtxt">LOADING...</div>
            </div>
            <div class="noinfor"></div>
            <div class="bodybg" id="_11x5Bg">
              <img src="../../../assets/video/images/11x5/flash.png">
            </div>
            <div class="animate_content">
              <div class="nameLogo">
                <img :src="curReslut.live_logo" alt>
              </div>
              <div class="codeArr">
                <ul>
                  <li class="code6"></li>
                  <li class="code7"></li>
                  <li class="code8"></li>
                  <li class="code9"></li>
                  <li class="code10"></li>
                  <li>
                    <span>1</span>
                    <span>小</span>
                    <span>单</span>
                  </li>
                </ul>
              </div>
              <div class="drawInfo">
                <div class="nextDraw">
                  <p class="next">
                    下期开奖
                    <span id="drawIssue">2017051748</span>
                  </p>
                  <p>
                    开奖时间
                    <span id="drawTime">00：00：00</span>
                  </p>
                </div>
                <div id="spanbtn" class="soundsOn"></div>
                <audio :src="require('../../../assets/video/sound/11x5Bg.mp3')"  id="audioidB" loop="loop"></audio>
                <audio :src="require('../../../assets/video/sound/11x5Run.mp3')" id="audioidR" loop="loop"></audio>
              </div>
            </div>
            <div class="codeNum">
              <ul>
                <li class="num1"></li>
                <li class="num2"></li>
                <li class="num3"></li>
                <li class="num4"></li>
                <li class="num5"></li>
              </ul>
              <div id="hidNum">
                <span class="num1">1</span>
                <span class="num2">2</span>
                <span class="num3">3</span>
                <span class="num4">4</span>
                <span class="num5">5</span>
              </div>
            </div>
            <div class="manPic">
              <span class="manll"></span>
              <span class="manrl"></span>
            </div>
            <div class="cuttime">
              <div id="hourtxt">19:36:00</div>
              <div id="opening">正在开奖中</div>
            </div>
            <span id="mnKai"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
import "../../../assets/video/css/main.css";
import "../../../assets/video/css/11x5.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import { init, stopVideo, stopAll } from "../../../assets/video/js/11x5.js";

export default {
  name: "l11x5",
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
      this.chengecurLotteryCode(curCode);
      this.getLotteryExpect(curCode);
      this.insertDataWarp(this.openResult);
    });
  },
  destroyed() {
    stopAll();
  },
  methods: {
    ...mapActions(["getLotteryExpect", "chengecurLotteryCode"]),

    insertDataWarp(openResult, isOPen) {
      this.curReslut = openResult;
      if (openResult.code != this.curLotteryCode) return;
      var ticking = isOPen ? 0 : openResult.next_open_seconds;
      if (!openResult.next_open_seconds) return;
      var sum = 0;
      openResult.open_numbers.forEach(item => {
        sum += item;
      });
      // console.log(openResult)
      if (this.firstLoad) {
        stopVideo({
          preDrawCode: openResult.open_numbers,
          sumNum: sum,
          sumBigSmall: openResult.no_screening_parameter[0].data[1],
          sumSingleDouble: openResult.no_screening_parameter[0].data[2],
          drawIssue: openResult.expect,
          drawNextIssue: openResult.next_expect,
          drawTime: openResult.next_open_datetime,
          seconds: isOPen ? 0 : ticking
        });
      } else {
        stopVideo({
          preDrawCode: openResult.open_numbers,
          sumNum: sum,
          sumBigSmall: openResult.no_screening_parameter[0].data[1],
          sumSingleDouble: openResult.no_screening_parameter[0].data[2],
          drawIssue: openResult.expect,
          drawNextIssue: openResult.next_expect,
          drawTime: openResult.next_open_datetime,
          seconds: isOPen ? 0 : ticking
        });
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
._11x5 {
  width: 1200px;
  position: relative;
}
</style>
