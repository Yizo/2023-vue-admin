import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@/utils/is';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import { deepClone } from '@/utils/tool';

export * from './types/axiosTransform';
/**
 * @description:  axios module
 */
class VAxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create axios instance
   */
  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: Interceptor configuration
   */
  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();
    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config) => {
      // 如果开启取消重复请求，则禁止取消重复请求
      const { ignoreCancelToken } = config.requestOptions
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);
    // 请求之前的拦截器错误处理
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);
    // 请求之后的拦截器错误处理
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  // support form-data
  supportFormData(config) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request(config, options) {
    let conf = deepClone(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt = Object.assign({}, requestOptions, options);
    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;
    conf = this.supportFormData(conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          // 如果是二进制数据直接返回
          if (opt.responseBlob) {
            resolve(res);
          }
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }

  /**
   * @description:  File Upload
   */
  upload(config, options) {
    const formData = new window.FormData();
    if (config.data) {
      Object.keys(config.data).forEach((key) => {
        formData.append(key, config.data[key]);
      });
    }
    const headers = {
      ...config.headers,
      'Content-type': ContentTypeEnum.FORM_DATA,
    };
    return this.request({
      ...config,
      method: 'POST',
      data: formData,
      headers,
    }, options);
  }

  download(config, options) {

    const n_options = {
      responseBlob: true,
      ...options
    }

    return this.request({
      ...config,
      method: 'POST',
    }, n_options);
  }
}

export default VAxios
