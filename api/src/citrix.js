import SessionApi from './session/sessionApi';

export default class CITRIX {

  constructor() {}

  static get session() {
    return SessionApi;
  }

}
