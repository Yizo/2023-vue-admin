import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import { Modal } from 'ant-design-vue'
import { userStore, themeStore } from '@/store'
import { whiteList } from './constants'

export default (router) => {
  NProgress.configure({ showSpinner: false });

  const store = userStore()
  const theme = themeStore()

  router.beforeEach(async (to, from, next) => {
    Modal.destroyAll()
    NProgress.start();

    if (to.meta && to.meta.name) {
      document.title = to.meta.name;
    }

    const hasToken = store.$state.token;

    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (hasToken) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
            ...to.query,
          },
        });
      }

      NProgress.done();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });

  router.isReady().then(async ()=>{
    console.log('isReady:1')
    await theme.generateRoutes()
    await router.replace(router.currentRoute.value.fullPath)
    console.log(router.getRoutes())
  })
}
