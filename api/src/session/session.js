import SessionService from './sessionService';
import Attendee from './Attendee';

let Session = (_credentials) => {
  let credentials = _credentials, ws, payload,
    attendees = [];

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
          resolve(this);
        };

        ws.onmessage = (event) => {
          let msg = JSON.parse(event.data), attendee;

          attendee = attendees.find(attendee => attendee.getId() === msg.payload.user.id);

          if (!attendee) {
            attendees.push(new Attendee(msg.payload.user.id, payload.token));
          }
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
    }
  };
};

export default Session;
