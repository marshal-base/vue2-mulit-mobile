import Vue from 'vue';
import axios from 'axios';

const instance = axios.create({
  timeout: 60000,
});

// 统一处理ajax失败
instance.interceptors.response.use((res) => {
  if (!res.config.visibleToast) {
    if (new Vue().$toast) {
      new Vue().$toast.hide();
    }
  }

  const response = res.data;
  if (
    response.code !== 200) {
    new Vue().$toast.text(response.message.trim());

    return Promise.reject(response);
  }

  return res;
}, (error) => {
  new Vue().$toast.text('网络中断了，请重试');
  return Promise.reject(error);
});

window.axios = instance;
