import * as types from './mutationsTypes'
import storage from "good-storage";

const mutations = {
  // loading
  [types.IMG_LOADING](state, data) {
    let name = data.name
    let show = data.show
    for(let item of state.imgLoading) {
      if(item.name == name) {
        item.show = show
      }
    }
  },

  // 是否暂无数据
  [types.IS_NO_CONTENT](state, data) {
    state.isNoContent = data;
  },
  [types.DRAGONDATA_NODATA](state, data) {
    state.dragonDataNoData = data;
  },

  // 当前彩种code
  [types.CUR_LOTTERY_CODE](state, code) {
    state.curLotteryCode = code;
    storage.set('PC_CUR_LOTTERY_CODE', code)      
  },

  // 当前彩种类型
  [types.CUR_LOTTERY_TYPE](state, type) {
    state.cur_lottery_type = type;
    storage.set('PC_CUR_LOTTERY_TYPE', type)
  },

  // 彩种编码
  [types.LOTTERY_CODES](state, list) {
    state.lotteryCodes = list;
  },
  // map彩种编码
  [types.DISPOSE_CODES_DATA](state, list) {
    state.disposeCodesData = list;
  },

  // 广告分组
  [types.AD_LIST](state, list) {
    state.adList = list;
  },

  // 基础数据
  [types.LOTTERY_DATA](state, list) {
    state.lotteryData = list;
  },
  // 获取基础数据--中间信息
  [types.LOTTERY_DATAS](state, list) {
    state.lotteryDatas = list;
  },

  // 基础配置数据
  [types.BASE_SETTING_BASE](state, obj) {
    state.baseSettingBase = obj;
  },
  [types.BASE_SETTING_LOTTERYDATA](state, obj) {
    state.baseSettingLotteryData = obj;
  },
  [types.BASE_SETTING_SYS](state, obj) {
    state.baseSettingSys = obj;
  },
  [types.BASE_SETTING_UPLOAD](state, obj) {
    state.baseSettingUpload = obj;
  },

  // 当前彩种开奖结果
  [types.OPEN_RESULT](state, obj) {
    state.openResult = obj;
  },

  // 历史开奖title
  [types.HISTORY_TITLE](state, list) {
    state.historyTitle = list;
  },

  //长龙数据
  [types.SAVE_CHANGLONG_DATA](state, list) {
    state.dragonData = list;
  },

  //websocket开奖结果
  [types.SOCKET_OPEN_RESULT](state, obj) {
    state.socketOpenResult = obj;
  },

  //websocket长龙
  [types.SOCKET_LONG_DRAGON](state, data) {
    state.socketLongDragon = data;
  },

  //websocket双面
  [types.SOCKET_SIDES_TOTAL](state, data) {
    state.socketSidesTotal = data;
  },
  //websocket冷热
  [types.SOCKET_COLD_HOT](state, data) {
    state.socketColdHot = data;
  },

  //websocket計劃
  [types.SOCKET_PLAN_RESULT](state, obj) {
    state.socketPlanResult = obj;
  },

  //websocket 时间
  [types.SOCKET_UPDATE_TIME](state, obj) {
    state.socketUpdateTime = obj;
  },

  //大小单双分布
  [types.SCREENING_PARAMETER](state, list) {
    state.screeningParameter = list;
  },

  //保存历史数据 code_type
  [types.LOTTERY_TYPE](state, code_type) {
    state.lotteryType = code_type;
  },
  //保存历史数据 code
  [types.LOTTERY_CODE](state, code) {
    state.lotteryCode = code;
  },

  //计划参数
  [types.NUMBER_PLAN_PARAMS](state, obj) {
    state.numberPlanParams = obj;
  }
};

export default mutations;
