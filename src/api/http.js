import axios from "axios";
import store from "../vuex/store";
import Qs from "qs";
/**
 * 设置请求api
 */
axios.defaults.baseURL = process.env.API_ROOT;

/**
 * 10秒超时
 */
axios.defaults.timeout = 10000;

/**
 * 设置post请求头
 */
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

/**
 *
 */
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    let token = store.state.token;
    if (!token) {
      token = sessionStorage.getItem("token");
    }

    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log("http.js:" + response);
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    //TODO 400 注册请求无效
    console.log("http.js:" + error.response);
    // return Promise.reject(error.response);
    if (error.response.status) {
      console.log(error.response.status);
      switch (error.response.status) {
        // 401: 已拒绝为此请求授权
        case 401:
          console.log("-=-=-=-=-=");
          // MessageBox({
          //   title: "提示",
          //   message: "等待审核人员认证...",
          //   closeOnClickModal: false
          // });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          break;
        // 404请求不存在
        case 404:
          break;
        // 其他错误，直接抛出错误提示
        default:
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    // console.log(Qs.stringify(params));
    axios
      .post(url, Qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err.data);
      });
  });
}
