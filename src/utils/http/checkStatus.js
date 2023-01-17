import httpERRMsg from '@/enums/httpERRMsg';
import { message, errorModal } from '@/hook'
function checkStatus(status, msg, errorMessageMode = 'message') {
  let errMessage = msg;
  if (msg === '') {
    if (httpERRMsg[`errMsg${status}`]) {
      errMessage = httpERRMsg[`errMsg${status}`];
    }
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      errorModal({ title: httpERRMsg.errorTip, content: errMessage });
    } else if (errorMessageMode === 'message') {
      message.error(errMessage);
    }
  }
}

export default checkStatus