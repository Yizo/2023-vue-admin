/**
 * @description: Request result set
 */

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TYPE = 'success',
  TIMEOUT = 173001,
  PERMISSION = 173002,
  DISABLED = 173003
}

// 单点错误状态时需要退出
export const singleInEnum: number[] = [
  500412, 500413, 500411, 500410, 500409, 500408, 500407, 500406, 500405, 500404, 500403, 500402,
  500401,
];

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
