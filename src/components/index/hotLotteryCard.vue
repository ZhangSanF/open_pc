<template>
    <ul class="hot">
        <li>
          <dl>
            <dt>
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">
                <img :src="codeLogo" width="100">
              </a>
            </dt>
            <dd>
              <span class="getName">
                <strong>
                  <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">{{codeName}}</a>
                </strong>
                <em>
                  第
                  <b id="qihao" class="col6">{{curReslut.expect}}</b>期
                </em>
              </span>
              <span class="getQ" v-if="isShowPeriods">
                全天共
                <b class="col6" id="total">{{curReslut.today_expect+curReslut.remaining_expect}}</b>期,剩余
                <b class="col6" id="remain">{{curReslut.remaining_expect}}</b>期
              </span>
              <span style="height: 21px" class="getQ" v-if="!isShowPeriods"></span>
              <time-down :isLastQs="curReslut.remaining_expect" :time="nextOpenSeconds"/>
            </dd>
            <div class="link">
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/historyData')">开奖记录</a>
              <a href="javascript:;" @click="goTo(curReslut.code, '/Data/trendChart')">走势图表</a>
            </div>
          </dl>
        </li>
    </ul>
</template>

<script>
import TimeDown from "base/timeDown";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        TimeDown
    },
    props: ['result'],
    data() {
        return {
            curReslut: this.result,
            nextOpenSeconds: this.result.next_open_seconds
        };
    },
    computed: {
        ...mapGetters(['socketOpenResult', 'socketUpdateTime', 'lotteryCodes']),
        // 是否显示当前期数和剩余期数
        isShowPeriods() {
          if(this.curReslut.code == 'hk6' || this.curReslut.code == 'fc3d' || this.curReslut.code == 'pl3') {
            return false
          } else {
            return true 
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
    methods: {
        ...mapActions(['chengecurLotteryCode']),
        goTo(code, path) {
          this.chengecurLotteryCode(code);
          this.$router.push(path);
        }
    },
    mounted() {

    },
    watch:{
        result() {
            this.curReslut = this.result;           
        },
        socketOpenResult() {
            if(this.socketOpenResult.code == this.curReslut.code){
                this.curReslut = this.socketOpenResult;
            }
        },
        socketUpdateTime() {
          for(let item of this.socketUpdateTime) {
              if(item.code == this.curReslut.code) {
                  this.nextOpenSeconds = item.next_open_seconds
              }
          }
        },
        curReslut() {
          this.nextOpenSeconds = this.curReslut.next_open_seconds
        }
    }
};
</script>


<style lang="scss" scoped>
  .hot {
        width: 33.33%;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        // &:nth-child(3n + 2) {
        //     border-left: 1px solid #e6e6e6;
        //     border-right: 1px solid #e6e6e6;
        // }
    li {
      dl {
        overflow: hidden;
        height: 163px;
        dt {
          float: left;
          width: 110px;
          height: 126px;
          text-align: center;
          img {
            margin-left: 8px;
            margin-top: 7px;
            width: 80%;
          }
        }
        dd {
          float: left;
          height: 126px;
          span {
            display: block;
          }
          span.getName {
            padding-bottom: 8px;
            border-bottom: 1px dashed #eee;
            margin-bottom: 10px;
            strong {
              color: #555;
              font-weight: 400;
              margin-right: 10px;
            }
            em {
              color: #666;
              font-style: normal;
            }
          }
          b {
            color: #f02f22;
            font-style: normal;
            font-weight: 400;
          }
          span.getQ {
            color: #999;
            margin-bottom: 15px;
            padding-left: 10px;
          }
        }
        div.link {
          clear: both;
          text-align: center;
          a {
            display: inline-block;
            color: #555;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            width: 88px;
            height: 33px;
            line-height: 33px;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
      }
    }
  }

</style>
