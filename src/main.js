// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import * as socketApi from './api/sockt';
import { getCurTime } from "@/assets/js/utils";

Vue.prototype.socketApi = socketApi

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAwesomeSwiper)




import 'assets/css/main.scss'
import{mapGetters} from 'vuex';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {

    // 获取access token
    store.dispatch('getAccessToken')
    .then(res => {
      if(res == 404){
        this.$router.push('/page404');
      }
    });
  },
  computed: {
    ...mapGetters(['baseSettingSys','curLotteryCode'])
  },
  watch: {
    baseSettingSys:function(){
      this.socketApi.initWebSocket(this.baseSettingSys.websocket_client);
      this.socketApi.sendSock('test',this.getConfigResult);   
    }
  },
  methods: {
    getConfigResult(result){
      if(result.type == 'lottery_data'){
        store.commit('SOCKET_OPEN_RESULT', result.data)
        //长龙
        store.commit('SOCKET_LONG_DRAGON', result.long_dragon)
        //双面
        store.commit('SOCKET_SIDES_TOTAL', result.sides_total)
        //冷热
        store.commit('SOCKET_COLD_HOT', result.cold_and_hot)
      }
      if(result.type == 'max_forecast_plan'){
        store.commit('SOCKET_PLAN_RESULT', result.data)
      }
      if(result.type == 'next_open_time') {
        store.commit('SOCKET_UPDATE_TIME', result.data)
      }
    }
  }
})
