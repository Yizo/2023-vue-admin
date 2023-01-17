import { view } from '@/layout';

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/error',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: view,
    redirect: '/error/404',
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error-page/404'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/error/404' },
];

export default publicRoutes;
