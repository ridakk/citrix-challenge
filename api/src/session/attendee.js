import SessionService from './sessionService';

let Attendee = (scoreHolder, hostid, attendeeid, sessionToken) => {
  let muted = false,
    mutable;

  return {
    getId: () => {
      return attendeeid;
    },
    isMuted: () => {
      return muted;
    },
    setActive: (active) => {
      mutable = active;
    },
    isActive: () => {
      return mutable;
    },
    mute: () => {
      return new Promise((resolve, reject) => {
        if (muted) {
          if (hostid === attendeeid) {
            SessionService.unmute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              muted = false;
              resolve(0);
            }, () => {
              resolve(0);
            });
          } else {
            SessionService.unmute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              muted = false;
              scoreHolder.addPoints(-5);
              resolve(-5);
            }, () => {
              scoreHolder.addPoints(-1);
              resolve(-1);
            });
          }
        } else {
          if (!mutable) {
            resolve(0);
            return;
          }

          if (hostid === attendeeid) {
            SessionService.mute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              console.log('host is muted!!!');
              muted = true;
              resolve(-50);
            }, () => {
              resolve(0);
            });
          } else {
            SessionService.mute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              console.log(attendeeid + ' muted');
              muted = true;
              scoreHolder.addPoints(+2);
              resolve(+2);
            }, () => {
              scoreHolder.addPoints(+1);
              resolve(+1);
            });
          }
        }
      });
    }
  };
};

export default Attendee;
