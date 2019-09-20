<template>
  <div class="historyData pageWidth">
    <div class="titleBox">
      <label
        @click="isShowSidesTotal = !isShowSidesTotal"       
        v-if="isSidesTotal == 1"
        :class="{'active':isShowSidesTotal}"
      >
        <b>
          <i v-show="isShowSidesTotal">
            <i class="fa fa-check"></i>
          </i>
        </b>
        <span>双面统计</span>
      </label>
      <label
        @click="isShowLongDragon = !isShowLongDragon"
        v-if="isLongDragon == 1"
        :class="{'active':isShowLongDragon}"
      >
        <b>
          <i v-show="isShowLongDragon">
            <i class="fa fa-check"></i>
          </i>
        </b>
        <span>长龙统计</span>
      </label>
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
    <div class="liangmian" v-show="isShowSidesTotal">   
      <div v-if="isSidesTotal == 1">
        <ul class="item-box">
          <li v-for="(item, index) in locationName" :key="index">{{item}}</li>         
        </ul>
        <ul class="item-box-list">
          <li v-for="(item, index) in locationName" :key="index">
            <span v-for="(obj, key) in sidesTotalField" :key="key">{{obj}}</span>
          </li>
        </ul>
        <ul v-if="sidesTotalNoData">
          <li style="font-size: 20px;color: #666;text-align: center;">暂无数据</li>
        </ul>
        <ul v-else class="item-box-list">
          <li v-for="(item, index) in locationName" :key="index">
            <span v-for="(obj,key) in sidesTotal" :key="key" v-if="key >= (sidesTotalField.length * index) && key < (sidesTotalField.length * (index+1)) ">{{obj}}</span>
          </li>
        </ul>
     </div>
    </div>
    <div class="changlong" v-show="isShowLongDragon">
      <div v-if="isLongDragon == 1">
        <table class="changlongTable" cellpadding="0" cellspacing="0">
          <th colspan="12">长龙连开提醒</th>
          <tr v-if="dragonDataNoData">
            <td style="font-size: 20px;color: #666;">暂无数据</td>
          </tr>
          <tr v-else>
            <td v-if="curdragonData.length > 0">
              <span
                v-for="(data, index) in curdragonData"
                :key="index+'_d'"
              >{{data.location_name}}</span>
            </td>
            <td v-else style="height:40px"></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="dataTabs">
      <div class="numBtn">
        <div class="text">查看球号分布</div>
        <div class="btns">
          <a
            v-for="(num, index) in curLotteryNumbers"
            class="btn"
            :class="{'selectedA': selectedOpenNumber == num}"
            @click="numBtnClick(num)"
            :key="index+'_e'"
          >号码{{num}}</a>
        </div>
      </div>
      <div class="classBtn">
        <div class="text">大小单双分布</div>
        <div class="btns" @click="resetSelectedNumber">
          <a
            class="btn"
            v-for="(item,index) in screeningParameter"
            :key="index+'_f'"
            :class="{'selectedA': selectedNumberType == item.type}"
            @click="selectedNumberType = item.type;"
          >{{item.name}}</a>

          <a
            class="btn"
            :class="{'selectedA': selectedNumberType == 'pairs'}"
            @click="selectedNumberType = 'pairs'"
          >对子号</a>
          <a class="btn" @click="bigSmallSingalDoubleReset">还原</a>
        </div>
      </div>
    </div>
    <div class="dataTableContainer">
      <table class="dataTable" border="1">
        <tr>
          <td>时间</td>
          <td
            :colspan="item.len ? item.len : ''"
            v-for="(item,index) in historyTitle"
            :key="index+'_h'"
          >
            <a
              class="btn"
              v-show="Array.isArray(item)"
              v-for="(obj,key) in item"
              :key="key+'_g'"
              :class="{'active': selectedTableShowData == obj.type}"
              @click="selectedTableShowData = obj.type"
            >显示{{obj.type_name}}</a>
            <template v-show="!Array.isArray(item)">{{item.type_name}}</template>
          </td>
        </tr>
        <tr v-if="isNoContent">
          <td colspan="10">
            <span class="no-content">暂无数据</span>
          </td>               
        </tr>
        <tr v-for="(item, index) in curlotteryData" :key="index+'_t'">
          <td class="time">{{item.expect}} {{item.open_datetime.split(' ')[1]}}</td>
          <td class="nums" v-if="curlotteryDatas.length > 0">
            <openCode
              :doubleNumber="doubleNumberCount(index)"
              :showSpecialNumber="showSpecialNumber"
              :selectedOpenNumber="selectedOpenNumber"
              :selectedNumberType="selectedNumberType"
              :selectedTableShowData="selectedTableShowData"
              :allResult="curlotteryDatas[index]"
              :code="lotteryCode"
              :codeType="lotteryType"
              :result="curlotteryDatas[index][selectedTableShowData]"
            />
          </td>
          <td class="nums" v-else></td>
          <template v-for="(obj,key) in historyTitle">
            <template v-if="!Array.isArray(item)">
              <td
                class="guanyahe"
                v-for="(gyh, index) in item[obj.type]"
                :key="'a' + index + key"
              >{{gyh}}</td>
            </template>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { getCurTime, formatTime } from "@/assets/js/utils";
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
import openCode from "@/components/base/openCode/openCode.vue";

export default {
  name: "historyData",
  components: { openCode, Datepicker },
  data() {
    return {
      selectedOpenNumber: null, //查看球号分布 选中的球号
      selectedNumberType: "reset",
      sidesTotal: [], //双面统计
      curdragonData: [],//长龙
      curlotteryData: [],
      curlotteryDatas:[],
      selectedTableShowData: "open_numbers", //数据表头显示的类型 big_small single_double
      curSelectTime: new Date(),
      dateOption: {
        language: zh,
        format: "yyyy-MM-dd"
      },
      disabledDates: {
        from: new Date()
      },
      isShowSidesTotal: true,
      isShowLongDragon: true,
      sidesTotalNoData: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.selectedTime();
    }, 20);
  },
  watch: {
    'dragonData':{
      handler(val, b) {
        this.curdragonData = val
      },
      deep: true
    },
    'lotteryData':{
      handler(val, b) {
        this.curlotteryData = val
      },
      deep: true
    },
    'lotteryDatas':{
      handler(val, b) {
        this.curlotteryDatas = val
      },
      deep: true
    },
    curLotteryCode() {
      this.bigSmallSingalDoubleReset()
      this.resetSelectedNumber()
      this.selectedTableShowData = 'open_numbers'
      this.getLotteryData({
        open_date: formatTime(this.curSelectTime, "YYYY-MM-DD"),
        code: this.curLotteryCode
      });
    },
    socketOpenResult: function() {
      if(this.socketOpenResult.code == this.curLotteryCode && formatTime(this.curSelectTime, "YYYY-MM-DD") == getCurTime("YYYY-MM-DD")) {
        // 拼接最新历史数据列表(两侧)
        let curlotteryDataObj = Object.assign(this.socketOpenResult.data,{expect: this.socketOpenResult.expect,open_datetime: this.socketOpenResult.open_datetime})       
        this.curlotteryData = [curlotteryDataObj, ...this.curlotteryData]
        // 拼接最新历史数据列表(开奖号码)
        let curlotteryDatasObj = this.socketOpenResult.data
        this.curlotteryDatas = [curlotteryDatasObj, ...this.curlotteryDatas]
        if(this.isLongDragon == 1) {
          this.curdragonData = this.socketLongDragon
        }
        if(this.isSidesTotal == 1) {
          this.sidesTotal = this.socketSidesTotal
        }
      }
    }
  },
  methods: {
    ...mapActions(["getLotteryData", "getLongDragon", "getSidesTotal"]),
    // 选择日期
    selectedTime() {
      this.getLotteryData({
        open_date: formatTime(this.curSelectTime, "YYYY-MM-DD"),
        code: this.curLotteryCode
      });
    },

    // 获取双面统计
    getSidesTotalFunc(code, date) {
      //清空双面统计数据 显示loading
      this.sidesTotal = []
      this.getSidesTotal({
        open_date: date,
        code: code
      }).then(res => {
        if (res.code == 200) {
          if(res.data.length == 0) {
            this.sidesTotalNoData = true
          }else {
            this.sidesTotalNoData = false
          }
          this.sidesTotal = res.data;
        }
      });
    },
    //计算是否标识对子号
    doubleNumberCount(index) {
      var res = [];
      // if(this.curlotteryDatas.length > 0 && this.curlotteryDatas[index].open_numbers != undefined) {
        var data = this.curlotteryDatas
        var selfData = data[index].open_numbers;
        var previewData, nextData;
        data[index - 1] ? (previewData = data[index - 1].open_numbers) : null;
        data[index + 1] ? (nextData = data[index + 1].open_numbers) : null;
        for (var i = 0; i < selfData.length; i++) {
          if (
            (previewData && selfData[i] == previewData[i]) ||
            (nextData && selfData[i] == nextData[i])
          ) {
            res.push(i);
          }
        }
      // }
      
      return res;
    },
    //大小单双分布按钮还原
    bigSmallSingalDoubleReset() {
      this.selectedOpenNumber = null;
      this.selectedNumberType = "reset";
    },
    numBtnClick(num) {
      this.selectedOpenNumber = this.selectedOpenNumber == num ? null : num;
      this.selectedNumberType = "reset";
    },
    resetSelectedNumber() {
      this.selectedOpenNumber = null;
    }
  },
  computed: {
    // 当前彩种的球号
    curLotteryNumbers() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.lottery_numbers
        }
      }
    },
    // 当前彩种的 location_name
    locationName() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.lottery_location_names
        }
      }
    },
    // 当前彩种双面数据
    sidesTotalField() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          return item.sides_total_field
        }
      }
    },
    // 判断是否有双面统计功能
    isSidesTotal() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          if(item.is_sides_total == 1) {
            this.getSidesTotalFunc(
              this.curLotteryCode,
              formatTime(this.curSelectTime, "YYYY-MM-DD")
            );
          }
          return item.is_sides_total
        }
      }
    },
    // 判断是否有长龙功能
    isLongDragon() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          if(item.is_long_dragon == 1) {
            this.getLongDragon({ code: this.curLotteryCode });
          }
          return item.is_long_dragon
        }
      }
    },
    ...mapGetters([
      "dragonData",
      "lotteryData",
      "lotteryDatas",
      "curLotteryCode",
      "historyTitle",
      "lotteryType",
      "lotteryCode",
      "screeningParameter",
      "socketOpenResult",
      "socketLongDragon",
      "socketSidesTotal",
      "lotteryCodes",
      "isNoContent",
      "dragonDataNoData"
    ]),
    showSpecialNumber() {
      //是否显示部分号码（点击查看球号分布、大小分布时启用）
      if (this.selectedOpenNumber || this.selectedNumberType) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.item-box{
  display: flex; justify-content:space-between;align-items:center;border: 1px solid #e5e5e5;
  li{
    text-align: center;flex:1;height: 34px;line-height: 34px;border-right: 1px solid #e5e5e5;
  }
  li:last-child{
    border-right: none
  }
}
.item-box-list{
  display: flex; justify-content:space-between;align-items:center;
  li{
    text-align: center;flex:1;display: flex;height: 34px;line-height: 34px;border: 1px solid #e5e5e5;border-top:none;border-right:none;
    span{
      flex:1;border-right: 1px solid #e5e5e5;
    }
    span:last-child{
    border-right: none;
  }
  }
  li:last-child{
    border-right: 1px solid #e5e5e5;
  }
}
.historyData {
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.titleBox {
  position: relative;
  label {
    display: inline-block;
    margin: 0 11px 10px 0;
    line-height: 25px;
    user-select: none;
    cursor: pointer;
    color: #666;
    b {
      display: inline-block;
      width: 12px;
      height: 12px;
      line-height: 15px;
      text-indent: 1px;
      border: 1px solid #c1c1c1;
      float: left;
      margin: 6px 6px 0 0;
      font-size: 13px;
      color: #999;
      svg {
        width: 80%;
        height: 100%;
        vertical-align: baseline;
        line-height: 15px;
      }
    }
  }
  .filterTime {
    float: right;
    position: absolute;
    right: 0;
    top: 0px;
    border: 1px solid #ddd;
    .datepicker {
      display: inline-block;
    }
    .timeBox {
      display: inline-block;
      border: 1px solid #ddd;
      position: relative;
      cursor: pointer;
      right: 0;
      top: -4px;
    }
    span.animated-placeholder {
      display: inline-block;
      float: left;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background: #f1f1f1;
    }
  }
}
.liangmian{
  // overflow: scroll hidden;
  .loading-img{
    text-align: center;
    img{
      height: 100px;
    }
  }
}
.changlong{
  .loading-img{
    text-align: center;
    img{
      height: 100px;
    }
  }
}
.liangmianTable,
.changlongTable {
  margin: 20px 0;
  width: 100%;
  text-align: center;
  border: 1px solid #e5e5e5;
  color: #666;
  th {
    font-weight: 400;
    text-align: left;
    padding: 5px;
    border: 1px solid #e5e5e5;
    background-color: #f9f9f9;
  }
  td {
    padding: 6px 0;
  }
}
.changlongTable {
  tr {
    // border: none;
    // border: 1px solid #e5e5e5;
  }
  td {
    padding: 0;border: 1px solid #e5e5e5;
    span {
      width: 20%;
      float: left;
      margin: 0 -1px -1px 0;
      border: 1px solid #e5e5e5;
      border-left: none;
      border-top: none;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    span:nth-child(5),span:nth-child(10),span:nth-child(15),span:nth-child(20){border-right: none};
  }
}
.dataTabs {
  width: 100%;
  margin: 40px 0 0 0;
  .numBtn,
  .classBtn {
    display: flex;
    margin: 20px 0;
    align-items: center;
  }
  a {
    padding: 4px 10px;
    margin: 2px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:hover {
      border-color: #e73f3f;
    }
  }
  .selectedA {
    background: #e73f3f;
    border-color: #e73f3f;
    color: #fff;
  }
  .text {
    width: 100px;
  }
  .btns {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
}
.dataTableContainer {
  padding: 10px 0 20px 0;
  width: 100%;
  .dataTable {
    width: 100%;
    text-align: center;
    border: 1px solid #e5e5e5;
    color: #666;
    tr:nth-of-type(1) {
      td {
        padding: 10px 0;
      }
    }
    td {
      padding: 6px;
      .btn {
        background: #aaa;
        color: #fff;
        padding: 4px 6px;
        margin: 0 2px;
        border-radius: 4px;
      }
      .active {
        background: #555;
      }
    }
    .no-content{font-size: 20px;color: #666;}
  }
}
</style>
