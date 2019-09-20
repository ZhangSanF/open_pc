/*
 * @name: 接口链接
 * @Author: a.rui 
 * @Date: 2018-09-05 16:47:30 
 * @Last Modified by: a.rui
 * @Last Modified time: 2019-04-20 18:41:07
 */
export function test(){
    return {
        url: `/v1/tests/index`,
        isOpenLoading: false
    }
}
//  获取Token Code
export function getAccessTokenAPI(){
    return {
        url: `/oauth/token`,
        isOpenLoading: false
    }
}

//  获取基础数据
export function getLotteryDataAPI(){
    return {
        url: `/v1/lotteryData`,
        isOpenLoading: false
    }
}
//  获取基础数据--中间信息
export function getLotteryDatasAPI(){
    return {
        url: `/v1/LotteryDataOpenNumbers`,
        isOpenLoading: false
    }
}

//  获取文章列表
export function getArticlesAPI(){
    return {
        url: `/v1/articles`,
        isOpenLoading: false
    }
}

//  获取文章详情
export function getArticlesInfoAPI(id){
    return {
        url: `/v1/articles/${id}`,
        isOpenLoading: false
    }
}

//  获取双面统计
export function getSidesTotalAPI(){
    return {
        url: `/v1/sidesTotal`,
        isOpenLoading: false
    }
}

//  获取长龙提醒
export function getLongDragonAPI(){
    return {
        url: `/v1/longDragon`,
        isOpenLoading: false
    }
}

//  获取基本趋势-统计 
export function getBasicTrendAPI(){
    return {
        url: `/v1/basicTrend`,
        isOpenLoading: false
    }
}

//  广告分组
export function getAdCategoryAPI(){
    return {
        url: `/v1/adCategory`,
        isOpenLoading: false
    }
}

//  广告列表
export function getAdvertisementAPI(){
    return {
        url: `/v1/advertisement`,
        isOpenLoading: false
    }
}

//  彩种编码
export function getLotteryCodesAPI(){
    return {
        url: `/v1/lotteryCodes`,
        isOpenLoading: false
    }
}

//  路珠走势 
export function getGlassBeadTrendAPI(){
    return {
        url: `/v1/glassBeadTrend`,
        isOpenLoading: false
    }
}

//  开奖信息 
export function getLotteryExpectAPI(){
    return {
        url: `/v1/lotteryExpect`,
        isOpenLoading: false
    }
}

//  基础参数 
export function getSettingAPI(){
    return {
        url: `/v1/setting`,
        isOpenLoading: false
    }
}

//  冷热号码 
export function getColdAndHotNumbersAPI(){
    return {
        url: `/v1/coldAndHotNumbers`,
        isOpenLoading: false
    }
}

//  预测计划 
export function getForecastPlanAPI(){
    return {
        url: `/v1/ForecastPlan`,
        isOpenLoading: false
    }
}

//  首页预测计划 
export function getForecastPlanIndexAPI(){
    return {
        url: `/v1/ForecastPlanIndex`,
        isOpenLoading: false
    }
}

//  预测计划 -- 概貌 
export function getforecastOverviewAPI(){
    return {
        url: `/v1/forecastOverview`,
        isOpenLoading: false
    }
}

//  预测计划-排行榜
export function getForecastRankingAPI(){
    return {
        url: `/v1/ForecastRanking`,
        isOpenLoading: false
    }
}