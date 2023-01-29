import { defHttp } from '@gm/utils'

export function fetchLogin(data)   {
    return defHttp.post({
        url: '/user/login',
        data: {
            ...data
        }
    })
}