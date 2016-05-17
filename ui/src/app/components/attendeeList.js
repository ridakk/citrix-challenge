import React from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import Attendees from './attendees'
import SessionService from '../services/sessionService'

const style = {
  margin: 5,
};

class AttendeeList extends React.Component {
  constructor(props) {
    super(props)
    this.mute = this.mute.bind(this);
    this.handleAttendeeState = this.handleAttendeeState.bind(this);
    this.state = {
      Attendees: Attendees
    };
    SessionService.session.onAttendeeState(this.handleAttendeeState)
  }

  handleAttendeeState(att, state){
    console.log("att: " + att.getId() + "is " + state + " right now");
    let arrayvar = this.state.Attendees.slice();
    arrayvar[att.getId()] = {active: state, muted: false};
    this.setState({
      Attendees: arrayvar
    });
  }

  mute(index, event) {
    let arrayvar = this.state.Attendees.slice(),
      attendee, self = this;

    attendee = SessionService.session.getAttendees().find(attendee => attendee.getId() === index);
    attendee.mute().then((state) => {
      arrayvar[index] = {
        active: false,
        muted: state
      };
      this.setState({
        Attendees: arrayvar
      });
    }, () => {})
  }

  render() {
    let self = this;
    return (
      <div>
        {self.state.Attendees.map(function(value, index, attendees) {
          if (value !== null) {
            return <RaisedButton
              key={index}
              label={index}
              primary={value.muted}
              secondary={value.active}
              style={style}

              onTouchTap={(event) => self.mute(index, event)} />
          }
        })}
      </div>
    )
  }
}

export default AttendeeList;
