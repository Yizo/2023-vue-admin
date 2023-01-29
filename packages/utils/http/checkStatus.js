import { httpErrMsg } from '@gm/enums';
import { message, errorModal } from '@gm/hook'
function checkStatus(status, msg, errorMessageMode = 'message') {
  let errMessage = msg;
  if (msg === '') {
    if (httpErrMsg[`errMsg${status}`]) {
      errMessage = httpErrMsg[`errMsg${status}`];
    }
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      errorModal({ title: httpErrMsg.errorTip, content: errMessage });
    } else if (errorMessageMode === 'message') {
      message.error(errMessage);
    }
  }
}

export default checkStatus