import { ref, unref, watch, onUnmounted } from 'vue';
import { FormSchemaProps, UseFormReturnType, FormActionType } from '../types/form';

export function useForm(schema?: FormSchemaProps): UseFormReturnType {
    const formRef = ref<FormActionType | null>(null);
    function register(instance: FormActionType) {
        onUnmounted(() => {
            formRef.value = null;
        });
        if (instance === unref(formRef)) return;

        formRef.value = instance;

        watch(
            () => schema,
            () => {
                console.log('schema changed');
            },
            {
                immediate: true,
                deep: true,
            }
        );
    }

    const methods: FormActionType = {
        getFieldValue: (key: string) => formRef.value?.getFieldValue(key),
        getFieldsValue: () => formRef.value?.getFieldsValue(),
        setFieldValue: (key: string, value) => formRef.value?.setFieldValue(key, value),
        setFieldsValue: (value) => formRef.value?.setFieldsValue(value),
        resetFields: (nameList = []) => formRef.value?.resetFields(nameList),
        validate: (nameList = []) => formRef.value?.validate(nameList) as Promise<boolean>,
        validateFields: (nameList = []) => formRef.value?.validateFields(nameList) as Promise<any>,
        scrollToField: (name: string, options?: any[]) => formRef.value?.scrollToField(name, options),
        clearValidate: (nameList = []) => formRef.value?.clearValidate(nameList),
    }

    return [register, methods];
}
