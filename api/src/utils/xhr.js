import * as REQUEST from '../constants/httpRequests';

let sendXhrRequest = function (params) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();

    function handleSuccess(evt) {
      console.log('xhr success');
      resolve(evt);
    }

    function handleFailure(evt) {
      console.log('xhr failure');
      reject(evt);
    }

    req.addEventListener('load', handleSuccess);
    req.addEventListener('error', handleFailure);

    req.open(params.method, params.url, params.async);

    req.setRequestHeader('Content-Type', 'application/json');

    req.send(JSON.stringify(params.data));
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
