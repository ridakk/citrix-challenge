import * as REQUEST from '../constants/httpRequests';

let sendXhrRequest = function (params) {
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

    req.open(params.method, params.url, params.async);

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
    params.method = REQUEST.HTTP_POST;
    return sendXhrRequest(params);
  }

  static put(params) {
    params.method = REQUEST.HTTP_PUT;
    return sendXhrRequest(params);
  }

  static get(params) {
    params.method = REQUEST.HTTP_GET;
    return sendXhrRequest(params);
  }

  static delete(params) {
    params.method = REQUEST.HTTP_DELETE;
    return sendXhrRequest(params);
  }
}
