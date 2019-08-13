import { get, post } from './http'
import store from '../vuex/store'

/**
 * testGet 接口
 * @param {Object} p 请求参数
 */
export const testGet2211 = p => {
    get('/local/api/values/get', p)
}


/**
 * 获取用户信息
 * @param {用户id} id 
 */
export const G_UserInfo = id => {
    get('', id)
}

export const G_SetUserUpId = (id, upId) => {
    post('', { id, upId })
}

