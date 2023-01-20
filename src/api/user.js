import { defHttp } from '@/utils/http'

export function fetchLogin(data)   {
    return defHttp.post({
        url: '/user/login',
        data: {
            ...data
        }
    })
}