import 'regenerator-runtime/runtime';
import Vue from 'vue';
import FastClick from 'fastclick';

import router from './route';
import store from './store';
import App from './app';

FastClick.attach(document.body);

const hostname = window.location.hostname;

if (['localhost'].includes(hostname)) {
  // eslint-disable-next-line
  new window.VConsole()
}

// fix ios 12 input position bug ---start
const mobileVersion = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
if (mobileVersion && (mobileVersion[1].replace(/_/g, '.').indexOf('12') === 0) && (/micromessenger/i).test(navigator.userAgent)) {
  Vue.prototype.MYK_ISIOS12INPUT = true;
  // ios下微信环境中， 弹窗弹起无法收起的bug
  document.body.addEventListener('focus', (e) => {
    // eslint-disable-next-line no-self-assign
    document.body.scrollTop = document.body.scrollTop;
  }, true);
  // ios11 环境下， faseClick导致input难以聚焦
  FastClick.prototype.focus = function(targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
    } else {
      targetElement.focus();
    }
  };
}
// fix ios 12 input position bug ---end

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
