import SessionManager from './sessionManager';

export default class SessionApi {

  static join(params) {
    return SessionManager.join(params);
  }

}
