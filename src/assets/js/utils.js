import moment from "moment";

export function formatTimer(second, type) {
  type = type || 0;
  if (second < 0) return 0;

  let day = ~~(second / (24 * 60 * 60));
  second = second - day * 24 * 60 * 60;
  let hour = ~~(second / (60 * 60));
  second = second - hour * 60 * 60;
  let min = ~~(second / 60);
  second = second - min * 60;
  if (type == 0) {
    // 天
    if (day > 0) day = day + "天";
    else day = "";

    // 小时
    if (hour > 0) hour = hour + "小时";
    else hour = "";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min + "分";
    } else if (min <= 0) {
      min = "00" + "分";
    } else {
      min += "分";
    }
    // 秒
    if (second < 10) second = "0" + second;
    return day + hour + "" + min + second + "秒";
  } else {
    // 天
    if (day > 0) day = day + type;
    else day = "";

    // 小时
    if (hour > 0) hour = hour + type;
    else hour = "";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min + type;
    } else if (min <= 0) {
      min = "00" + type;
    } else {
      min += type;
    }
    // 秒
    if (second < 10) second = "0" + second;
    return day + hour + "" + min + second;
  }
}

export function formatTimerCallback(second) {
  if (second < 0) return 0;

  let day = ~~(second / (24 * 60 * 60));
  second = second - day * 24 * 60 * 60;
  let hour = ~~(second / (60 * 60));
  second = second - hour * 60 * 60;
  let min = ~~(second / 60);
  second = second - min * 60;
  
    // 天
    if (day > 0) day = day + "";
    else day = "";

    // 小时
    if (hour > 0) hour = hour ;
    else hour = "00";

    // 分钟
    if (min < 10 && min > 0) {
      min = "0" + min ;
    } else if (min <= 0) {
      min = "00";
    } else {
      min;
    }
    // 秒
    if (second < 10) second = "0" + second;
    return {
      day:day,
      hour:hour,
      min:min,
      second:second
    };
}

//对象清空
export function clearObject(obj){
  let newObj = {};
  for(let i in obj){
    newObj[i] = '';
  }
  return newObj;
}

//非空验证(对象)
export function verifyNotNull(obj){
  for(let i in obj){
    if(obj[i] == ""){
      return false;
    }
  }
  return true
}

// 数组去重
export function unique (arr) {
  return Array.from(new Set(arr))
}


// 获取当前日期
export function getCurTime(format){
  return moment().format(format);
}

// 格式化当前日期
export function formatTime(data,format){
  return moment(data).format(format);
}

// 改变时间
export function changeTime(data,num,format){
  return moment(data).add(num,'days').format(format);
}

// 广告图片跳转
export function goImgUrl(url) {
  if (url == '' || url == undefined) {
    return 
  } else {
    window.open(url);
  } 
}

/**
 * 
 * @param {是要操作的数值} num 
 * @param {是要保留几位小数} p 
 */
export function keepTwoDecimalFull(num, p) {
      let result = parseFloat(num);
      if (isNaN(result)) {
        // return false  如果不是数字，返回自己
         return num;
      }
      let multiplicator = Math.pow(10, p);
      result = Math.round(num * multiplicator) / multiplicator;

      let s_x = result.toString();
      let pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
              pos_decimal = s_x.length;
              s_x += '.';
      }

      while (s_x.length <= pos_decimal + p) {
              s_x += '0';
      }
      return s_x;
}