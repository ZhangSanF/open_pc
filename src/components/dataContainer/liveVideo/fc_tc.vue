<template>
  <div class="tcfc">
    <div
      class="loading"
      style="background: #000;width:100%;height:100%;color:#fff;position:absolute;top:0;left:0;z-index: 99999999; text-align: center;font-size: 20px;padding-top: 30%;"
    >LOADING...</div>

    <div id="videobox">
      <div class="content">
        <div class="animate">
          <div class="cqncAnimate">
            <div class="bodybg">
              <img src="../../../assets/video/images/fctc/fc3D_bg.png">
            </div>
            <div class="loading"></div>
            <div class="position">
              <ul>
                <li class="logo"></li>
                <li class="issue">
                  本期：
                  <span id="issue">838601</span>&nbsp;期
                </li>
                <li class="headCode">
                  <ul>
                    <li id="oneCode">
                      <span>1</span>
                    </li>
                    <li id="twoCode">
                      <span>2</span>
                    </li>
                    <li id="threeCode">
                      <span>3</span>
                    </li>
                  </ul>
                </li>
                <li class="kaiTime">
                  下期开奖：
                  <span id="kaiTime">17:00:00</span>
                </li>
                <li id="soundBth" class="soundsOn"></li>
                <audio :src="require('../../../assets/video/sound/3dbj2.mp3')" id="audioidBg" loop="loop"></audio>
                <audio :src="require('../../../assets/video/sound/3d2.mp3')" id="audioidKai" loop="loop"></audio>
              </ul>
            </div>
            <div class="runCode">
              <ul id="curNumUl">
                <li class="firstBall">
                  <span>1</span>
                </li>
                <li class="secondBall">
                  <span>2</span>
                </li>
                <li class="thirdBall">
                  <span>6</span>
                </li>
              </ul>
              <ul id="runNumUl">
                <li class="parLi firstBallPip">
                  <ul class="leftUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <ul class="rightUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
                <li class="parLi secondBallPip">
                  <ul class="leftUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <ul class="rightUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
                <li class="parLi thirdBallPip">
                  <ul class="leftUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <ul class="rightUl">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="cutTime">
              <div>
                <span id="hourtxt">00:00:00</span>
                <span id="opening">开奖中...</span>
              </div>
            </div>
            <div class="tryKai">
              <span class="jzCheck" style="display: none;">开奖中，禁止模拟！</span>
              <span id="tryBtn"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
import "../../../assets/video/css/fctc.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import { init, stopVid, stopAll } from "../../../assets/video/js/fctc.js";

export default {
  name: "fast3",
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
      if (this.firstLoad) {
        stopVid(
          {
            preDrawCode: openResult.open_numbers,
            sumNum: sum,
            sumBigSmall: sum,
            drawIssue: openResult.expect,
            drawNextIssue: openResult.next_expect,
            drawTime: openResult.next_open_datetime,
            seconds: isOPen ? 0 : ticking
          }
        );
      } else {
        stopVid({
          preDrawCode: openResult.open_numbers,
          sumNum: sum,
          sumBigSmall: sum,
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
.tcfc {
  width: 1200px;
  position: relative;
}
</style>
