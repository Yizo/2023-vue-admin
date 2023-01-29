import { createRouter, createWebHistory } from 'vue-router';
import { myView } from '@/layout'
import { publicRoutes, whiteList } from './constants'

export const components = import.meta.glob('@/views/**/*.vue')

export function _import(path) {
    return components['/src/views' + path + '.vue']
}

export function getRouteList(data) {
    return (
        data
            // 菜单排序
            .sort((a, b) => a - b)
            .map((item) => {
                // 当前项
                const {
                    menuUri = '',
                    menuName = '',
                    menuType = '',
                    icon = '',
                    menuCode = '',
                    component,
                    hidden,
                    childMenuList = [],
                } = item;
                const route = {
                    meta: { name: '', icon: '', menuCode: '', menuType: 1, hidden: 0 },
                };
                // 路由地址
                route.path = menuUri;
                route.name = menuCode;
                // 导航名称
                route.meta.name = menuName;
                route.meta.icon = icon;
                route.meta.menuCode = menuCode;
                route.meta.menuType = menuType;
                // 路由组件
                const str = component.substr(0, 7);
                if (component === 'layout') {
                    route.component = myView;
                } else {
                    route.component = _import(component);
                }

                // 如果是 1 将它在导航中隐藏generateRoutes
                route.meta.hidden = hidden === 1;
                // 判断是否存在子路由
                if (childMenuList && childMenuList.length) {
                    route.children = [...getRouteList(childMenuList)];
                }
                return route;
            })
    );
}

export function routeFactory(){
    return createRouter({
        history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
        routes: [...publicRoutes],
        scrollBehavior: () => ({ left: 0, top: 0 })
    });
}

export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !whiteList.includes(name)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

const router = routeFactory();

export default router
