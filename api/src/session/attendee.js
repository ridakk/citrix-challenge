import SessionService from './sessionService';

let Attendee = (scoreHolder, hostid, attendeeid, sessionToken) => {
  let muted = false,
    state = '';

  return {
    getId: () => {
      return attendeeid;
    },
    isMuted: () => {
      return muted;
    },
    setState: (newState) => {
      state = newState;
    },
    getState: () => {
      return state;
    },
    mute: () => {
      return new Promise((resolve, reject) => {
        if (muted) {
          if (hostid === attendeeid) {
            state = 'inprogress';
            SessionService.unmute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              muted = false;
              state = '';
              resolve(muted);
            }, () => {
              state = '';
              resolve(muted);
            });
          } else {
            state = 'inprogress';
            SessionService.unmute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              muted = false;
              scoreHolder.addPoints(-5);
              state = '';
              resolve(muted);
            }, () => {
              scoreHolder.addPoints(-1);
              state = '';
              resolve(muted);
            });
          }
        } else {
          if (state !== 'active') {
            reject();
            return;
          }

          if (hostid === attendeeid) {
            state = 'inprogress';
            SessionService.mute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              console.log('host is muted!!!');
              muted = true;
              scoreHolder.addPoints(-50);
              resolve(muted);
            }, () => {
              state = '';
              resolve(muted);
            });
          } else {
            state = 'inprogress';
            SessionService.mute({
              token: sessionToken,
              id: attendeeid
            }).then(() => {
              console.log(attendeeid + ' muted');
              muted = true;
              scoreHolder.addPoints(+2);
              resolve(muted);
            }, () => {
              scoreHolder.addPoints(+1);
              state = '';
              resolve(muted);
            });
          }
        }
      });
    }
  };
};

export default Attendee;
