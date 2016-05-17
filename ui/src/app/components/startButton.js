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
  }

  handleTouchTap() {
    console.log('clicked');
    this.props.router.push('/game')
  }

  render() {
    return (
      <div>
        <RaisedButton label='Start' primary={true} style={style}
        onTouchTap={this.handleTouchTap}/>
      </div>
    )
  }
}

export default withRouter(StartButton)
