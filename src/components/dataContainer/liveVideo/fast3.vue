<template>
  <div class="fast3">
    <div id="videobox">
      <div class="content">
        <div class="animate">
          <div class="kuai3Animate">
            <div class="bodybg" id="bodybgK3">
              <img src="../../../assets/video/images/fast3/bj.jpg">
            </div>
            <div class="loading">
              <div class="loadtxt">LOADING...</div>
            </div>
            <div class="animate_content">
              <div class="nameLogo">
                <img :src="curReslut.live_logo" alt>
              </div>
            </div>
            <div class="position">
              <div class="middle_div">
                <span class="benqi">
                  本期&nbsp;:&nbsp;
                  <span id="nowDraw" class="nowDraw">00000</span>
                </span>

                <ul id="codetop">
                  <li id="num1" class="hmlist">3</li>
                  <li id="num2" class="hmlist">1</li>
                  <li id="num3" class="hmlist">6</li>
                  <li id="sumNum" class="hmlist noright">2</li>
                  <li id="sumBigSmall" class="bigOsmall">大</li>
                </ul>
                <span class="addIcon1"></span>
                <span class="addIcon2"></span>
                <span class="equalIcon"></span>
              </div>
            </div>
            <div class="currentDraw">
              <div class="dl">
                <span class="nextDraw">
                  <span class="dot"></span>
                  <span>下期&nbsp;:</span>
                  <span id="drawIssue" class="draw">000000000</span>
                </span>
                <span class="kai">
                  <span class="dot"></span>
                  <span>开奖：</span>
                  <span id="drawTime" class="kaitime"></span>
                </span>
              </div>
              <div class="dr" id="soundBtn">
                <span id="spanbtn" class="sounds"></span>
              </div>
            </div>
            <div class="timeBox">
              <span class="linetime">
                <span id="timetitle">倒计时</span>
              </span>
              <div>
                <span id="hourtxt" class="hourtxt">00:00:00</span>
                <span id="opening" class="hourtxt opening">
                  <img src="../../../assets/video/images/fast3/progress.gif">
                </span>
                <audio class="dispnode" id="audioidB" loop="loop" :src="require('../../../assets/video/sound/k3Bg.mp3')"></audio>
                <audio class="dispnode" id="audioidR" loop="loop" :src="require('../../../assets/video/sound/k3run.mp3')"></audio>
              </div>
              <ul class="linelist">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="bones">
              <ul id="code">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="kaimodule">
              <span class="noinfor">即将开奖，禁止模拟</span>
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
import "../../../assets/video/css/kuai3.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import {
  init,
  stopVideo,
  stopAll
} from "../../../assets/video/js/fast3.js";

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
			openResult.open_numbers.forEach(item=>{
				sum+=item;
			})
      if (this.firstLoad) {
        stopVideo({
          preDrawCode: openResult.open_numbers,
          sumNum: sum,
          sumBigSmall: sum,
          drawIssue: openResult.expect,
          drawNextIssue: openResult.next_expect,
          drawTime: openResult.next_open_datetime,
          seconds: isOPen ? 0 : ticking
        });
      } else {
        stopVideo({
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
.fast3 {
  width: 1200px;
  position: relative;
}
</style>
