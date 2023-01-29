export const publicRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
    }
];
// 错误页面
export const errRoute = { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' }

export const whiteList = [
    '/login'
];