import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router'

const style = {
  margin: 12,
};

class StartButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this);
    console.log('disabled: ' + this.props.disabled)
  }

  handleTouchTap() {
    console.log('clicked');
    this.props.router.push('/game')
  }

  render() {
    return (
      <div>
        <RaisedButton label='Start' primary={true} style={style}
        onTouchTap={this.handleTouchTap}
        disabled={this.props.disabled}/>
      </div>
    )
  }
}

export default withRouter(StartButton)
