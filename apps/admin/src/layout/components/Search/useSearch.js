import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { throttle } from 'lodash-es'
import { themeStore } from '@/store'
import Fuse from 'fuse.js'

const getChildRoute = (children) => {
    if (children && children.length) {
        return children.filter((route) => route.meta.hidden !== true);
    }
    return [];
};

function generateRoutes(routes, paths = [], icon = '', result = []) {
    routes.forEach(route=>{
        const { meta, path } = route
        const children = getChildRoute(route.children)
        if(meta && meta.name) {
            const name = [...paths, meta.name]
            const data = {
                name,
                path,
                icon: name.length > 1 ? icon : meta.icon,
            }
            result.push(data)
            if(children && children.length) {
                generateRoutes(children, data.name, meta.icon,  result)
            }
        }
    })
    return result
}

export default function userSearch(){

    const list = ref([])
    const state = themeStore()
    const router = useRouter()
    const routes = router.getRoutes()

    const handleSearch = throttle(search, 300)
    const data = generateRoutes(state.$state.menu)
    function search(e) {
        const text = e.target.value.trim()
        if(text === '') {
            return list.value = []
        } else {
            list.value = fuse(data, text)
        }
    }

    function fuse(data, text){
        const options = {
            keys: [
                {
                    name: 'name',
                    weight: 0.9
                },
                {
                    name: 'path',
                    weight: 0.1
                }
            ]
        }
        return new Fuse(data, options).search(text)
    }

    return {
        list,
        handleSearch
    }

}