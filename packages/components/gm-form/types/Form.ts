import {unref} from "vue";

export interface RenderCallbackParams {
  schema: FormSchemaProps;
  ations: FormActionType;
  model: { [key: string]: any };
  field: string
}

export type FunctionRenderCallbackParams<T = { [key: string]: any }> = T | ((renderCallbackParams: RenderCallbackParams) => T);

export interface FormSchemaProps {
  field: string;
  label: string;
  slot?: string;
  // form-item属性
  itemProps: FunctionRenderCallbackParams;
  // antd-vue 表单组件，如a-input, a-select
  component?: string,
  // form-item 下的组件属性
  componentProps?: FunctionRenderCallbackParams;
  // 表单项的key
  value?: string | number | any[] | boolean; // 有代表着初始值
  // 动态判断是否显示
  ifShow?: FunctionRenderCallbackParams<boolean>;
  // 动态判断是否禁用
  dynamicDisabled?: FunctionRenderCallbackParams<boolean>;
  // 动态判断校验规则
  dynamicRules?: FunctionRenderCallbackParams<boolean>;
}

export interface FormValidateFn {
  validate: (callback?: (valid?: boolean) => void) => void;
  /**
   * 对部分表单字段进行校验的方法，参数1为需校验的 prop，参数2为检验完回调，返回错误信息
   */
  validateField: (prop?: string, callback?: (valid?: boolean) => void) => void;
  /**
   * 对整个表单进行重置，将所有字段值重置为空并移除校验结果
   */
  resetFields: () => void;
}

export interface FormActionType {
  getFieldValue: (key: string) => any;
  getFieldsValue: () => any;
  setFieldValue: (key: string, value: any) => void;
  setFieldsValue: (value: any) => void;
  resetFields: (nameList?: any[]) => void;
  validate: (nameList?: any[]) => Promise<boolean>
  validateFields: (nameList?: any[]) => Promise<any>;
  scrollToField: (name: string, options?: any[]) => void;
  clearValidate: (nameList?: any[]) => void;
  getFormModel: () => { [key: string]: any };
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
