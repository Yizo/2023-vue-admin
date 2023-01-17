export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  // 例如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址，留空使用默认apiUrl
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode;
  errorModalEvent?: () => void;
  // 是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // 是否在header中发送token
  withToken?: boolean;
  // 是否需要在成功响应时弹窗提示
  isResponseTips?: boolean;
  // 成功响应时弹窗的弹窗类型
  responseTipsMode?: ErrorMessageMode;
  responseModalEvent?: () => void;
  // 响应类型为 blob 时是否下载
  responseBlobDown?: boolean;
  // 响应类型为 blob 时是否打开新窗口显示
  responseBlobView?: boolean;
  responseBlob?: false;
}

export interface Result<T = any> {
  data: T;
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
