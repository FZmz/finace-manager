import axios from "axios";
import { Loading, Message, Notification } from "element-ui";
import router from "../router";

export const request = axios.create({
  baseURL: "/api",
});
let loadingInstance;
request.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("token");
    // 全局loading
    loadingInstance = Loading.service({ fullscreen: true });
    if (token) {
      // 挂载到请求头中
      config.headers.token = token;
    }
    if (response?.data?.code === 603) {
      // token失效
      Notification.error({
        title: "错误",
        message: "token失效，请重新登录",
      });
      // 替换到401页面
      router.replace("./401");
    }
    return config;
  },
  (err) => {}
);
request.interceptors.response.use(
  (response) => {
    // 保存token
    setTimeout(() => {
      loadingInstance.close();
    }, 500);
    const token = response.data?.data?.token;
    if (token) {
      window.sessionStorage.setItem("token", token);
    }
    // 603 代表token失，处理跳转到权限不足页面
    return response.data;
  },
  (err) => {
    // 针对200以上的状态码的处理，也可以做错误日志收集
    Message.error(err.Message);
    return Promise.reject(err);
  }
);

export const pretty = function (promise) {
  return promise
    .then((data) => {
      return [data, undefined];
    })
    .catch((err) => [undefined, err]);
};
