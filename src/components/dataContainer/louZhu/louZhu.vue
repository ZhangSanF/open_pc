<template>
  <div class="louZhu pageWidth">
    <div class="data">
      <div class="title">
        <div class="filterTop">
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(1)"
            :class="{'active':tabIndex == 1}"
          >综合模式</a>
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(2)"
            :class="{'active':tabIndex == 2}"
          >玩法模式</a>
          <a
            href="jacascript:void(0)"
            @click="changeTabIndex(3)"
            :class="{'active':tabIndex == 3}"
          >位置模式</a>

          <div class="filterTime">
            <div class="dayBox">
              <span :class="{'active':dayIndex==1}" @click="changeDayIndex(1)">今天</span>
              <span :class="{'active':dayIndex==2}" @click="changeDayIndex(2)">昨天</span>
              <span :class="{'active':dayIndex==3}" @click="changeDayIndex(3)">前天</span>
            </div>
            <div class="timeBox">
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
        </div>
      </div>

      <div class="trendFilter">
        <!-- 综合模式 -->
        <div class="box zonghe">
          <dl v-show="tabIndex == 1 ||  tabIndex == 2">
            <dt>筛选名次：</dt>
            <dd class="filter-mc clearfix">
              <label v-for="(item,index) in locationNameTitle" @click="checkedSingle(item)" :class="{'active':item.isChecked}" :key="index">
                <b>
                  <i v-show="item.isChecked">
                    <i class="fa fa-check"></i>
                  </i>
                </b>
                <span>{{item.location_name}}</span>
              </label>
              <div class="btn">
                <a href="javascript:;" @click="allChecked" class="chooseAll">全选</a>
                <a href="javascript:;" @click="clearChecked" class="cleanAll">清空</a>
              </div>
            </dd>
          </dl>
          <dl v-show="tabIndex == 3" class="ts-mc">
            <dt>筛选名次：</dt>
            <dd class="filter-mc filterLz">
              <a href="javascript:;" v-for="(item,index) in locationNameTitle" @click="onlyOneTitle(index)" :key="index" :class="{'active':item.isChecked}">{{item.location_name}}</a>
            </dd>
          </dl>
          <dl v-show="tabIndex == 1 || tabIndex == 3">
            <dt>选择路珠：</dt>
            <dd class="filter-lz">
              <label :class="{'active':dd.isLuzu}" v-for="(dd,k) in luzuPlayList" :key="'type'+k" @click="dd.isLuzu = !dd.isLuzu">
                <b>
                  <i v-show="dd.isLuzu">
                    <i class="fa fa-check"></i>
                  </i>
                </b>
                <span>{{dd.type_name}}</span>
              </label>
            </dd>
          </dl>
          <dl v-show="tabIndex == 2">
            <dt>选择路珠：</dt>
            <dd class="filterLz">
              <a
                :class="{'active':dd.isLuzu}" 
                v-for="(dd,k) in luzuPlayList" 
                :key="'type'+k" 
                @click="onlyOnePlayList(k)"
                href="javascript:;"
              >{{dd.type_name}}</a>
            </dd>
          </dl>
        </div>
      </div>
      <!-- 露珠走势 -->
      <div v-if="isNoContent" class="no-content">暂无数据</div>
      <div
        v-else
        v-for="(item,index) in glassBeadList"
        v-show="locationNameTitle[index].isChecked"
        :key="index"
      >
        <Trend
          v-show="luzuPlayList[key].isLuzu"
          :glassBeadList="glassBeadList"
          :list="obj"
          v-for="(obj,key) in item"
          :cIndex="key"
          :title="locationNameTitle"
          :pIndex="index"
          :key="key"
          :luzuList="luzuPlayList"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
import { mapActions, mapGetters } from "vuex";
import { getCurTime, formatTime, changeTime } from "@/assets/js/utils";
import Trend from "./trend";

export default {
  name: "louZhu",
  data() {
    return {
      curSelectTime: new Date(),
      tabIndex: 1, // 切换玩法索引
      dayIndex: 1, // 切换日期索引
      dateOption: {
        language: zh,
        format: "yyyy-MM-dd"
      },
      disabledDates: {
        from: new Date()
      },
      glassBeadList: [], // 露珠数据
      locationNameTitle: [],//标题
      luzuPlayList:[] //玩法
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getGlassBeadTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"));
      this.changeTabIndex(this.tabIndex);
    });
  },
  methods: {
    ...mapActions(["getGlassBeadTrend"]),

    // 单选
    checkedSingle(item) {
      item.isChecked = !item.isChecked;
    },

    // 单选名次 
    onlyOneTitle(index) {
      this.locationNameTitle.forEach((item, i) => {
        if (index == i) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
      });
    },

    // 单路珠选择
    onlyOnePlayList(index) {
      this.luzuPlayList.forEach((item, i) => {
        if (index == i) {
          item.isLuzu = true;
        } else {
          item.isLuzu = false;
        }
      });
    },

    // 重置名次 && 全选
    allChecked() {
      this.locationNameTitle = []
      this.setChecked()
    },

    // 重置露珠
    resetPlayList() {
      this.luzuPlayList = []
      this.setLuzu()
    },

    // 选择日期
    selectedTime() {
      if (formatTime(this.curSelectTime, "YYYY-MM-DD") == changeTime(new Date(), -1, "YYYY-MM-DD")) {
        this.dayIndex = 2;
      } else if (formatTime(this.curSelectTime, "YYYY-MM-DD") == changeTime(new Date(), -2, "YYYY-MM-DD")) {
        this.dayIndex = 3;
      }
      this.getGlassBeadTrendFunc(
        this.curLotteryCode,
        formatTime(this.curSelectTime, "YYYY-MM-DD")
      );
    },

    // 获取露珠
    getGlassBeadTrendFunc(code, date) {
      // 清空露珠数据 显示loading
      this.glassBeadList = []
      this.getGlassBeadTrend({ code: code, open_date: date }).then(res => {
        if (res.code == 200) {
          // 无数据状态
          if(res.data.list.length == 0) {
            this.$store.commit('IS_NO_CONTENT', true)
          }else {
            this.$store.commit('IS_NO_CONTENT', false)
          }
          this.glassBeadList = res.data.list;   
          this.test()      
        }
      });
    },

    //   切换玩法
    changeTabIndex(index) {
      if(index == 1) {
        this.allChecked()
        this.resetPlayList()
      } else if(index == 2) {
        this.allChecked()
        this.onlyOnePlayList(0);
      }else {
        this.onlyOneTitle(0);
        this.resetPlayList()
      }
      this.tabIndex = index;
    },

    // 切换日期
    changeDayIndex(index) {
      let date = formatTime(new Date(), "YYYY-MM-DD");
      if (index == 1) {
        date = formatTime(new Date(), "YYYY-MM-DD");
      } else {
        date = changeTime(new Date(), -(index - 1), "YYYY-MM-DD");
      }
      this.curSelectTime = date;
      this.getGlassBeadTrendFunc(this.curLotteryCode, date);
      this.dayIndex = index;
    },

    // 设置名次的 isChecked 选择状态
    setChecked() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          let lottery_location_names = item.lottery_location_names
          lottery_location_names.forEach((item, index) => {
            let obj = {'location_name': item, 'isChecked': true}
            this.locationNameTitle.push(obj);
            });
        }
      }
    },

    // 清除名次的 isChecked 选择状态
    clearChecked() {
      this.locationNameTitle = []
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          let lottery_location_names = item.lottery_location_names
          lottery_location_names.forEach((item, index) => {
            let obj = {'location_name': item, 'isChecked': false}
            this.locationNameTitle.push(obj);
            });
        }
      }
    },

    // 设置露珠的 isLuzu 选择状态
    setLuzu() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curLotteryCode) {
          let luzuPlayList = item.glass_bead_field
          luzuPlayList.forEach((item, index) => {
            let obj = {'type_name': item, 'isLuzu': true}
            this.luzuPlayList.push(obj);
          });
        }
      }
    },
    test(){
      //   for(let i=0; i<this.glassBeadList.length; i++) {
      //   // console.log(this.glassBeadList[i])
      //  for(let k=0; k<this.luzuPlayList.length; k++) {
        
      //       if(this.glassBeadList[i][k] != undefined){
      //           let type = 'big_small';
      //           switch(this.glassBeadList[i][k][0][0]){
      //             case '单':
      //               type = 'single_double';
      //               break;
      //             case '双':
      //               type = 'single_double';
      //               break;
      //             case '龙':
      //               type = 'dragon_tiger';
      //               break;
      //             case '虎':
      //               type = 'dragon_tiger';
      //               break;
      //           }
      //           if(this.glassBeadList[i][k][0][0] == [data][type][i]){

      //           }else{

      //           }
              
      //       }
      //     }
      //   }
    }
  },
  components: {
    Datepicker,
    Trend
  },
  computed: {
    ...mapGetters(["curLotteryCode", "socketOpenResult", "lotteryCodes", "isNoContent"])
  },
  watch: {
    lotteryCodes() {
      this.setChecked()
      this.setLuzu()
    },
    curLotteryCode: function() {
      this.getGlassBeadTrendFunc(this.curLotteryCode, getCurTime("YYYY-MM-DD"));
    },
    socketOpenResult: function() {
      if (
        this.socketOpenResult.code == this.curLotteryCode &&
        formatTime(this.curSelectTime, "YYYY-MM-DD") == getCurTime("YYYY-MM-DD")
      ) {
        for(let i=0; i<this.glassBeadList.length; i++) {
       for(let k=0; k<this.luzuPlayList.length; k++) {       
            if(this.glassBeadList[i][k] != undefined){
                let type = 'big_small';
                switch(this.glassBeadList[i][k][0][0]){
                  case '单':
                    type = 'single_double';
                    break;
                  case '双':
                    type = 'single_double';
                    break;
                  case '龙':
                    type = 'dragon_tiger';
                    break;
                  case '虎':
                    type = 'dragon_tiger';
                    break;
                }
                if(this.glassBeadList[i][k][0][0] == this.socketOpenResult.data[type][i]){
                      this.glassBeadList[i][k][0].unshift(this.socketOpenResult.data[type][i])
                }else{
                  let arr = []
                  arr.unshift(this.socketOpenResult.data[type][i])
                  this.glassBeadList[i][k].unshift(arr)
                }            
            }
          }
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.ts-mc{
      padding: 5px 0px 10px !important;
}
.loading-img{
  text-align: center
}
.no-content{text-align: center;font-size: 20px;color: #666;line-height: 50px;}
.louZhu {
  .data {
    padding: 20px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    .title {
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      .filterTop {
        overflow: auto;
        a {
          display: inline-block;
          width: 110px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
          font-size: 14px;
          color: #333;
          text-decoration: none;
          transition: all 0.3s;
          &:hover,
          &.active {
            background: #666;
            color: #fff;
          }
        }
      }
    }
    .filterTime {
      float: right;
      position: absolute;
      right: 0;
      top: 0px;
      .timeBox {
        display: inline-block;
        border: 1px solid #ddd;
        position: relative;
        right: 0;
        top: -4px;
        .datepicker {
          display: inline-block;
        }
        span {
          display: inline-block;
          float: left;
          padding: 0 10px;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          background: #f1f1f1;
        }
      }
      .dayBox {
        height: 28px;
        display: inline-block;
        margin-right: 20px;
        span {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          width: 45px;
          text-align: center;
          float: left;
          margin-left: 5px;
          margin-top: 6px;
          border-radius: 3px;
          font-size: 13px;
          cursor: pointer;
          &:hover,
          &.active {
            background: #e73f3f;
            color: #fff;
          }
        }
      }
      .datepicker {
        line-height: 30px;
      }
    }
    .trendFilter {
      padding: 15px 0 8px;
      font-size: 13px;
      dl {
        padding: 3px 0 0;
        overflow: hidden;
        line-height: 26px;

        dt {
          float: left;
          width: 72px;
        }
        dd {
          width: 888px;
          float: left;
          label {
            display: inline-block;
            margin: 0 11px 10px 0;
            user-select: none;
            cursor: pointer;
            &:hover {
              color: #e73f3f;
            }
            &.active {
              color: #e73f3f;
              border-color: #e73f3f;
              b {
                color: #e73f3f;
                border-color: #e73f3f;
              }
            }
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
          a {
            margin: 0 10px 0 0;
            color: #fff;
            width: 46px;
            display: inline-block;
            float: left;
            height: 24px;
            line-height: 24px;
            border-radius: 3px;
            border: 1px solid #e5e5e5;
            background: #fafafa;
            text-align: center;
          }
          &.filterLz {
            a {
              color: #666;
              &:hover,
              &.active {
                background: #fff7f7;
                border-color: #ffabab;
              }
            }
          }
          .btn {
            float: right;
            a {
              &.chooseAll {
                border-color: #666;
                background: #666;
              }
              &.cleanAll {
                background: #e73f3f;
                border-color: #e73f3f;
              }
              &:hover {
                opacity: 0.85;
              }
            }
          }
        }
      }
    }
  }
}
</style>
