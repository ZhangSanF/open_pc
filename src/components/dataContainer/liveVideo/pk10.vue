<template>
  <div id="layaContainer" class="live pk10Live">
    <div id="preloader" style="display: none;">
      <div id="status">&nbsp;</div>
    </div>
    <div class="container">
      <div class="header" :class="curLotteryCode.indexOf('ft')!=-1?'ft':'sc'">
        <div class="logo">
          <img :src="curReslut.live_logo" width="309" height="59" alt>
        </div>
        <div class="position">
          <div class="positm" id="pos1"></div>
          <div class="positm" id="pos2"></div>
          <div class="positm" id="pos3"></div>
          <div class="positm" id="pos4"></div>
          <div class="positm" id="pos5"></div>
          <div class="positm" id="pos6"></div>
          <div class="positm" id="pos7"></div>
          <div class="positm" id="pos8"></div>
          <div class="positm" id="pos9"></div>
          <div class="positm" id="pos10"></div>
        </div>
        <div class="currentdraw">
          期数 :
          <span id="currentdrawid">00000000</span>
          <span id="closeSound"></span>
        </div>
      </div>
      <div class="scenary page1">
        <div class="scenaryitm" id="scenaryitm">
          <img src="../../../assets/video/images/ft/scenery.jpg" v-if="curLotteryCode.indexOf('ft')!=-1" width="2668" height="119" alt>
          <img src="../../../assets/video/images/sc/scenery.jpg" v-else width="2668" height="119" alt>
        </div>
      </div>
      <div class="road page1">
        <div class="roadani">
          <div class="roaditm" id="roaditm">
            <img src="../../../assets/video/images/ft/road.jpg" v-if="curLotteryCode.indexOf('ft')!=-1" width="2660" height="520" alt>
            <img src="../../../assets/video/images/sc/road.jpg" v-else width="2660" height="520" alt>
          </div>
        </div>
        <div class="roadstart" id="roadstart" :class="{'ft':curLotteryCode.indexOf('ft')!=-1}">
          <img src="../../../assets/video/images/finisher.png" width="249" height="515" alt>
        </div>
        <div class="car1" id="car1">
          <img src="../../../assets/video/images/ft/car1.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="160" height="44" alt>
          <img src="../../../assets/video/images/sc/car1.png" v-else width="160" height="44" alt>
          <div class="wheel1a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1"  width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="20" height="20" alt>
          </div>
          <div class="wheel1b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1"  width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="20" height="20" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="144" height="53" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="144" height="53" alt>
          </div>
          <div class="flame" style="right: -45px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="49" height="11" alt>
          </div>
        </div>
        <div class="car2" id="car2">
          <img src="../../../assets/video/images/ft/car2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="164" height="44" alt>
          <img src="../../../assets/video/images/sc/car2.png" v-else width="164" height="44" alt>
          <div class="wheel2a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="20" height="20" alt>
          </div>
          <div class="wheel2b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="20" height="20" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="154" height="51" alt>
            <img src="../../../assets/video/images/sc/wind.png"  v-else width="154" height="51" alt>
          </div>
          <div class="flame" style="right: -45px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="49" height="11" alt>
          </div>
        </div>
        <div class="car3" id="car3">
          <img src="../../../assets/video/images/ft/car3.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="170" height="47" alt>
          <img src="../../../assets/video/images/sc/car3.png" v-else width="170" height="47" alt>
          <div class="wheel3a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="20" height="20" alt>
          </div>
          <div class="wheel3b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="20" height="20" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="20" height="20" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="162" height="55" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="162" height="55" alt>
          </div>
          <div class="flame" style="right: -45px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="51" height="12" alt>
          </div>
        </div>
        <div class="car4" id="car4">
          <img src="../../../assets/video/images/ft/car4.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="173" height="47" alt>
          <img src="../../../assets/video/images/sc/car4.png" v-else width="173" height="47" alt>
          <div class="wheel4a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="21" height="21" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="21" height="21" alt>
          </div>
          <div class="wheel4b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="21" height="21" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="21" height="21" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="154" height="56" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="154" height="56" alt>
          </div>
          <div class="flame" style="right: -47px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="51" height="12" alt>
          </div>
        </div>
        <div class="car5" id="car5">
          <img src="../../../assets/video/images/ft/car5.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="190" height="50" alt>
          <img src="../../../assets/video/images/sc/car5.png" v-else width="190" height="50" alt>
          <div class="wheel5a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="21" height="21" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="21" height="21" alt>
          </div>
          <div class="wheel5b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="21" height="21" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="21" height="21" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="158" height="57" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="158" height="57" alt>
          </div>
          <div class="flame" style="right: -47px; bottom: 5px; ">
            <img src="../../../assets/video/images/flame.png"  width="53" height="13" alt>
          </div>
        </div>
        <div class="car6" id="car6">
          <img src="../../../assets/video/images/ft/car6.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="201" height="53" alt>
          <img src="../../../assets/video/images/sc/car6.png" v-else width="201" height="53" alt>
          <div class="wheel6a">
            <img src="../../../assets/video/images/sc/wheel.gif" v-if="curLotteryCode.indexOf('sc')!=-1" width="22" height="22" alt>
            <img src="../../../assets/video/images/ft/wheel.png" v-else width="22" height="22" alt>
          </div>
          <div class="wheel6b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="22" height="22" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="22" height="22" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="161" height="59" alt>
            <img src="../../../assets/video/images/sc/wind.png"  v-else width="161" height="59" alt>
          </div>
          <div class="flame" style="right: -47px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="53" height="13" alt>
          </div>
        </div>
        <div class="car7" id="car7">
          <img src="../../../assets/video/images/ft/car7.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="210" height="59" alt>
          <img src="../../../assets/video/images/sc/car7.png" v-else width="210" height="59" alt>
          <div class="wheel7a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="23" height="23" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="23" height="23" alt>
          </div>
          <div class="wheel7b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="23" height="23" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="23" height="23" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="163" height="63" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="163" height="63" alt>
          </div>
          <div class="flame" style="right: -48px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="55" height="14" alt>
          </div>
        </div>
        <div class="car8" id="car8">
          <img src="../../../assets/video/images/ft/car8.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="217" height="59" alt>
          <img src="../../../assets/video/images/sc/car8.png" v-else width="217" height="59" alt>
          <div class="wheel8a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="24" height="24" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="24" height="24" alt>
          </div>
          <div class="wheel8b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="24" height="24" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="24" height="24" alt>
          </div>
          <div class="wind">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="165" height="65" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="165" height="65" alt>
          </div>
          <div class="flame" style="right: -48px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="55" height="14" alt>
          </div>
        </div>
        <div class="car9" id="car9">
          <img src="../../../assets/video/images/ft/car9.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="230" height="66" alt>
          <img src="../../../assets/video/images/sc/car9.png" v-else width="230" height="66" alt>
          <div class="wheel9a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="25" height="25" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="25" height="25" alt>
          </div>
          <div class="wheel9b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="25" height="25" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="25" height="25" alt>
          </div>
          <div class="wind" style="left: -13px; top: -3px;">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="177" height="72" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="177" height="72" alt>
          </div>
          <div class="flame" style="right: -49px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="57" height="15" alt>
          </div>
        </div>
        <div class="car10" id="car10">
          <img src="../../../assets/video/images/ft/car10.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="241" height="66" alt>
          <img src="../../../assets/video/images/sc/car10.png" v-else width="241" height="66" alt>
          <div class="wheel10a">
            <img src="../../../assets/video/images/ft/wheel.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="26" height="26" alt>
            <img src="../../../assets/video/images/sc/wheel.gif" v-else width="26" height="26" alt>
          </div>
          <div class="wheel10b">
            <img src="../../../assets/video/images/ft/wheel2.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="26" height="26" alt>
            <img src="../../../assets/video/images/sc/wheel.gif"  v-else width="26" height="26" alt>
          </div>
          <div class="wind" style="left: -13px; top: -3px;">
            <img src="../../../assets/video/images/ft/wind.png" v-if="curLotteryCode.indexOf('ft')!=-1" width="177" height="72" alt>
            <img src="../../../assets/video/images/sc/wind.png" v-else width="177" height="72" alt>
          </div>
          <div class="flame" style="right: -49px; bottom: 5px;">
            <img src="../../../assets/video/images/flame.png"  width="58" height="16" alt>
          </div>
        </div>
        <div class="trafficlight" :class="{'noBg':curLotteryCode.indexOf('ft')!=-1}">
          <div class="countdownnum">00:00</div>
          <div class="countdownnum2">00</div>
          <div class="redlight" v-show="curLotteryCode.indexOf('ft')==-1">
            <img src="../../../assets/video/images/sc/lightred.png" width="293" height="193" alt>
          </div>
          <div class="yellowlight" v-show="curLotteryCode.indexOf('ft')==-1">
            <img src="../../../assets/video/images/sc/lightyellow.png" width="293" height="193" alt>
          </div>
          <div class="greenlight" v-show="curLotteryCode.indexOf('ft')==-1">
            <img src="../../../assets/video/images/sc/lightgreen.png" width="293" height="193" alt>
          </div>
        </div>
      </div>
      <div class="resultpage page2" style="display: none;">
        <div class="resultitm result1" id="result1" style="opacity: 1;">
          <img src="../../../assets/video/images/result1.png" width="226" height="177" alt>
        </div>
        <div class="resultitm result2" id="result2" style="opacity: 1;">
          <img src="../../../assets/video/images/result2.png" width="258" height="139" alt>
        </div>
        <div class="resultitm result3" id="result3" style="opacity: 1;">
          <img src="../../../assets/video/images/result3.png" width="173" height="112" alt>
        </div>
        <div
          class="resultitm resultcar2"
          id="resultcar2"
          style="opacity: 1; left: 81px; top: 287px;"
        >
          <img
            src=""
            width="422"
            height="184"
            alt
            class="resultcarimg2"
          >
        </div>
        <div
          class="resultitm resultcar3"
          id="resultcar3"
          style="opacity: 1; left: 859px; top: 291px;"
        >
          <img
            src=""
            width="384"
            height="166"
            alt
            class="resultcarimg3"
          >
        </div>
        <div
          class="resultitm resultcar1"
          id="resultcar1"
          style="opacity: 1; left: 395px; top: 328px;"
        >
          <img
            src=""
            width="510"
            height="222"
            alt
            class="resultcarimg1"
          >
        </div>
      </div>
      <div class="footer">
        <div class="footer1">
          <div class="footer1_2">
            期号：
            <span id="nextdrawtime" style="margin-top: 16px;display: inline-block;">000000</span>
            <!--<br><span id="nextdrawid">000000</span>-->
          </div>
        </div>
        <div class="footer2">
          <div class="footer2_1">冠亚和</div>
          <div class="footer2_2" id="stat1_1">7</div>
          <div class="footer2_2" id="stat1_2">小</div>
          <div class="footer2_2" id="stat1_3">单</div>
        </div>
        <div class="footer3">
          <div class="footer2_1">龙虎</div>
          <div class="footer2_2" id="stat2_1">虎</div>
          <div class="footer2_2" id="stat2_2">虎</div>
          <div class="footer2_2" id="stat2_3">龍</div>
          <div class="footer2_2" id="stat2_4">虎</div>
          <div class="footer2_2" id="stat2_5">虎</div>
        </div>
      </div>
      <div class="flashlight" style="display: none;"></div>
      <div class="soundbox">
			<audio :src="require('../../../assets/video/sound/cuttime.mp3')" id="sound" ></audio>
		</div>

    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import "../../../assets/video/css/animate.min.css";
import "../../../assets/video/css/main.css";
import "../../../assets/video/css/style.scss";
import "../../../assets/video/js/jquery-1.11.2.min.js";
import {
  startcountdown,
  showcurrentresult,
  finishgame,
  settingIsOpen,
  stopanimation
} from "../../../assets/video/js/main.js";

export default {
  name: "pk10Live",
  data() {
    return {
      firstLoad:true,
      curReslut:{}
    };
  },
  mounted() {
    this.$nextTick(() => {
      var W = 1200;
      var H = 870;
      var zoomW = W / 1335;
      $("#layaContainer .container").css("zoom", zoomW);
      $("#layaContainer .container").css({
        "-moz-transform": "scale(" + zoomW + ")",
        "-moz-transform-origin": "top left"
      });

      this.firstLoad=true;
      let curCode = this.$route.params.code;
      this.chengecurLotteryCode(curCode)
      this.getLotteryExpect(curCode);
      this.insertDataWarp(this.openResult);
    });
  },

  methods: {
    ...mapActions(['getLotteryExpect','chengecurLotteryCode']),

    insertDataWarp(openResult,isOPen){  
      this.curReslut = openResult;
      if(openResult.code != this.curLotteryCode)  return;
      var ticking = isOPen ? 0 : openResult.next_open_seconds;
      if (this.firstLoad) {
        settingIsOpen(true)
        this.firstLoad = false;
        this.insertData(openResult,ticking);
      } else {
        finishgame(openResult.open_numbers, openResult.next_open_seconds);
        setTimeout(()=> {
          this.insertData(openResult, ticking - 10 < 0 ? 0 : ticking - 10);
        }, 10000);
      }
    },

    insertData(openResult,ticking) {
      if(!openResult.next_open_seconds) return;
      // console.log(openResult)
      //切换到开奖
      startcountdown(ticking,this.curLotteryCode);
      showcurrentresult(openResult.open_numbers);
      // 已开奖期数
      $("#currentdrawid").text(openResult.next_expect);
      // 开奖期号
      $("#nextdrawtime").text(openResult.expect);
      // 冠亚和数据
      $("#stat1_1").text(openResult.no_screening_parameter[1].data[0]);
      $("#stat1_2").text(openResult.no_screening_parameter[1].data[1]);
      $("#stat1_3").text(openResult.no_screening_parameter[1].data[2]);
      // 龙虎
      for (var i = 0; i < 5; i++) {
        $("#stat2_" + (i + 1)).text(openResult.no_screening_parameter[0].data[i]);
      }
    }
  },
  destroyed(){
    stopanimation();
  },
  computed: {
    ...mapGetters(["curLotteryCode", "openResult", "lotteryCodes","socketOpenResult"])
  },
  watch: {
    openResult() {
      this.firstLoad = true;
      this.insertDataWarp(this.openResult);
    },

    socketOpenResult(){
      if(this.socketOpenResult.code == this.curLotteryCode){
        // console.log(this.socketOpenResult)
        let isOPen = parseInt(this.openResult.expect)- parseInt(this.socketOpenResult.expect)  >=2 && parseInt(this.openResult.expect)- parseInt(this.socketOpenResult.expect) <=3;
        // console.log(isOPen)
        this.insertDataWarp(this.socketOpenResult,isOPen);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pk10Live {
  width: 1200px;
  position: relative;
}
</style>
