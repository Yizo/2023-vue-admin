// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types/axios';
import type { AxiosTransform, CreateAxiosOptions } from './types/axiosTransform';
// @ts-ignore
import VAxios from './axios';
// @ts-ignore
import checkStatus  from './checkStatus';
import { ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import httpERRMsg from '@/enums/httpERRMsg';
import { isString } from '@/utils/is';
import { deepClone } from '@/utils/tool';
import router from '@/router';
// @ts-ignore
import { userStore } from '@/store'
// @ts-ignore
import { message, errorModal, successModal } from '@/hook'

// @ts-ignore
// @ts-ignore
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    console.group('beforeRequestHook: 1111111111111111111');
    console.log(options);
    console.groupEnd();
    const { apiUrl, joinPrefix, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const token = userStore.token;
    if (token && options.withToken) {
      if (!config.headers) {
        config.headers = {};
      }
      // @ts-ignore
      config.headers['Access-Token'] = token;
    }

    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    console.group('requestInterceptors: 222222222222222222222');
    console.log(options);
    console.groupEnd();
    // 请求之前处理config
    // const token = getToken();
    // if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    //   // jwt token
    //   (config as Recordable).headers.Authorization = options.authenticationScheme
    //     ? `${options.authenticationScheme} ${token}`
    //     : token;
    // }

    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  // @ts-ignore
  responseInterceptors: (res: any) => {
    console.group('responseInterceptors: 333333333333333333333');
    console.log('res', res);
    const { requestOptions } = res.config;
    const {
      isTransformResponse,
      isReturnNativeResponse,
      isResponseTips,
      responseTipsMode,
      responseBlob,
      responseModalEvent
    } = requestOptions;
    if (responseBlob) {
      return Promise.resolve(res);
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message, data } = res.data;
    // 这里逻辑可以根据项目进行修改
    const hasSuccess = code === ResultEnum.SUCCESS;
    console.groupEnd();
    // 1. 请求成功时
    if (hasSuccess) {
      // 1.1 是否需要在响应成功后弹窗提示
      if (isResponseTips && res.data.code === ResultEnum.SUCCESS) {
        if (responseTipsMode === 'modal') {
          res.data.message && errorModal({
            content: res.data.message,
            btns: [{
              text: '取消',
              onclick:(cancel: any)=>{
                cancel();
                responseModalEvent && responseModalEvent();
              }
            }]
          })
        } else if (responseTipsMode === 'message') {
          res.data.message &&
          message.success(res.data.message);
        }
      }
      // 1.2 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return Promise.resolve(res);
      }

      // 1.3 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return Promise.resolve(res.data);
      }
      // 1.4 不进行任何处理，直接返回 data
      return Promise.resolve(data);
    } else {
      // 在此处根据自己项目的实际情况对不同的code执行不同的操作
      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      // 处理登录超时，没权限等情况
      // todo 按多种code处理
      let timeoutMsg = '';
      switch (code) {
        case ResultEnum.TIMEOUT:
          timeoutMsg = httpERRMsg.timeoutMessage;
          break;
        case ResultEnum.DISABLED:
          timeoutMsg = httpERRMsg.errDISABLED;
          break;
        default:
          break;
      }

      // 处理登录超时,禁用等情况
      if (timeoutMsg) {
        errorModal({
          title: httpERRMsg.errorTip,
          content: timeoutMsg,
          btns: [{
            text: '取消',
            onclick:(cancel: any)=>{
              cancel();
              if (
                  code === ResultEnum.TIMEOUT ||
                  code === ResultEnum.DISABLED
              ) {
                // todo 退出登录
              }
            }
          }]
        });
      } else {
        const msgType = requestOptions?.errorMessageMode;
        if (msgType === 'modal') {
          errorModal({
            title: httpERRMsg.errorTip,
            content: message || httpERRMsg.apiRequestFailed,
            btns: [{
              text: '取消',
              onclick:(cancel: any)=>{
                cancel();
                requestOptions?.errorModalEvent && requestOptions.errorModalEvent();
              }
            }]
          });
        } else if (msgType === 'message') {
          message.error(message || httpERRMsg.apiRequestFailed);
        }
        return Promise.reject(res);
      }
      return Promise.reject(res);
    }
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    console.error('responseInterceptorsCatch: 444444444444444444444')
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = httpERRMsg.apiTimeoutMessage;
      }
      if (err?.includes('Network Error')) {
        errMessage = httpERRMsg.networkExceptionMsg;
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          errorModal({ title: httpERRMsg.errorTip, content: errMessage });
        } else if (errorMessageMode === 'message') {
          message.error(errMessage);
        }
      } else {
        checkStatus(error?.response?.status, msg, errorMessageMode);
      }
      return Promise.reject(error);
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  const options: CreateAxiosOptions = {
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    // authentication schemes，e.g: Bearer
    // authenticationScheme: 'Bearer',
    authenticationScheme: '',
    timeout: 60 * 1000,
    // 基础接口地址
    baseURL: import.meta.env.VITE_APP_BASE_URL,

    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 如果是form-data格式
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    // 数据处理方式
    transform: deepClone(transform),
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: false,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'modal',
      // 接口地址
      // apiUrl: globSetting.apiUrl,
      // 接口拼接地址
      urlPrefix: '',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true,
      // 是否需要在成功响应时弹窗提示
      isResponseTips: false,
      // 成功响应时弹窗的弹窗类型
      responseTipsMode: 'modal',
      responseBlob: false,
      ...opt,
    },
  };
  return new VAxios(options);
}
export const defHttp = createAxios();
