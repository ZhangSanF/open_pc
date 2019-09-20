
const state = {
    // loading
    imgLoading:[
        {name: 'preciseNumberPlan', show: false}
    ],
    // 是否暂无数据
    isNoContent: false,
    dragonDataNoData: false,
    // 当前彩种code
    curLotteryCode: '',
    // 当前彩种类型
    cur_lottery_type: '',
    // 彩种编码
    lotteryCodes: [],
    // 广告列表
    adList: [],
    // 基础数据
    lotteryData: [],
    // 获取基础数据--中间信息
    lotteryDatas: [],
    // 基础配置数据
    baseSettingBase: {},
    baseSettingLotteryData: {},
    baseSettingSys: {},
    baseSettingUpload: {},
    //长龙数据
    dragonData: [],
    // 当前彩种开奖结果
    openResult: {},
    // websocket开奖结果
    socketOpenResult: {},
    // websocket长龙
    socketLongDragon: [],
    // websocket双面
    socketSidesTotal: [],
    // websocket冷热
    socketColdHot: [],
    // websocket計劃
    socketPlanResult: {},
    // websocket 时间
    socketUpdateTime: {},
    // 历史开奖title
    historyTitle: [],
    // 保存历史数据 code_type
    lotteryType: '',
    // 保存历史数据 code
    lotteryCode: '',
    // 大小单双分布
    screeningParameter:[],
    // 计划参数
    numberPlanParams: {expertId: 0, location: 0, forecastQuantity: 0}
};

export default state;
