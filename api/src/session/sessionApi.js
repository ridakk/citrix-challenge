import Session from './session';

export default class SessionApi {

  static join(sessionData) {
    return new Session(sessionData).join();
  }

}
