import SessionService from './sessionService';
import Attendee from './Attendee';
import Score from './Score';

let Session = (_credentials, t1 = 700, t2 = 1000) => {
  let credentials = _credentials,
    ws, payload, attendees = [],
    onEndCallback, onAttendeeStateCallback,
    startTime, endTime, score, eventFireTimeout;

  function join() {
    return new Promise((resolve, reject) => {
      SessionService.join(credentials).then((data) => {
        payload = data.payload;

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

          if (attendee.isActive()) {
            return;
          }

          if (attendee.isMuted()) {
            attendee = attendees.find(attendee => attendee.isMuted() === false);
            if (!attendee) {
              endTime = new Date();
              ws.close();
              setTimeout(() => {
                onEndCallback('EXCELLENT', startTime, endTime, score.points);
              }, 0);
            }
            return;
          }

          if (msg.name === 'muteState' &&
            attendee.getId() === payload.user.id) {
            endTime = new Date();
            ws.close();
            setTimeout(() => {
              onEndCallback('GAME OVER', startTime, endTime, score.points);
            }, 0);
            return;
          }

          if (eventFireTimeout) {
            return;
          }

          eventFireTimeout = setTimeout(() => {
            eventFireTimeout = null;
            attendee.setActive(true);
            onAttendeeStateCallback(attendee, true);
            setTimeout(() => {
              attendee.setActive(false);
              onAttendeeStateCallback(attendee, false);
            }, t2);
          }, t1);
        };

        ws.onclose = () => {
          console.log('ws closed.');
        };

        ws.onerror = () => {
          console.log('ws error.');
        };
      }, (err) => {
        console.log(err);
      });
    });
  }

  return {
    join: join,
    end: () => {
      ws.close();
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
