import axios, { AxiosStatic } from 'axios';
import store from '../store'

const { CancelToken } = axios;

declare module 'vue/types/vue' {
  interface VueConstructor {
    $toast: any;
  }
  interface Vue {
    axios: AxiosStatic;
  }
}
interface ErrorMsg {
  type: string;
  message: string;
}
// 基础地址
const BASE_URL = process.env.VUE_APP_API_URL
// 错误返回
const errorMsg: ErrorMsg = {
  type: 'error',
  message: 'unhandle',
};
// 请求集合，防止重复点击
const requestUrls: string[] = []
let requestFlag: string

/* 创建axios实例 */
const service = axios.create({
  timeout: 30000, // 请求超时时间
  baseURL: BASE_URL,
  withCredentials: true,
});
const regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值


/* request拦截器 */
service.interceptors.request.use(
  (config: any) => {
    // 重复点击start=======
    requestFlag = config.url + config.method
    if (requestUrls.indexOf(requestFlag) > -1 && config.url !== '/upload') {
      config.cancelToken = new CancelToken((cancel: any) => {
        errorMsg.message = 'duplicate request';
        cancel('duplicate request');
      });
    } else {
      requestUrls.push(requestFlag);
      config.headers['X-CSRFToken'] = document.cookie.match(regex)
        ? document.cookie.match(regex)![1]
        : null;
    }
    // 重复点击end=======
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
    if (response.data.status === 'error') {
      store.dispatch('app/handleError', response.data.msg)
      return Promise.reject(response.data.msg)
    }
    return response.data
  },
  (error: any) => {
    // 异常处理
    if (error.message && error.message === 'duplicate request') {
      errorMsg.message = 'duplicate request';
      store.dispatch('app/handleError', errorMsg.message)
      return Promise.reject(errorMsg);
    }
    if (error.response &&  error.response.status === 413) {
      store.dispatch('app/handleError', 'File is too large')
      return Promise.reject(errorMsg)
    }
    if (error.message && error.message.indexOf('timeout') > -1) {
      requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
      errorMsg.message = 'request timeout';
      store.dispatch('app/handleError', errorMsg.message)
      return Promise.reject(errorMsg);
    }
    store.dispatch('app/handleError', errorMsg.message)
    requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
    return Promise.reject(error);
  },
);

const api = service;

export { api }
