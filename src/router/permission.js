import { generateRoutes } from './index';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import { Modal } from 'ant-design-vue'
import { userStore } from '@/store'

export default (router) => {
  NProgress.configure({ showSpinner: false }); // NProgress Configuration

  const whiteList = [
    '/login'
  ]; // no redirect whitelist

  const store = userStore()

  router.beforeEach(async (to, from, next) => {
    Modal.destroyAll()
    // start progress bar
    NProgress.start();

    // set page title
    if (to.meta && to.meta.name) {
      document.title = to.meta.name;
    }

    const hasToken = store.$state.token;

    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (hasToken) {
        next();
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

  router.isReady().then(() => {
    console.group('isReady');
    console.log('添加前:', router.getRoutes());
    generateRoutes();
    console.log('添加后:', router.getRoutes());
    console.groupEnd();
  });
}
