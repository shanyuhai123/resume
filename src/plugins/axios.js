"use strict";

import Vue from "vue";
import axios from "axios";
import qs from "qs";

const isProEnv = process.env.NODE_ENV === "production";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: isProEnv ? "http://api.shanyuhai.top" : "/api",
  timeout: 60 * 1000
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    config.headers["Authorization"] = sessionStorage.getItem("rs_auth");
    config.data = qs.stringify(config.data);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // 处理错误响应，统一消息提示（待处理）
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
