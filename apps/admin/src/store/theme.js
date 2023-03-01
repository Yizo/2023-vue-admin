
import { defineStore } from 'pinia'
import { page2, page1 } from "@/layout";
import router, { getRouteList, errRoute } from "@/router";

const base = import.meta.env.VITE_APP_PUBLIC_PATH

const themeStore = defineStore({
    id: base + '-theme',
    state: ()=>{
        return {
            // 主题色
            primary: '#25b864',
            // 侧边栏开收起
            collapsed: false,
            // 侧边栏宽度
            sideBarWidth: 200,
            menu: []
        }
    },
    getters: {
        primary() {
            return this.primary
        }
    },
    actions: {
        reset() {
          this.$reset()
        },
        generateRoutes(){
            console.log('------------------------------generateRoutes----------------------------------')

            const data = [
                {
                    "menuId": "100001",
                    "menuName": "弹窗",
                    "menuType": 1,
                    "menuUri": "/modal",
                    "icon": "article",
                    "component": "layout",
                    "menuCode": "",
                    "hidden": 0,
                    "childMenuList": [
                        {
                            "menuId": "100002",
                            "menuName": "函数类型",
                            "menuType": 1,
                            "menuUri": "/modal",
                            "icon": "",
                            "component": "/modal/function",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "100003",
                            "menuName": "模版类型",
                            "menuType": 1,
                            "menuUri": "/modal/template",
                            "icon": "",
                            "component": "/modal/template",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "100004",
                            "menuName": "模版类型2",
                            "menuType": 1,
                            "menuUri": "/modal/template2",
                            "icon": "",
                            "component": "/modal/template2",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        }
                    ]
                },
                {
                    "menuId": "200001",
                    "menuName": "表单",
                    "menuType": 1,
                    "menuUri": "/form",
                    "icon": "article",
                    "component": "layout",
                    "menuCode": "",
                    "hidden": 0,
                    "childMenuList": [
                        {
                            "menuId": "200002",
                            "menuName": "基本用法",
                            "menuType": 1,
                            "menuUri": "/form",
                            "icon": "",
                            "component": "/form/form1",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "200003",
                            "menuName": "使用插槽",
                            "menuType": 1,
                            "menuUri": "/form/form2",
                            "icon": "",
                            "component": "/form/form2",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "200004",
                            "menuName": "动态表单",
                            "menuType": 1,
                            "menuUri": "/form/form3",
                            "icon": "",
                            "component": "/form/form3",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        }
                    ]
                },
                {
                    "menuId": "300001",
                    "menuName": "表格",
                    "menuType": 1,
                    "menuUri": "/table",
                    "icon": "article",
                    "component": "layout",
                    "menuCode": "",
                    "hidden": 0,
                    "childMenuList": [
                        {
                            "menuId": "300002",
                            "menuName": "表格1",
                            "menuType": 1,
                            "menuUri": "/table",
                            "icon": "",
                            "component": "/table/table1",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "300003",
                            "menuName": "表格2",
                            "menuType": 1,
                            "menuUri": "/table/table2",
                            "icon": "",
                            "component": "/table/table2",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        },
                        {
                            "menuId": "300003",
                            "menuName": "表格3",
                            "menuType": 1,
                            "menuUri": "/table/table3",
                            "icon": "",
                            "component": "/table/table3",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        }
                    ]
                },
                {
                    "menuId": "1000001",
                    "menuName": "hooks",
                    "menuType": 1,
                    "menuUri": "/hooks",
                    "icon": "article",
                    "component": "layout",
                    "menuCode": "",
                    "hidden": 0,
                    "childMenuList": [
                        {
                            "menuId": "1000002",
                            "menuName": "拖拽",
                            "menuType": 1,
                            "menuUri": "/drag",
                            "icon": "",
                            "component": "/hooks/drag/index",
                            "menuCode": "",
                            "hidden": 0,
                            "childMenuList": []
                        }
                    ]
                },
            ]
            const menu = getRouteList(data)
            const routes = [
                {
                    path: '/',
                    component: page2,
                    children: [
                        {
                            path: '/dashboard',
                            name: 'dashboard',
                            meta: {
                                name: '首页'
                            },
                            component: ()=>import('@/views/dashboard/index'),
                        },
                        ...menu
                    ]
                },
            ]
            routes.forEach(route=>router.addRoute(route))
            router.addRoute(errRoute)
            this.menu = menu
        },
        setPrimary(state){
            this.primary = state
        }
    },
    persist: true
})

export default themeStore