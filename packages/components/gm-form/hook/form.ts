import {FormActionType} from "../types/Form";
import {unref, Ref} from "vue";

export function formEvent(emits: any){
    function handleSubmit(e: any) {
        emits('submit', e);
    }
    function handleFinish(values: any) {
        emits('finish', values);
    }
    function handleFinishFailed(data: any) {
        emits('finishFailed', data);
    }
    function handleFieldValidate(name: string, status: string, errorMsgs:string){
        emits('validate', name, status, errorMsgs)
    }
    return {
        handleSubmit,
        handleFinish,
        handleFinishFailed,
        handleFieldValidate
    }
}