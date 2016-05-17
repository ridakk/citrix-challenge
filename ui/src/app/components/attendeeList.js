import React from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import Attendees from './attendees'

const style = {
  margin: 5,
};

class AttendeeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Attendees: Attendees
    };
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.Attendees).map((attendee) => (
          <RaisedButton key={attendee.label} label={attendee.label} primary={!attendee.muted} secondary={!attendee.muted} style={style} />
        ))}
      </div>
    )
  }
}

export default AttendeeList;
