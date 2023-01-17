import axios from 'axios';
import { isFunction } from '@/utils/is';
// Used to store the identification and cancellation function of each request
let pendingMap = new Map();
/**
 * 获取CancelToken的key： 用请求类型和请求地址 ‘&’ 做分隔符拼接
 * */
export const getPendingUrl = (config) => [config.method, config.url].join('&');
export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    // 如果存在请求标识，那么使用，否则new一个取消token
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 清除所有待处理请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 删除请求
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);
    // 如果有当前请求标识符处于pending状态，
    if (pendingMap.has(url)) {
      // 则需要执行请求并将其从map移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map();
  }
}
