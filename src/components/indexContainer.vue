<template>
  <div class="indexContainer">
    <!-- 头部 -->
    <v-header></v-header>

    <!-- 具体内容页面 -->
    <div class="container pageWidth">
      <div class="advertisement">
        <img :src="item.img" alt="" v-for="(item, index) of adList.rows" :key="index" @click="go(item.url)">
      </div>
      <router-view/>
    </div>

    <!-- 推送 -->
    <div class="push">
      <transition-group name="fade" tag="div">
        <p class="item" @click="goTo(item.code, item.expert_id, item.location, item.forecast_quantity)" v-for="(item, index) in pushArr"  :key="index">通知：{{codesName[index]}}出现【{{item.last_count}}中{{item.result_sum}}】
          <span class="info">查看</span>
        </p>
      </transition-group>  
    </div>

    <!-- 页脚 -->
    <v-footer class="footer"></v-footer>
  </div>
</template>

<script>
import VHeader from './header/VHeader'
import VFooter from './footer/VFooter'
import { mapActions, mapGetters } from 'vuex';
import { goImgUrl } from "@/assets/js/utils";

export default {
  name: 'indexContainer',
  components: {VHeader,VFooter},
  data () {
    return {
      pushArr: [],
      codesName: []
    }
  },
  created(){ 
    //获取首页通栏广告
    this.getAdvertisement({ad_category_identification: 'headAd'})
  },
  computed: {
    ...mapGetters(['socketPlanResult', 'lotteryCodes', 'adList'])
  },
  methods:{
    ...mapActions(['getAdvertisement', 'chengecurLotteryCode']),
    go(url) {
      goImgUrl(url)
    },
    goTo(code, expertId, location, forecastQuantity) {
      this.chengecurLotteryCode(code);
      this.$store.commit('NUMBER_PLAN_PARAMS', { expertId, location, forecastQuantity})
      this.$router.push({name: 'numberPlan'}) 
    },
  },
  watch: {
    socketPlanResult() {
      for(let item of this.lotteryCodes) {
        if(item.code == this.socketPlanResult.code) {
          if(item.is_forecast_rule == 1) {
            this.codesName.push(item.name)
            this.pushArr.push(this.socketPlanResult)
            if(this.pushArr.length > 3) {
              this.pushArr.shift()
            }
            if(this.codesName.length >3) {
              this.codesName.shift()
            }
          }
        }
      }     
    },
    pushArr() {
      let _this = this
      setTimeout(() => {
        if(_this.pushArr.length != 0) {
          _this.pushArr.shift()
        }
        if(_this.codesName.length != 0) {
          _this.codesName.shift()
        }
      },10000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .indexContainer {
    margin: 0 auto;
    .advertisement {
      // padding-top:15px;
      padding: 15px 0;
      width: 100%;
      font-size: 0;
      img {
        cursor: pointer;
        width: 100%;
        // margin-bottom: 15px;
      }
    }
    .push{
      position: fixed;bottom: 10px;right: 0;color: hsla(0,0%,100%,.7);height: 142px;width: 290px;
      .item{
        position:absolute;right: 0;cursor: pointer;
        background: #565c70;line-height: 42px;width: 290px;font-size: 15px;border-radius: 5px;opacity: 1;text-align: center;
        margin-bottom: 5px;
        .info{color: #FFFF00;} 
      }
      .item:nth-child(1){
        top: 0;
      }
      .item:nth-child(2){
        top: 47px;
      }
      .item:nth-child(3){
        bottom: 0;
      }
      .fade-enter-active, .fade-leave-active {
        transition: all .5s
      }
      .fade-enter, .fade-leave-active {
        opacity: 0;right: -290px;
      }
    }
  }
</style>
