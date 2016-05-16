import * as REQUEST from '../constants/httpRequests';

let sendXhrRequest = function (method, params) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();

    function handleSuccess() {
      console.log('xhr success');
      resolve(JSON.parse(req.response));
    }

    function handleFailure() {
      console.log('xhr failure');
      reject(JSON.parse(req.response));
    }

    if (params.async) {
      req.addEventListener('load', handleSuccess);
      req.addEventListener('error', handleFailure);
    }

    req.open(method, params.url, params.async);

    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify(params.data));

    if (!params.async) {
      if (req.status >= 400) {
        handleFailure();
      } else {
        handleSuccess();
      }
    }
  });
};

export default class Xhr {
  constructor() {

  }

  static post(params) {
    return sendXhrRequest(REQUEST.HTTP_POST, params);
  }

  static put(params) {
    return sendXhrRequest(REQUEST.HTTP_PUT, params);
  }

  static get(params) {
    return sendXhrRequest(REQUEST.HTTP_GET, params);
  }

  static delete(params) {
    return sendXhrRequest(REQUEST.HTTP_DELETE, params);
  }
}
