import SessionService from './sessionService';

let Attendee = (attendeeid, sessionToken) => {
  let muted;

  return {
    getId: () => {
      return attendeeid;
    },
    mute: () => {
      if (muted) {
        return new Promise((resolve) => {
          resolve();
        });
      }

      return SessionService.mute({
        token: sessionToken,
        id: attendeeid
      }).then(() => {
        muted = true;
      });
    },
    unmute: () => {
      if (!muted) {
        return new Promise((resolve) => {
          resolve();
        });
      }

      return SessionService.unmute({
        token: sessionToken,
        id: attendeeid
      }).then(() => {
        muted = false;
      });
    }
  };
};

export default Attendee;
