import * as types from './mutationsTypes';
import * as api from '@/api/api';
import { saveAccessToken } from '@/assets/js/cache';
import { getCurTime } from "@/assets/js/utils";
import Vue from 'vue'
import storage from "good-storage";

export const getTest = ({
  commit,
  state
}) => {
  return api.getTest();
}
// 修改当前彩种code 
export const chengecurLotteryCode = ({
  commit,
  state
}, code) => {
  commit(types.CUR_LOTTERY_CODE, code);
}

// 修改当前彩种类型
export const chenge_cur_lootery_type = ({
  commit,
  state
}, type) => {
  commit(types.CUR_LOTTERY_TYPE, type);
}


// 获取access token
export const getAccessToken = ({
  commit,
  state,
  dispatch
}) => {
  return api.getAccessToken().then((res) => {
    if (res.code == 200) {
      // 保存assess token
      saveAccessToken(res.data.access_token);

      // 获取基础参数
      dispatch('getSetting');

      // 彩种编码
      // dispatch('getLotteryCodes');

    } else {
      return 404;
    }
  }).catch(e => {
    // return 408;
  });
}

// 获取基础数据
export const getLotteryData = ({
  commit,
  state
}, params) => {
  commit(types.LOTTERY_DATAS, []);
  return api.getLotteryData(params).then((res) => {
    if (res.code == 200) {
      // 无数据状态
      if(res.data.rows.length == 0) {
        commit(types.IS_NO_CONTENT, true);
      }else {
        commit(types.IS_NO_CONTENT, false);
      }
      // 保存基础数据
      commit(types.LOTTERY_DATA, res.data && res.data.rows);
      // 保存历史数据 code
      commit(types.LOTTERY_CODE, res.data && res.data.code);
      // 保存历史数据 code_type
      commit(types.LOTTERY_TYPE, res.data && res.data.code_type);
      // 保存历史开奖title
      commit(types.HISTORY_TITLE, res.data && res.data.history_data_fields);
      // 保存当前彩种大小单双分布
      commit(types.SCREENING_PARAMETER, res.data && res.data.screening_parameter);
      // 判断如果有数据就加载 获取基础数据--中间信息     
      if(res.data.rows.length > 0) {
        api.getLotteryDatas(params).then((res) => {
          if(res.code == 200) {
            commit(types.LOTTERY_DATAS, res.data.rows);
          }
        })
      }
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取文章列表
export const getArticles = ({
  commit,
  state
}, params) => {
  return api.getArticles(params);
}


// 获取文章详情
export const getArticlesInfo = ({
  commit,
  state
}, id) => {
  return api.getArticlesInfo(id);
}

// 获取双面统计
export const getSidesTotal = ({
  commit,
  state
}, params) => {
  return api.getSidesTotal(params);
}

// 获取长龙提醒
export const getLongDragon = ({
  commit,
  state
}, params) => {
  commit(types.SAVE_CHANGLONG_DATA, []);
  return api.getLongDragon(params).then((res) => {
    if (res.code == 200) {
      // todo
      // 无数据状态
      if(res.data.length == 0) {
        commit(types.DRAGONDATA_NODATA, true);
      }else {
        commit(types.DRAGONDATA_NODATA, false);
      }
      commit(types.SAVE_CHANGLONG_DATA, res.data);
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 获取基本趋势-统计
export const getBasicTrend = ({
  commit,
  state
}, params) => {
  return api.getBasicTrend(params)
}

// 广告列表
export const getAdvertisement = ({
  commit,
  state
}, params) => {
  return new Promise((resove, reject) => {
    api.getAdvertisement(params).then((res) => {
      if (res.code == 200) {
        commit(types.AD_LIST,res.data);
      } else {
        //console.log(res)
      }
    }).catch(e => {
      //console.log(e)
    });
  });
  

}

// 彩种编码
export const getLotteryCodes = ({
  commit,
  state
}, params) => {
  return api.getLotteryCodes(params).then((res) => {
    if (res.code == 200) {
      commit(types.LOTTERY_CODES, res.data);
      if(storage.get('PC_CUR_LOTTERY_CODE') == undefined || storage.get('PC_CUR_LOTTERY_TYPE') == undefined) {
        commit('CUR_LOTTERY_CODE', res.data[0].code);
        commit('CUR_LOTTERY_TYPE', res.data[0].code_type);
      }
      //console.log(res)
    } else {
      //console.log(res)
    }
  }).catch(e => {
    //console.log(e)
  });
}

// 路珠走势
export const getGlassBeadTrend = ({
  commit,
  state
}, params) => {
  return api.getGlassBeadTrend(params);
}

// 开奖信息
export const getLotteryExpect = ({
  commit,
  state
}, code) => {
  api.getLotteryExpect(code).then(res => {
    if (res.code == 200) {
      commit(types.OPEN_RESULT,res.data);
    }
  });;
}

// 基础参数
export const getSetting = ({
  commit,
  state
}) => {
  api.getSetting().then(res => {
    if (res.code == 200) {
      document.title = res.data.base.site_title;
      document.querySelector('#favicon').setAttribute('href',res.data.base.site_favicon);
      // base
      commit(types.BASE_SETTING_BASE, res.data.base);
      // lottery_data
      commit(types.BASE_SETTING_LOTTERYDATA, res.data.lottery_data);
      // sys
      commit(types.BASE_SETTING_SYS, res.data.sys);
      // upload
      commit(types.BASE_SETTING_UPLOAD, res.data.upload);
      // logo 存入 storage
      if(storage.get('pc_headerImg') == undefined) {
        storage.set('pc_headerImg', res.data.base.site_logo)
      }else {
        if(storage.get('pc_headerImg') == res.data.base.site_logo) {
          return
        } else {
          storage.set('pc_headerImg', res.data.base.site_logo)
        }
      }
    } else {
      // todo
    }
  });
}

// 冷热号码
export const getColdAndHotNumbers = ({
  commit,
  state
}, code) => {
  return api.getColdAndHotNumbers(code);
}

// 预测计划
export const getForecastPlan = ({
  commit,
  state
}, params) => {
  return api.getForecastPlan(params);
}

// 首页预测计划
export const getForecastPlanIndex = ({
  commit,
  state
}, params) => {
  return api.getForecastPlanIndex(params);
}

// 预测计划 -- 概貌 
export const getforecastOverview = ({
  commit,
  state
}, code) => {
  commit(types.IMG_LOADING, {name: 'preciseNumberPlan', show: true});
  return api.getforecastOverview(code);
}

// 预测计划-排行榜
export const getForecastRanking = ({
  commit,
  state
}, code) => {
  return api.getForecastRanking(code);
}