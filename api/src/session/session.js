import SessionService from './sessionService';
import Attendee from './Attendee';
import Score from './Score';

let Session = (_credentials, t1 = 700, t2 = 1000) => {
  let credentials = _credentials,
    ws, payload, attendees = [],
    onEndCallback, onAttendeeStateCallback,
    startTime, endTime, score, eventFireTimeout;

  function fireCallback(callback, ...args) {
    if (typeof callback === 'function') {
      setTimeout(() => {
        callback(...args);
      }, 0);
    }
  }

  function processEnd(txt) {
    endTime = new Date();
    ws.close();
    onAttendeeStateCallback = null;
    fireCallback(onEndCallback, txt, startTime, endTime, score.points);
    onEndCallback = null;
  }

  function join() {
    return new Promise((resolve, reject) => {
      SessionService.join(credentials).then((data) => {
        payload = data.payload;

        if (data.fail) {
          reject();
          return;
        }

        try {
          ws = new WebSocket(payload.rtmUrl + '/?token=' + payload.token);
        } catch (err) {
          console.log('ws error.', err);
          reject();
          return;
        }

        ws.onopen = () => {
          startTime = new Date();
          score = new Score();
          resolve(this);
        };

        ws.onmessage = (event) => {
          let msg = JSON.parse(event.data),
            attendee;

          if (endTime) {
            return;
          }

          attendee = attendees.find(attendee => attendee.getId() === msg.payload.user.id);

          if (!attendee) {
            attendee = new Attendee(score, payload.user.id, msg.payload.user.id, payload.token);
            attendees.push(attendee);
          }

          if (msg.name === 'muteState' &&
            attendee.getId() === payload.user.id) {
            processEnd('GAME OVER ...');
            return;
          }

          if (attendee.getState() === 'inprogress' ||
            attendee.getState() === 'active') {
            return;
          }

          if (attendee.isMuted()) {
            attendee = attendees.find(attendee => attendee.isMuted() === false);
            if (!attendee) {
              processEnd('EXCELLENT !!!');
            }
            return;
          }

          if (eventFireTimeout) {
            return;
          }

          eventFireTimeout = setTimeout(() => {
            if (attendee.getState() === '') {
              eventFireTimeout = null;
              attendee.setState('active');
              fireCallback(onAttendeeStateCallback, attendee, true);
              setTimeout(() => {
                if (attendee.getState() === 'active') {
                  attendee.setState('');
                  fireCallback(onAttendeeStateCallback, attendee, false);
                }
              }, t2);
            }
          }, t1);
        };

        ws.onclose = () => {
          console.log('ws closed.');
        };

        ws.onerror = () => {
          console.log('ws error.');
        };
      }, () => {
        reject();
      });
    });
  }

  return {
    join: join,
    end: () => {
      processEnd('RUNNING AWAY...');
    },
    getAttendees: () => {
      return attendees;
    },
    onEnd: (callback) => {
      onEndCallback = callback;
    },
    onAttendeeState: (callback) => {
      onAttendeeStateCallback = callback;
    }
  };
};

export default Session;
