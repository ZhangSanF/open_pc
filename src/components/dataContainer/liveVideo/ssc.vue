<template>
  <div class="live sscLive">
    <div class="cqsscAnimate">
      <div class="bodybg">
        <img src="../../../assets/video/images/ssc/bodybg.jpg">
      </div>
      <div class="loading">
        <div class="loadtxt">LOADING...</div>
      </div>
      <div class="content">
        <div class="nameLogo nameLogo_jsssc">
          <img :src="liveLogo" alt width="250px" height="46px">
        </div>
        <div class="coderbox">
          <div class="codeboxl">
            <div class="line tl">
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip bigbg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip smallbg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip bigbg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip smallbg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip bigbg"></span>
              </div>
            </div>
            <div class="line ml" id="numBig">
              <div class="box beforebg">
                <span class="num2"></span>
              </div>
              <div class="box beforebg">
                <span class="num1"></span>
              </div>
              <div class="box beforebg">
                <span class="num0"></span>
              </div>
              <div class="box beforebg">
                <span class="num9"></span>
              </div>
              <div class="box beforebg">
                <span class="num6"></span>
              </div>
            </div>
            <div class="line bl">
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip singlebg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip doublebg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip doublebg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip singlebg"></span>
              </div>
              <div class="box perspectiveView">
                <span class="flip afterbg out"></span>
                <span class="flip doublebg"></span>
              </div>
            </div>
          </div>
          <div class="codeboxr">
            <div class="heiban">
              <div class="line1" id="qishu">
                本期：
                <span class="redfont" id="preDrawIssue">2016054848</span>期
              </div>
              <div class="line1" id="nexttime">
                <span>下期开奖：</span>
                <span class="redfont" id="drawTime">18:30:47</span>
              </div>
              <div class="line1">
                <div class="oping">
                  <div class="cuttimetitle">正在开奖...</div>
                </div>
                <div class="djs">
                  <span class="cuttimetitle" id="cuttime">倒计时：</span>
                  <span class="bluefont"></span>
                </div>
              </div>
            </div>
            <div class="heibanb">
              <div class="bckj">
                <span id="sumNum">16</span>
                <span id="sumSingleDouble">双</span>
                <span id="sumBigSmall">小</span>
                <span id="dragonTiger">虎</span>
              </div>
              <div class="smallnum" id="litNum">
                <div class="box beforebg">
                  <span class="num2"></span>
                </div>
                <div class="box beforebg">
                  <span class="num1"></span>
                </div>
                <div class="box beforebg">
                  <span class="num0"></span>
                </div>
                <div class="box beforebg">
                  <span class="num9"></span>
                </div>
                <div class="box beforebg">
                  <span class="num6"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="menubox">
          <div class="tyrbtn"></div>
          <div id="soundbtn" class="soundbtn"></div>
        </div>
        <div class="disnone">
          <audio autoplay="autoplay" id="bgsound" src></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
import "../../../assets/video/css/main.css";
import "../../../assets/video/css/cpssc.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import { init, sscAnimateEnd,stopAll } from "../../../assets/video/js/ssc.js";

export default {
  name: "sscLive",
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
        sscAnimateEnd({
          preDrawCode: openResult.open_numbers,
          id: "#numBig",
          counttime: ticking,
          preDrawIssue: openResult.next_expect,
          drawTime: openResult.next_open_datetime,
          sumNum: openResult.no_screening_parameter[0].data[0],
          sumSingleDouble: openResult.no_screening_parameter[0].data[2],
          sumBigSmall: openResult.no_screening_parameter[0].data[1],
          dragonTiger: ''
        });
      } else {
       sscAnimateEnd({
          preDrawCode: openResult.open_numbers,
          id: "#numBig",
          counttime: ticking,
          preDrawIssue: openResult.next_expect,
          drawTime: openResult.next_open_datetime,
          sumNum: openResult.open_numbers[0],
          sumSingleDouble: openResult.open_numbers[2],
          sumBigSmall: openResult.open_numbers[1],
          dragonTiger: openResult.open_numbers[3]
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
    ]),
    // 单独拿彩种的logo
    liveLogo() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.live_logo
        }
      } 
    }
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
.sscLive {
  width: 1200px;
  position: relative;
}
</style>
