<template>
    <div class="openResInfo">
        <div class="openInfo">
            <div class="imgBox">
                <img :src="codeLogo" alt="">
            </div>
            <div class="resInfo">
                <h1>
                    {{codeName}}
                    <span class="qs">{{curReslut.expect}}</span>
                    期
                </h1>
                <p v-show="isShowPeriods">当前<span class="drawCount">{{curReslut.today_expect}}</span>期，剩<span class="sdrawCountnext">{{curReslut.remaining_expect}}</span>期</p>
                <!-- 开奖号码 -->
                <open-code :isOPen="isOPen" class="openCode" :code="curReslut.code" :codeType="curReslut.code_type" :result="curReslut.open_numbers"/>
            </div>
            <div class="timeDown">
                <div class="openTimeTips">距<span>{{curReslut.next_expect}}</span>期开奖</div>
                <!-- 倒计时 -->
                <time-down  @callBackFunc="callBackFunc" :isLastQs="curReslut.remaining_expect" :time="nextOpenSeconds"/>
            </div>
        </div>
    </div>
</template>

<script>
import OpenCode from "./openCode/openCode";
import TimeDown from "./timeDown";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "openResInfo",
  props: {
    // 是否显示长龙
    isShowChangLong: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curReslut: {},
      isOPen: false
    };
  },
  methods:{
    ...mapActions(["chengecurLotteryCode"]),
    callBackFunc(isOpen){
      this.isOPen = isOpen;
    },
    goTo(code, path) {
      this.chengecurLotteryCode(code);
      this.$router.push(path);
    }
  },
  computed:{
    ...mapGetters(['socketOpenResult', 'socketUpdateTime', 'openResult', 'lotteryCodes']),
    // 是否显示当前期数和剩余期数
    isShowPeriods() {
      if(this.curReslut.code == 'hk6' || this.curReslut.code == 'fc3d' || this.curReslut.code == 'pl3') {
        return false
      } else {
        return true 
      }     
    },
    // 精确时间
    nextOpenSeconds() {
      if(this.socketUpdateTime.length == undefined) {
        return this.curReslut.next_open_seconds
      }else {
        for(let item of this.socketUpdateTime) {
          if(item.code == this.curReslut.code) {
            return item.next_open_seconds
          }
        }
      }      
    },
    // 单独显示彩种名称
    codeName() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curReslut.code) {
          return item.name
        }
      }
    },
    // 单独显示彩种logo
    codeLogo() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.curReslut.code) {
          return item.logo
        }
      }
    }
  },
  watch:{
    socketOpenResult:function(){
      if(this.socketOpenResult.code == this.curReslut.code){
        this.curReslut = this.socketOpenResult;
      }
    },
    openResult() {
      this.curReslut = this.openResult
    }   
  },
  components: {
    OpenCode,
    TimeDown
  }
};
</script>


<style lang="scss" scoped>
.openResInfo {
  padding: 15px;
  .openInfo {
    display: flex;
    .imgBox {
      width: 100px;
      height: 100px;
      margin-right: 15px;
      position: relative;
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 80%;
        max-height: 80%;
      }
    }
    .resInfo {
      flex: 1;
      .qs {
        color: orange;
      }
      p,
      h1 {
        display: inline-block;
      }
      p {
        margin-left: 15px;
        color: #8c8c8c;
      }
      .openCode {
        margin-top: 20px;
      }
    }
    .timeDown {
      // width: 175px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .openTimeTips{
          margin-bottom: 15px;
          color: #8c8c8c;
          span{
              color: orange;
              margin: 0 5px;
              font-weight: bold;
          }
      }
    }
  }
  .resTable {
    margin-top: 15px;
    table {
      width: 100%;
      background-color: #f5f5f5;
      td,
      th {
        line-height: 33px;
        font-size: 14px;
        text-align: center;
        border: 1px solid #ccc;
      }
      td {
        background: #fff;
      }
    }
  }
  .more {
    display: flex;
    justify-content: flex-end;
    line-height: 36px;
    a {
      color: #666;
      padding: 0 5px;
      margin: 0 5px;
      &:hover {
        color: orange;
      }
    }
  }
}
</style>
