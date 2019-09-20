<template>
  <div class="very_happy">
    <div class="video_box">
      <div class="center_box">
        <div>
          <ul id="rethtml">
          </ul>
        </div>
        <p class="ThisIssue">
          当前期 :
          <span id="thisIss"></span>
        </p>
        <div class="opening opentyle" style="display: none;">开奖中...</div>
        <div class="Time_box">00:00:00</div>
      </div>
      <div class="right_box">
        <div class="btnBox">
          <button id="btnsound"></button>
        </div>
        <div class="Tibox">
          <p>
            下期：
            <span id="nextIssue"></span>
          </p>
          <p>
            开奖：
            <span id="nextOpTime"></span>
          </p>
        </div>
      </div>
      <div class="middle_box">
        <ul class="move_ballUl">
          <li class="ball light_skyblue 1">01</li>
          <li class="ball light_skyblue 2">02</li>
          <li class="ball light_skyblue 3">03</li>
          <li class="ball light_skyblue 4">04</li>
          <li class="ball light_skyblue 5">05</li>
          <li class="ball light_skyblue 6">06</li>
          <li class="ball light_skyblue 7">07</li>
          <li class="ball light_skyblue 8">08</li>
          <li class="ball light_skyblue 9">09</li>
          <li class="ball light_skyblue 10">10</li>
          <li class="ball light_skyblue 11">11</li>
          <li class="ball light_skyblue 12">12</li>
          <li class="ball light_skyblue 13">13</li>
          <li class="ball light_skyblue 14">14</li>
          <li class="ball light_skyblue 15">15</li>
          <li class="ball light_skyblue 16">16</li>
          <li class="ball light_skyblue 17">17</li>
          <li class="ball light_skyblue 18">18</li>
          <li class="ball red 19">19</li>
          <li class="ball red 20">20</li>
        </ul>
      </div>
      <div class="bottom_box">
        <button class="kaiBtn"></button>
        <div class="result_box">
          <ul>
          </ul>
        </div>
      </div>
    </div>
    <div class="soundbox">
      <audio :src="require('../../../assets/video/sound/klsf-1.mp3')" id="bgsound" loop="loop"></audio>
      <audio :src="require('../../../assets/video/sound/klsf-2.mp3')" id="kaisound" loop="loop"></audio>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
// import "../../../assets/video/css/main.css";
import "../../../assets/video/css/gdklsf.css";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import {
  fillHtml,
  init,
  moveBall,
  Trueresult,
  clearTime
} from "../../../assets/video/js/gdklsf.js";

export default {
  name: "very_happy",
  data() {
    return {
      firstLoad: true,
      curReslut: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      init();
      this.firstLoad = true;
      let curCode = this.$route.params.code;
      this.chengecurLotteryCode(curCode)
      this.getLotteryExpect(curCode);
      this.insertDataWarp(this.openResult);
    });
  },
  destroyed(){
    clearTime();
  },
  methods: {
    ...mapActions(["getLotteryExpect","chengecurLotteryCode"]),

    insertDataWarp(openResult, isOPen) {
      if(openResult.code != this.curLotteryCode)  return;
      var ticking = isOPen ? 0 : openResult.next_open_seconds;
      if (!openResult.next_open_seconds) return;
      var time = openResult.next_open_seconds;
      if (this.firstLoad) {
        if (isOPen) {
          console.log("moveBall");
          moveBall();
        } else {
          Trueresult(openResult.open_numbers);
          fillHtml(
            openResult.expect,
            openResult.next_expect,
            openResult.next_open_datetime,
            openResult.next_open_seconds,
            openResult.open_numbers
          );
        }
      } else {
        Trueresult(openResult.open_numbers);
        fillHtml(
          openResult.expect,
          openResult.next_expect,
          openResult.next_open_datetime,
          openResult.next_open_seconds,
          openResult.open_numbers
        );
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
.very_happy {
  width: 1200px;
  position: relative;
}
</style>
