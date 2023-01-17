import { defHttp } from '@/utils/http'

export function fetchLogin(data)   {
    return defHttp.get({
        url: '/api/login2',
        params: {
            ...data
        }
    })
}