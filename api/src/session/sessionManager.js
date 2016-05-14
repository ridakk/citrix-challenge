import SessionService from './sessionService';

class SessionManager {
  constructor() {

  }

  join(params) {
    return SessionService.join(params).then((data) => {
      console.log(data);
    });
  }
}

export default new SessionManager();
