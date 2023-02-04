import { Modal } from 'ant-design-vue'
import { userStore, themeStore } from '@/store'
import { whiteList } from './constants'

export default (router) => {

  const store = userStore()
  const theme = themeStore()

  router.beforeEach(async (to, from, next) => {
    Modal.destroyAll()

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
    }
  });

  router.isReady().then(async ()=>{
    if(store.$state.token) {
      await theme.generateRoutes()
      await router.replace(router.currentRoute.value.fullPath)
    }
  })
}
