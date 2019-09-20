<template>
  <div class="liveBox" v-if="curReslut.is_live">
    <div class="imgBox" @click="toPage(curReslut)">
      <img :src="codeLogo" alt>
    </div>
    <div class="nameBox">{{codeName}}开奖直播</div>
    <div class="tipsBox">{{curReslut.live_description}}</div>
    <div class="timeDownBox">
      距下期开奖:<time-down :isLastQs="curReslut.remaining_expect" :time="nextOpenSeconds"/>
    </div>
  </div>
</template>

<script>
import timeDown from "./timeDown";
import { mapGetters } from "vuex";

export default {
  name: "liveBox",
  props: ["result"],
  data() {
    return {
      curReslut: this.result,
      nextOpenSeconds: this.result.next_open_seconds
    };
  },
  components: {
    timeDown
  },
  methods:{
      toPage(item){
          if(item.code == 'cqklsf'){
              this.$router.push('/Data/liveVideo/xync/'+item.code);
          }else{
              this.$router.push('/Data/liveVideo/'+item.code_type+'/'+item.code);
          }
          
      }
  },
  computed: {
    ...mapGetters(["socketOpenResult", "socketUpdateTime", "lotteryCodes"]),
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
  watch: {
    result: function() {
      this.curReslut = this.result;
    },
    socketOpenResult: function() {
      if (this.socketOpenResult.code == this.curReslut.code) {
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
.liveBox {
  width: 23%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .imgBox {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .nameBox {
    font-size: 14px;
    text-align: center;
    margin: 15px 0;
    color: #333;
  }
  .tipsBox {
    padding: 0 20px;
    margin: 15px 0;
    height: 65px;
    text-indent: 24px;
    overflow: hidden;
  }
  .timeDownBox{
      display: flex;
      font-size: 14px;
      align-items: center;
  }
}
</style>
