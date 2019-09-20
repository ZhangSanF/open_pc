<template>
  <div id="app">
    <router-view/>
    <div class="video" v-if="videoUrl != ''">
      <div class="video-close" @click="closeVideo">╳</div>
      <video height="200px" controls="controls" muted autoplay="autoplay" :src="videoUrl"></video>
    </div>
    <div 
    class="app-img-server" 
    v-if="serverUrl != ''" 
    :class="baseSettingBase.service_url_location == '1' ? 'app-img-server-left' : 'app-img-server-right'"
    @click="blankServer"
    >
      <img src="./assets/images/right.png" alt="">
      <img class="app-goUrl" src="./assets/images/chat.png" alt="">
      <img @click="serverClose" class="app-close" src="./assets/images/close.png" alt="">
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { constants } from 'crypto';

export default {
  name: 'App',
  data() {
    return {
      videoUrl: '',
      serverUrl: ''
    }
  },
  mounted(){
    this.getLotteryCodes()
  },
  methods:{
    htmlDecodeByRegExp (str){  
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&amp;/g,"&");
      s = s.replace(/&lt;/g,"<");
      s = s.replace(/&gt;/g,">");
      s = s.replace(/&nbsp;/g," ");
      s = s.replace(/&#39;/g,"\'");
      s = s.replace(/&apos;/g,"\'");
      s = s.replace(/&quot;/g,"\"");
      s = s.replace(/<br\/>/g, "\n");
      return s;  
    },
    ...mapActions(['getLotteryCodes']),
    closeVideo() {
      this.videoUrl = ''
    },
    blankServer() {
      if(this.serverUrl != '') {
        window.open(this.serverUrl)
      }
    },
    serverClose() {
      this.serverUrl = ''
    }
  },
  computed: {
    ...mapGetters(['baseSettingBase'])
  },
  watch: {
    // 客服第三方浮窗
    'baseSettingBase.service_code': {
      handler(val) {
        setTimeout(() => {
          let c = document.createElement('script');
          c.src = val;
          let s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(c, s);
        },2000) 
      }
    },
    // 客服第三方跳转
    'baseSettingBase.service_url': {
      handler(val) {
        this.serverUrl = this.htmlDecodeByRegExp(val)
      }
    },
    // 站点统计
    'baseSettingBase.site_statis': {
      handler(val) {
        setTimeout(() => {
          let c = document.createElement('script');
          c.src = val;
          let s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(c, s);
        },2000)       
      }
    },
    // 视频
    'baseSettingBase.video_url': {
      handler() {
          this.videoUrl = this.baseSettingBase.video_url
      }
    }
  }
}
</script>

<style>
.video-close{
  position: absolute;right: 5px;color: #fff;z-index: 9999999;font-size: 18px;width: 20px;text-align: center;cursor: pointer;
}
.video{
  position: fixed;left: 0;bottom: 0;z-index: 888;
}
.app-img-server{
  cursor: pointer;
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
}
.app-img-server-left{
  left: 0;
}
.app-img-server-right{
  right: 0;
}
.app-goUrl{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 80px;
}
.app-close{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 2px;
  z-index: 10;
}
</style>
