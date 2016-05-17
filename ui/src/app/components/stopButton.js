import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class StopButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <RaisedButton label='Leave Session' primary={true} style={style}
        onTouchTap={this.props.onClick}/>
      </div>
    )
  }
}

export default StopButton
