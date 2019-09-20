<template>
  <div class="headerContainer">
    <div class="header">
      <div class="headContent pageWidth">
        <div class="logo">
          <img @click="hanldClick('curLink')" :src="imgUrl" title="logo" alt="logo" >
        </div>
        <ul class="nav">
          <router-link tag="li" to="/index"><i class="fa fa-home "></i>网站首页</router-link>
          <router-link tag="li" to="/trend"><i class="fas fa-chart-bar"></i>走势图表</router-link>
          <router-link tag="li" to="/live"><i class="fas fa-tv"></i>开奖直播</router-link>
          <router-link tag="li" to="/forecastOverview"><i class="fa fa-crosshairs"></i>精准计划</router-link>
          <li @click="hanldClick(baseSettingBase.wap_domain)"><i class="fas fa-mobile"></i>手机访问</li>
          <!-- <li @click="hanldClick(baseSettingData.recommend_url)"><i class="fa fa-thumbs-up"></i>本站推荐</li> -->
          <li @click="hanldClick(baseSettingLotteryData.speed_lottery_url)"><i class="fas fa-external-link-alt"></i>{{baseSettingLotteryData.speed_lottery_title}}</li>
          <li @click="hanldClick(baseSettingLotteryData.happy_lottery_url)"><i class="fas fa-external-link-alt"></i>{{baseSettingLotteryData.happy_lottery_title}}</li>
          <li v-if="mobile_app_url != ''" @click="hanldClick(baseSettingLotteryData.mobile_app_url)"><i class="fas fa-mobile"></i>手机APP</li>
        </ul>
      </div>
    </div>
    <div class="codeList" v-show="isShowCodeList">
      <div class="content pageWidth">
        <VNav :lotteryCodes="lotteryCodes"></VNav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VNav from "./VNav";
import { goImgUrl } from "assets/js/utils";
import storage from "good-storage";

export default {
  name: "VHeader",
  components: { VNav },
  props:{
    isShowCodeList:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mobile_app_url: ''
    }
  },
  methods: {
    hanldClick(url) {   
      if(url == 'curLink'){
        this.$router.push('/')
      }else{
        goImgUrl(url);
      }
    }
  },
  computed: {
    ...mapGetters(["baseSettingBase", "baseSettingLotteryData", "lotteryCodes"]),
    imgUrl() {
      if(storage.get('pc_headerImg') == undefined) {
        return this.baseSettingBase.site_logo
      }else {
        return storage.get('pc_headerImg')
      }
    }
  },
  watch: {
    'baseSettingLotteryData.mobile_app_url': {
      handler() {
        this.mobile_app_url = this.baseSettingLotteryData.mobile_app_url
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.headerContainer {
  width: 100%;
  .header {
    background-color: #393d49;
    .headContent {
      height: 60px;
      display: flex;
      .logo {
        width: 225px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        img{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          max-width: 90%;
          max-height: 90%;
        }
      }
    }
  }
  .nav {
    // background: #e73f3f;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 16px;
    line-height: 60px;
    li{
      color: #c4c5c9;
      text-align: center;
      flex: 1;
      cursor: pointer;
      &:hover{
        color: #fff;
      }
      svg{
        margin-right: 5px;
      }
    }
  }
  .codeList{
    background-color: #fff;
  }
}
</style>
