import Xhr from '../utils/xhr';

import {
  JOIN_URL
} from './sessionUrls';

class SessionService {
  constructor() {

  }

  join(params = {
    login: null,
    password: null
  }) {
    return Xhr.post({
      url: 'http://js-coding-challenge.us-east-1.elasticbeanstalk.com/' + JOIN_URL,
      data: {
        login: params.login,
        password: params.password
      }
    });
  }
}

export default new SessionService();
