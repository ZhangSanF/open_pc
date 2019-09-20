/*
 * @Author: a.rui 
 * @Date: 2018-09-05 17:26:53 
 * @Last Modified by: a.rui
 * @Last Modified time: 2019-04-16 14:56:05
 */
import axios from "axios";
import Vue from "vue"
import store from '@/store';

import router from '@/router';
import { loadAccessToken } from '@/assets/js/cache';
import { getCurTime } from "@/assets/js/utils";


let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.maxRedirects = 8;
//请求拦截器
axios.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          window.location.reload();
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          router.push('/page408')
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      if (error.message == "操作取消") {
        return
      }
      // else{
      //   error.msg = "请求超时,请刷新请重试";
      // }
    }
    return Promise.resolve(error);
  }
);


axios.defaults.baseURL = "/";
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "X-Requested-With": "XMLHttpRequest",
  "Format": "json"
};
axios.defaults.timeout = 25000;

let urlTimer = {};
export default {
  //get请求
  get(urlObj, param) {
    if (urlObj.isOpenLoading) {
      // todo 待实现
    }
    return new Promise((resolve, reject) => {
      clearTimeout(urlTimer[urlObj.url]);
      urlTimer[urlObj.url] = setTimeout(function () {
        axios({
          method: "get",
          url: urlObj.url,
          params: param,
          headers: {
            "Access-Token": loadAccessToken(),
            "Timestamp": getCurTime('YYYY-MM-DD HH:mm:ss'),
          },
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          // console.log(res)
          if (res) {
            resolve(res && res.data);
          }
        });
      }, 500)

    });
  },
  //post请求
  post(urlObj, param, isChangeHeader = false) {
    if (urlObj.isOpenLoading) {
      // todo 待实现
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: urlObj.url,
        data: param,
        headers: isChangeHeader == false ? { "Content-Type": "application/json;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" } : { 'Content-Type': 'multipart/form-data' },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res && res.data) {
          if (res.data.resCode == 1004 && store.getters.stateUsername) {
            Vue.$vux.alert.show({
              title: '提示',
              content: '当前登录信息失效，请您重新登录！',
              onHide() {
                window.location.reload();
              }
            });
            return;
          } else if (res.data.resCode == 1006) {
            if (store.getters.stateUsername) {
              router.push('/');
            } else {
              window.location.reload();
            }
            return;
          }
          resolve(res.data);
        } else {
          if (res) {
            resolve(res);
          }
        }
      });
    });
  }
};
