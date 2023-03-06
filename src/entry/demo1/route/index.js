import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/home',
      name: 'home',
      meta: { title: 'home' },
      component: () => import(
        /* webpackChunkName: 'home' */
        '@/views/home.vue'
      ),
    },
  ],
});

const ele = (id) => document.querySelector(id);

const setProcessBar = (val, transition = '0.2s') => {
  ele('#processBar') && (ele('#processBar').style.width = `${val}%`) &&
    (ele('#processBar').style.transition = transition);
};

let processBarTimer = null;

router.beforeEach((to, from, next) => {
  ele('#app').setAttribute('page', to.name);
  document.title = to.meta.title;
  let done = 10;
  let curve = 12;
  clearInterval(processBarTimer);
  processBarTimer = setInterval(() => {
    curve -= 1;
    curve = curve < 0 ? 1 : curve;
    if (done >= 90) {
      clearInterval(processBarTimer);
      setProcessBar(90);
    } else {
      done += curve;
      setProcessBar(done);
    }
  }, 100);
  next();
});

router.afterEach((route) => {
  clearInterval(processBarTimer);
  setProcessBar(100);
  setTimeout(() => setProcessBar(0, '0s'), 500);
});

export default router;
