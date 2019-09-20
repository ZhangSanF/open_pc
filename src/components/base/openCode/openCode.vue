<template>
<div>
  <div class="openCode" v-show="!isOPen">
    <span
      class="ball"
      :class="['num'+ (item.open_numbers == 0 ? 0 : item.open_numbers ? item.open_numbers : item), code == 'cqklsf' ? 'cqklsf' :codeType, 
          {'orange': selectedTableShowData =='big_small' && item.big_small == '大'},
          {'blue': selectedTableShowData =='big_small' && item.big_small == '小'},
          {'blue': selectedTableShowData == 'single_double' && item.single_double == '单'},
          {'orange': selectedTableShowData == 'single_double' && item.single_double == '双'},
          {'orange': selectedTableShowData == 'quality_mix' && item.quality_mix == '质'},
          {'blue': selectedTableShowData == 'quality_mix' && item.quality_mix == '合'},
          {'positionD': selectedTableShowData != 'open_numbers' && (item.position == '东')},
          {'positionX': selectedTableShowData != 'open_numbers' && (item.position == '西')},
          {'positionN': selectedTableShowData != 'open_numbers' && (item.position == '南')},
          {'positionB': selectedTableShowData != 'open_numbers' && (item.position == '北')},
          code
        ]"
      :style="{'opacity' : showNumber(index, item.open_numbers, item.big_small, item.single_double, item.quality_mix, item.position, item.wealth) ? 1 : 0.1}"
      v-for="(item,index) in allResultData"
      :key="index"
    >
      <template v-if="allResult">{{item[selectedTableShowData]}}</template>
      <template v-else>{{item}}</template>
    </span>
  </div>
  <div class="openCode" v-show="isOPen" ref="openCode">
    <span
      class="ball"
      :class="['num'+ (item.open_numbers == 0 ? 0 : item.open_numbers ? item.open_numbers : item), code == 'cqklsf' ? 'cqklsf' :codeType, 
          {'orange': selectedTableShowData =='big_small' && item.big_small == '大'},
          {'blue': selectedTableShowData =='big_small' && item.big_small == '小'},
          {'blue': selectedTableShowData == 'single_double' && item.single_double == '单'},
          {'orange': selectedTableShowData == 'single_double' && item.single_double == '双'},
          {'orange': selectedTableShowData == 'quality_mix' && item.quality_mix == '质'},
          {'blue': selectedTableShowData == 'quality_mix' && item.quality_mix == '合'},
          {'positionD': selectedTableShowData != 'open_numbers' && (item.position == '东')},
          {'positionX': selectedTableShowData != 'open_numbers' && (item.position == '西')},
          {'positionN': selectedTableShowData != 'open_numbers' && (item.position == '南')},
          {'positionB': selectedTableShowData != 'open_numbers' && (item.position == '北')},
          code
        ]"
      :style="{'opacity' : showNumber(index, item.open_numbers, item.big_small, item.single_double, item.quality_mix, item.position, item.wealth) ? 1 : 0.1}"
      v-for="(item,index) in allResultData"
      :key="index"
    >
      <template v-if="allResult">{{item[selectedTableShowData]}}</template>
      <template v-else>{{item}}</template>
    </span>
  </div>
</div>
  
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "openCode",
  props: {
    isOPen:{
      type: Boolean,
      default: false
    },
    codeType:{
      // 当前传入彩种类型
      type: String,
      default: ''
    },
    code:{
      // 当前传入彩种类型
      type: String,
      default: ''
    },
    result: {
      //开奖号码结果
      type: Array,
      default: () => []
    },
    allResult: {
      //开奖结果（包括大小单双）
      type: Object,
      default: () => {}
    },
    doubleNumber: {
      //传入的对子号（标记的与上下期对比 重复出现的号码）
      type: Array,
      default: () => []
    },
    showSpecialNumber: {
      //是否显示部分号码 （点击查看球号分布、大小分布时启用）
      type: Boolean,
      default: false
    },
    selectedOpenNumber: {
      type: Number, //传入的要显示的单个号码 （查看球号分布）
      default: null
    },
    selectedTableShowData: {
      type: String,
      default: "open_numbers"
    },
    selectedNumberType: {
      //传入的大小单双分布（查看大小单双分布）
      type: String,
      default: 'reset'
    }
  },
  data(){
    return {
      setTimeFunc:null
    }
  },
  methods: {
    // 开奖动画
    showOpenAni(){
      if(this.isOPen){
        if(!this.$refs.openCode) return;
        let dom = this.$refs.openCode.querySelectorAll('.ball');
        let fastTemp = dom[0];
        dom[0].remove();
        this.$refs.openCode.appendChild(fastTemp);
        this.setTimeFunc = setTimeout(()=>{
          clearTimeout(this.setTimeFunc);
          this.showOpenAni();
        },100)
      }else{
        clearTimeout(this.setTimeFunc);
      }
    },
    showNumber(index, item, big_small, single_double, quality_mix, position, wealth) {
      if (!this.showSpecialNumber) return true; //没有选择分布则全部显示
      var res = true;
      //属于重复出现的号码  并且已选择对子号分布
      if(this.selectedNumberType == "pairs" && this.doubleNumber.indexOf(index) < 0) {
        res = false;
      }
      if (this.selectedNumberType == "double" && single_double != '双') {      
        res = false;
      }
      if (this.selectedNumberType == "single" && single_double != '单') {
        res = false;
      }
      if (this.selectedNumberType == "big" && big_small != "大") {
        res = false;
      }
      if (this.selectedNumberType == "small" && big_small != "小") {
        res = false;
      }
      // 质
      if (this.selectedNumberType == "quality" && quality_mix != '质') {
        res = false;
      }
      // 合
      if (this.selectedNumberType == "combined" && quality_mix != '合') {
        res = false;
      }
      // 东
      if (this.selectedNumberType == "east" && position != '东') {
        res = false;
      }
      // 西
      if (this.selectedNumberType == "weat" && position != '西') {
        res = false;
      }
      // 南
      if (this.selectedNumberType == "south" && position != '南') {
        res = false;
      }
      // 北
      if (this.selectedNumberType == "north" && position != '北') {
        res = false;
      }
      // 中
      if (this.selectedNumberType == "in" && wealth != '中') {
        res = false;
      }
      // 发
      if (this.selectedNumberType == "hair" && wealth != '发') {
        res = false;
      }
      // 白
      if (this.selectedNumberType == "white" && wealth != '白') {
        res = false;
      }
      // 已选择的球号分布
      if(this.selectedOpenNumber != null && this.selectedOpenNumber != item) {
        res = false;
      }
      return res;
    },

  },
  computed: {
    allResultData() {
        //大小单双号码 组合
      var res = [];
      if (this.allResult && this.allResult.open_numbers.length) {
        for (var i = 0; i < this.allResult.open_numbers.length; i++) {
          res[i] = {};
          res[i].open_numbers = this.allResult.open_numbers[i];
          res[i].big_small = this.allResult.big_small ? this.allResult.big_small[i] : '';
          res[i].single_double = this.allResult.single_double ? this.allResult.single_double[i] : '';
          res[i].quality_mix = this.allResult.quality_mix ? this.allResult.quality_mix[i] : '';
          res[i].position = this.allResult.position ? this.allResult.position[i] : '';
          res[i].wealth = this.allResult.wealth ? this.allResult.wealth[i] : '';
        }
      } else {
        res = this.result;
      }
      return res;
    }
  },
  watch: {
    isOPen: function() {
      clearTimeout(this.setTimeFunc);
      this.showOpenAni();
    }
  }
};
</script>

<style lang="scss" scoped>
.openCode {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .ball {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;    
    font-weight: 600;
    background-color: #3771de;
    color: #fff;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    border-radius: 50%;
    margin: 0 4px;
    &.pk10 {
      width: 32px;
      height: 32px;
      border-radius: 5px;
      color: #fff;
      margin: 0 2px;
      $i: 0;
      @each $color
        in (
          (
            #ffa300,
            #0089ff,
            #4b4b4b,
            #ff7300,
            #00a3a3,
            #5235ff,
            #8a8a8a,
            #ff0000,
            #760000,
            #04bf00
          )
        )
      {
        $i: $i + 1;
        &.num#{$i} {
          background-color: $color;
        }
      }
    }
    &.ssc {
      background-color: #3771de;
      color: #fff;
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      border-radius: 50%;
      margin: 0 5px;
    }
    &.fast3 {
      border-radius: 0;
      background-size: contain;
      line-height: 38px;
      width: 38px;
      height: 38px;
      color: rgba($color: #000000, $alpha: 0);
      @each $num
        in (
          1,
          2,
          3,
          4,
          5,
          6
        )
      {
        &.num#{$num} {
          background: url("../../../assets/images/jsk3#{$num}.png") left center no-repeat;
          background-size: contain;
        }
      }
    }
    &.cqklsf {
      border-radius: 0;
      background: url("../../../assets/images/xync.png") left center no-repeat;
      line-height: 38px;
      width: 38px;
      height: 38px;
      transform: scale(.9);
      font-size: 16px;
      display: inline-block;
      margin: 0 2px;
      color: transparent;
      $i: 0;
      @each $num
        in (
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19
        )
      {
        $i: $i + 1;
        &.num#{$i} {
          background-position: $num * -48 + px center;
        }
      }
    }
    &.liu_he_cai{
      @each $num
        in (1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46)
      {
        &.num#{$num} {
          background-color: #F44336;
        }
      }
      @each $num
        in (3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48 )
      {
        &.num#{$num} {
          background-color: #3F51B5;
        }
      }
       @each $num
        in (5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49)
      {
        &.num#{$num} {
          background-color: #4CAF50;
        }
      }
    }
    &.orange {
      background: #ff7300 !important;
      color: #fff !important;
    }
    &.blue {
      background: #569ebb !important;
      color: #fff !important;
    }
    &.positionD{
      background: #6275b8 !important;
      color: #fff !important;
      border-radius: 50%;
    }
    &.positionX{
      background: #56b260 !important;
      color: #fff !important;
      border-radius: 50%;
    }
    &.positionN{
      background: #f9982e !important;
      color: #fff !important;
      border-radius: 50%;
    }
    &.positionB{
      background: #c2588a !important;
      color: #fff !important;
      border-radius: 50%;
    }
  }
}
</style>
