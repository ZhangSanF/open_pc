<template>
  <div class="trendContainer pageWidth">
    <div class="data">
      <div>
        <div class="title">
          <div class="filterTop">
            <a href="jacascript:void(0)" class="active">
              <i class="ico1"></i>基本走势图
            </a>
            <!-- <a href="jacascript:void(0)">
              <i class="ico2"></i>同期走势图
            </a>-->
            <div class="filterTime">
              <span slot="afterDateInput" class="animated-placeholder">按日期</span>
              <datepicker
                class="datepicker"
                :input-class="'datepickerInput'"
                :format="dateOption.format"
                :language="dateOption.language"
                :disabledDates="disabledDates"
                v-model="curSelectTime"
                @closed="selectedTime"
              ></datepicker>
            </div>
          </div>
          <div class="filterDown">
            <ul class="trendTab">
              <!-- @click="changeTrendTab(1)" -->
              <li :class="{'active':curTrendTabIndex==1}">位置走势图</li>
              <!-- <li @click="changeTrendTab(2)" :class="{'active':curTrendTabIndex==2}">号码走势图</li> -->
              <!-- <li @click="changeTrendTab(3)" :class="{'active':curTrendTabIndex==3}">冠亚和走势图</li> -->
            </ul>
            <ul class="numTab">
              <li
                @click="changeNumTab(index)"
                v-for="(item,index) in locationName"
                :key="index"
                :class="{'active':curNumTabIndex == index}"
              >{{item}}</li>
            </ul>
          </div>
        </div>            
        <div class="content">        
          <div class="table">
            <table>
              <tr>
                <th width="110" rowspan="2">统计类型</th>
                <template v-if="lotteryNumbers">
                  <th :colspan="lotteryNumbers.length">{{locationName[curNumTabIndex]}}</th>
                  <th colspan="3">回摆</th>
                  <th colspan="2">单双</th>
                  <th colspan="2">大小</th>
                </template>
              </tr>
              <tr>
                <th width="60" v-for="(item,index) in lotteryNumbers" :key="index+'_key2_'">{{item}}</th>
                <th width="60">反</th>
                <th width="60">重</th>
                <th width="60">正</th>
                <th width="60">单</th>
                <th width="60">双</th>
                <th width="60">大</th>
                <th width="60">小</th>
              </tr>
              <tr v-if="!totalNoData">
                <td>总次数</td>
                <td width="60" v-for="(item,index) in basicTrendTotal" :key="index+'_key3_'">{{item.count}}</td>
              </tr>
              <tr v-if="!totalNoData">
                <td>最大遗漏</td>
                <td width="60" v-for="(item,index) in basicTrendTotal" :key="index+'_key4_'" >{{item.max_missing}}</td>
              </tr>
              <tr v-else>
                <td colspan="20" style="font-size: 20px;color: #666;">暂无数据</td>
              </tr>
            </table>
          </div>
          <div class="table">
            <table ref="Table">
              <tr>
                <th width="110" rowspan="2">期号</th>
                <template v-if="lotteryNumbers">
                  <th :colspan="lotteryNumbers.length">{{locationName[curNumTabIndex]}}走势</th>
                  <th colspan="3">回摆</th>
                  <th colspan="2">单双</th>
                  <th colspan="2">大小</th>
                </template>
              </tr>
              <tr>
                <th width="60" v-for="(item,index) in lotteryNumbers" :key="index+'_key6_'">{{item}}</th>
                <th width="60">反</th>
                <th width="60">重</th>
                <th width="60">正</th>
                <th width="60">单</th>
                <th width="60">双</th>
                <th width="60">大</th>
                <th width="60">小</th>
              </tr>
              <tr v-if="detailsNoData">
                <td colspan="20" style="font-size: 20px;color: #666;">暂无数据</td>
              </tr>
              <tr v-else v-for="(item,index) in basicTrendDetails" :key="index+'_key7_'" >
                <td>{{item[0].expect}}</td>
                <template v-for="(obj,key) in item">
                  <td width="60" :key="num+'_key8_'+key" v-for="(ball,num) in obj.row">
                    <!-- <span
                      v-if="ball == 0 && obj.type == 'open_numbers'"
                      class="win"
                      :key="num+ball+'_key9_'"
                    >{{num+1}}</span> -->
                    <span
                      v-if="ball == 0 && obj.type == 'open_numbers'"
                      class="win"
                      :key="num+ball+'_key9_'"
                    >{{lotteryNumbers[num]}}</span>
                    <span
                      v-else-if="ball == 0 && obj.type == 'back_swing'"
                      class="blue"
                      :key="num+ball+'_key9_'"
                    >{{canvertBallToTxt(obj.type,num)}}</span>
                    <span
                      v-else-if="ball == 0 && obj.type == 'single_double'"
                      class="orange"
                      :key="num+ball+'_key9_'"
                    >{{canvertBallToTxt(obj.type,num)}}</span>
                    <span
                      v-else-if="ball == 0 && obj.type == 'big_small'"
                      class="green"
                      :key="num+ball+'_key9_'"
                    >{{canvertBallToTxt(obj.type,num)}}</span>
                    <span v-else :key="num+key+'_key9_'">{{ball}}</span>
                  </td>
                </template>
              </tr>
            </table>
            <div class="canvasBox">
              <canvas ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
import { mapGetters, mapActions } from "vuex";
import { getCurTime, formatTime } from "@/assets/js/utils";

export default {
  name: "trendChart",
  components: { Datepicker },
  data() {
    return {
      selectedGroup: 0, //选中的组
      selectedCode: 0, //选中的彩种
      selectedNum: 0, //选中的号码
      // basicTrend: {}, //走势图数据
      basicTrendDetails: [],
      basicTrendTotal: [],
      curSelectTime: new Date(),
      dateOption: {
        language: zh,
        format: "yyyy-MM-dd"
      },
      disabledDates: {
        from: new Date()
      },
      curTrendTabIndex: 1,
      curNumTabIndex: 0,
      totalNoData: false,
      detailsNoData: false
    };
  },
  created() {
    this.curNumTabIndex = this.$route.query.id || 0;
  },
  mounted() {
    this.$nextTick(() => {
      // 获取基础统计
      this.getBasicTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"), this.curNumTabIndex);
    });
  },
  methods: {
    ...mapActions(["getBasicTrend"]),

    getBasicTrendFunc(code, date, location) {
      // this.basicTrend = {}
      this.basicTrendDetails = []
      this.basicTrendTotal = []
      this.getBasicTrend({
        code: code,
        open_date: date,    
        location: location
      }).then(res => {
        if (res.code == 200) {
          // 统计类型没有数据
          if(res.data.total.length == 0) {
            this.totalNoData = true
          }else {
            this.totalNoData = false
          }
          // 走势没有数据
          if(res.data.details.length == 0) {
            this.detailsNoData = true
          }else {
            this.detailsNoData = false
          }
          // this.basicTrend = res.data;
          this.basicTrendDetails = res.data.details
          this.basicTrendTotal = res.data.total
        }
      });
    },

    // 开奖回摆大小单上转换
    canvertBallToTxt(type, index) {
      let txt = "";
      let backTxt = ["反", "重", "正"];
      let singleTxt = ["单", "双"];
      let bigTxt = ["大", "小"];
      switch (type) {
        case "back_swing":
          txt = backTxt[index];
          break;
        case "single_double":
          txt = singleTxt[index];
          break;
        case "big_small":
          txt = bigTxt[index];
          break;
      }
      return txt;
    },

    // 根基类型设置不同球高亮状态
    ballStyle(item) {
      let sty = "";
      switch (item.type) {
        case "open_numbers":
          sty = "win";
          break;
        case "back_swing":
          sty = "blue";
          break;
        case "single_double":
          sty = "orange";
          break;
        case "big_small":
          sty = "green";
          break;
      }
      return sty;
    },

    // 选择日期
    selectedTime() {
      this.getBasicTrendFunc(this.curLotteryCode, formatTime(this.curSelectTime, "YYYY-MM-DD"), this.curNumTabIndex);
    },

    // 绘制走势
    drawTrend() {
      let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0;
      let canvas = this.createCanvas(this.$refs.canvas);
      //获取位数
      if(this.basicTrendDetails) {       
        let trendLineNum = this.basicTrendDetails.length - 1;
      }   
      var trendBallList = document.querySelectorAll(".win");
      if (trendBallList.length <= 1) return;
      //获取显示期数总条数
      for (var i = 0; i < trendBallList.length; i++) {
        //计算坐标的起始位置，并处于元素中心
        var w1 = trendBallList[i].clientWidth;
        var h1 = trendBallList[i].clientHeight;
        x1 = trendBallList[i].offsetLeft + w1 / 2;
        y1 = trendBallList[i].offsetTop + h1 / 2;
        if (i + 1 < trendBallList.length) {
          var w2 = trendBallList[i + 1].clientWidth;
          var h2 = trendBallList[i + 1].clientHeight;
          x2 = trendBallList[i + 1].offsetLeft + w2 / 2;
          y2 = trendBallList[i + 1].offsetTop + h2 / 2;
        }

        //开始绘制走势
        this.commonLine(x1, y1, x2, y2, canvas);

        x1 = x2;
        y1 = y2;
      }
      // }
    },

    //常用浏览器走势图-非IE
    commonLine(x1, y1, x2, y2, commonTrendLine) {
      commonTrendLine.beginPath();
      commonTrendLine.moveTo(x1, y1);
      commonTrendLine.lineTo(x2, y2);
      commonTrendLine.closePath();
      commonTrendLine.stroke();
      commonTrendLine.restore();
    },

    //创建canvas区域
    createCanvas(canvas) {
      canvas.width = this.$refs.Table.clientWidth;
      canvas.height = this.$refs.Table.clientHeight;
      let commonTrendLine = canvas.getContext("2d");
      commonTrendLine.strokeStyle = "#ffab0a";
      commonTrendLine.lineWidth = 2;
      return commonTrendLine;
    },

    // 切换走势图
    // changeTrendTab(index) {
    //   this.curTrendTabIndex = index;
    // },

    // 切换号码
    changeNumTab(index) {
      this.curNumTabIndex = index;
      this.getBasicTrendFunc(this.curLotteryCode, formatTime(this.curSelectTime, "YYYY-MM-DD"), this.curNumTabIndex);
    },

    changeGroup(g) {
      this.selectedGroup = g;
    },
    changeCode(c) {
      this.selectedCode = c;
      this.selectedNum = 0;
    },
    changeNum(n) {
      this.selectedNum = n;
    }
  },
  computed: {
    ...mapGetters([
      "curLotteryCode",
      "socketOpenResult",
      "lotteryCodes"
    ]),
    // 当前彩种的 location_name
    locationName() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.lottery_location_names
        }
      }
    },
    // 当前彩种的 lotteryNumbers
    lotteryNumbers() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.lottery_numbers
        }
      }
    }
  },
  watch: {
    curLotteryCode: function() {
      this.getBasicTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"), this.curNumTabIndex);
    },
    socketOpenResult: function() {
      if (
        this.socketOpenResult.code == this.curLotteryCode &&
        getCurTime("YYYY-MM-DD") == formatTime(this.curSelectTime, "YYYY-MM-DD")
      ) {
        // 当前开奖号码-------------------------------------------------------------------------
        let resultNumber = this.socketOpenResult.open_numbers[this.curNumTabIndex]
        // 当前走势开奖号码的index
        let openNumberIndex;
        for(let i=0; i<this.lotteryNumbers.length; i++) {
          if(this.lotteryNumbers[i] == resultNumber) {
            openNumberIndex = i
          }
        }       
        // 获取上一条数据的走势
        let open_numbers = this.basicTrendDetails[0][0].row
        // 走势新数组
        let firearrOpenNumbers = open_numbers.map((item, index) => {
          if(index == openNumberIndex) {
            item = 0
            // 中奖号码走势总次数加1
            this.basicTrendTotal[index].count++;
          }else {
            item++
            // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
            if(this.basicTrendTotal[index].max_missing < item){
              this.basicTrendTotal[index].max_missing = item;
            }
          }
          return item
        })
        // 获取上一条数据的回摆(当期的开奖号码小于上一期为反  大于为正， 等于为重)-------------------------------------
        // 上一期的开奖数据的index
        let backIndex;
        for(let i=0; i<open_numbers.length; i++) {
          if(open_numbers[i] == 0) {
            backIndex = i
          }
        }
        // 上一期的开奖号码
        let backOpenNumber;
        for(let i=0; i<this.lotteryNumbers.length; i++) {
          if(i == backIndex) {
            backOpenNumber = this.lotteryNumbers[i]
          }
        }
        // 获取上一条数据的回摆
        let backSwing = this.basicTrendDetails[0][1].row
        // 回摆新数组
        let firearrbackSwing = backSwing.map((item, index) => {
          if(resultNumber > backOpenNumber) {
            if(index == 2) {
              item = 0
              // 中奖号码回摆总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing = item;
              }
            }
          }else if(resultNumber < backOpenNumber) {
            if(index == 0) {
              item = 0
              // 中奖号码回摆总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing = item;
              }
            }
          }else {
            if(index == 1) {
              item = 0
              // 中奖号码回摆总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length].max_missing = item;
              }
            }
          }
          return item
        })
        // 当前号码单双--------------------------------------------------------------------------
        let allSingleDouble =  this.socketOpenResult.data.single_double[this.curNumTabIndex]
        // 获取上一条数据的单双
        let singleDouble = this.basicTrendDetails[0][2].row
        // 单双新数组
        let firearrSingleDouble = singleDouble.map((item, index) => {
          if(allSingleDouble == '单') {
            if(index == 0) {
              item = 0
              // 中奖号码单双总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length + 3].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length + 3].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length + 3].max_missing = item;
              }
            }
          }else {
            if(index == 1) {
              item = 0
              // 中奖号码单双总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length + 3].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length + 3].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length + 3].max_missing = item;
              }
            }
          }
          return item
        })
        // 当前号码大小-------------------------------------------------------------------------
        let allBigSmall =  this.socketOpenResult.data.big_small[this.curNumTabIndex]
        // 获取上一条数据的大小
        let bigSmall = this.basicTrendDetails[0][3].row
        // 大小新数组
        let firearrBigSmall = bigSmall.map((item, index) => {
          if(allBigSmall == '大') {
            if(index == 0) {
              item = 0
              // 中奖号码大小总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].max_missing = item;
              }
            }
          }else {
            if(index == 1) {
              item = 0
              // 中奖号码大小总次数加1
              this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].count++;
            }else {
              item++
              // 当前最大遗漏数(如果当前遗漏数(item)大于上一期遗漏数(this.basicTrendTotal[index].max_missing)就改变遗漏数)
              if(this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].max_missing < item){
                this.basicTrendTotal[index + this.lotteryNumbers.length + 3 + 2].max_missing = item;
              }
            }
          }
          return item
        })
        // 拼接最新数据
        let arrbasicTrendDetails = [
          {expect: this.socketOpenResult.expect, row: firearrOpenNumbers, type: 'open_numbers', type_name: '球号'},
          {expect: this.socketOpenResult.expect, row: firearrbackSwing, type: 'back_swing', type_name: '回摆'},
          {expect: this.socketOpenResult.expect, row: firearrSingleDouble, type: 'single_double', type_name: '单双'},
          {expect: this.socketOpenResult.expect, row: firearrBigSmall, type: 'big_small', type_name: '大小'}
        ]
        this.basicTrendDetails = [arrbasicTrendDetails, ...this.basicTrendDetails]
      }
    },
    basicTrendDetails() {
      setTimeout(() => {
        this.drawTrend();
      }, 20);
    }
  }
};
</script>
<style lang="scss" scoped>
.trendContainer {
  box-sizing: border-box;
  li {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
  .header {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    background-color: #fff;
    li {
      margin: 0 20px 0 20px;
    }
    .selectedGroup {
      color: orange;
    }
  }
  .chart {
    margin-top: 10px;
    height: 340px;
    background-color: #fff;
    box-sizing: border-box;
    li {
      margin: 0 14px 0 14px;
      padding: 8px 0 4px 0;
    }
    .selectedCode {
      color: orange;
      box-sizing: border-box;
      border-bottom: 3px solid orange;
    }
    .selectedNum {
      color: orange;
    }
    .chartArea {
      padding: 0 0 0 10px;
    }
  }

  .data {
    padding: 20px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    .title {
      position: relative;
      .filterTop {
        overflow: hidden;
        a {
          display: inline-block;
          width: 153px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
          margin-right: 10px;
          font-size: 16px;
          color: #333;
          border: 1px solid #e5e5e5;
          text-decoration: none;
          transition: all 0.3s;
          i {
            display: inline-block;
            width: 21px;
            height: 20px;
            background: url("../../../assets/images/tb-ico.png") center top
              no-repeat;
            vertical-align: middle;
            margin-right: 10px;
            &.ico2 {
              background-position: center -21px;
            }
          }
        }
        a:hover,
        a.active {
          background: #fffbf6;
          border-color: #ffcc82;
          color: #333;
        }
      }
    }
    .filterTime {
      border: 1px solid #ddd;
      position: absolute;
      right: 0;
      top: 5px;
      .datepicker {
        line-height: 30px;
        display: inline-block;
      }
      span {
        display: inline-block;
        float: left;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        background: #f1f1f1;
      }
    }
    .filterDown {
      margin-top: 10px;
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      ul {
        li {
          padding: 0 15px;
          margin-right: 5px;
        }
        &.trendTab {
          li {
            &:hover,
            &.active {
              color: #333;
              border-bottom: 2px solid #e73f3f;
            }
          }
        }
        &.numTab {
          li {
            &:hover,
            &.active {
              color: #e73f3f;
            }
          }
        }
      }
    }
  }
  .loading-img{
    text-align: center
  }
  .no-content{
    text-align: center;font-size: 20px;color: #666;line-height: 50px;
  }
  .content {
    margin-top: 20px;
    .table {
      position: relative;
      margin-top: 15px;
      table {
        width: 100%;
        border: 1px solid gray;
        line-height: 36px;
        th {
          font-weight: 700;
          background-color: #fafafa;
        }
        th,
        td {
          border: 1px solid #e5e5e5;
          text-align: center;
          .win {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            background: #1384e7;
            color: #fff;
            position: relative;
            z-index: 3;
          }
          .blue {
            width: 100%;
            height: 100%;
            display: block;
            background: #3e94f1;
            color: #fff;
          }
          .orange {
            width: 100%;
            height: 100%;
            display: block;
            background: #ff9c00;
            color: #fff;
          }
          .green {
            width: 100%;
            height: 100%;
            display: block;
            background: #5cd38f;
            color: #fff;
          }
        }
      }
      .canvasBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
