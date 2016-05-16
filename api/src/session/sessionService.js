import Xhr from '../utils/xhr';
import * as SESSION_URLS from './sessionUrls';

export default class SessionService {
  constructor() {

  }

  static join(params = {
    login: null,
    password: null
  }) {
    return Xhr.post({
      url: SESSION_URLS.BASE + SESSION_URLS.JOIN,
      data: {
        login: params.login,
        password: params.password
      },
      async: false
    });
  }

  static mute(params = {
    token: null,
    id: null
  }) {
    return Xhr.put({
      url: SESSION_URLS.BASE + SESSION_URLS.MUTE_ATTENDEE + params.id,
      data: {
        token: params.token
      },
      async: true
    });
  }

  static unmute(params = {
    token: null,
    id: null
  }) {
    return Xhr.put({
      url: SESSION_URLS.BASE + SESSION_URLS.UNMUTE_ATTENDEE + params.id,
      data: {
        token: params.token
      },
      async: true
    });
  }

}
