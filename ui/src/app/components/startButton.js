import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class StartButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <RaisedButton label='Start' primary={true} style={style}
        onTouchTap={this.props.onClick}
        disabled={this.props.disabled}/>
      </div>
    )
  }
}

export default StartButton
