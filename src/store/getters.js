import Vue from 'vue';
import storage from "good-storage";

// loading
export const imgLoading =state=> state.imgLoading;

// 是否暂无数据
export const isNoContent =state=> state.isNoContent;
export const dragonDataNoData =state=> state.dragonDataNoData;

// 当前彩种code
export const curLotteryCode =state=> {
    if(state.curLotteryCode == '') {
        return storage.get('PC_CUR_LOTTERY_CODE')
    }else {
        return state.curLotteryCode
    }
}

// 当前彩种类型
export const cur_lottery_type =state=> {
    if(state.cur_lottery_type == '') {
        return storage.get('PC_CUR_LOTTERY_TYPE')
    }else {
        return state.cur_lottery_type
    }
}

// 彩种编码
export const lotteryCodes =state=> state.lotteryCodes;

// 广告分组
export const adList =state=> state.adList;

// 基础数据
export const lotteryData =state=> state.lotteryData;
// 获取基础数据--中间信息
export const lotteryDatas =state=> state.lotteryDatas;

// 基础配置数据
export const baseSettingBase =state=> state.baseSettingBase;
export const baseSettingLotteryData =state=> state.baseSettingLotteryData;
export const baseSettingSys =state=> state.baseSettingSys;
export const baseSettingUpload =state=> state.baseSettingUpload;

// 当前彩种开奖结果
export const openResult =state=> state.openResult;

// 历史开奖title
export const historyTitle =state=> {
    state.historyTitle && state.historyTitle.forEach(item=>{
        if(!Array.isArray(item)){
            let len = state.lotteryData.length>0 ? state.lotteryData[0][item.type].length : 0;
            Vue.set(item,'len',len);
        }
    });
    return state.historyTitle;
};

// 保存历史数据 code_type
export const lotteryType =state=> state.lotteryType;
// 保存历史数据 code
export const lotteryCode =state=> state.lotteryCode;

//长龙数据
export const dragonData =state=> state.dragonData;

//websocket开奖结果
export const socketOpenResult =state=> state.socketOpenResult;

//websocket长龙
export const socketLongDragon =state=> state.socketLongDragon;

//websocket双面
export const socketSidesTotal =state=> state.socketSidesTotal;

//websocket冷热
export const socketColdHot =state=> state.socketColdHot;

//websocket計劃
export const socketPlanResult =state=> state.socketPlanResult;

//websocket 时间
export const socketUpdateTime =state=> state.socketUpdateTime;

//大小单双分布
export const screeningParameter =state=> state.screeningParameter;

// 计划参数
export const numberPlanParams =state=> state.numberPlanParams;