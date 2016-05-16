import Session from './session';

export default class SessionApi {

  static join(sessionData, t1, t2) {
    return new Session(sessionData, t1, t2).join();
  }

}
