import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Password from './password';
import Username from './username';
import Level from './level';
import StartButton from './startButton';
import { withRouter } from 'react-router'
import SessionService from '../services/sessionService'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: true
    };
  }

  handleLevelChange(level) {
      this.state.level = level;
  }

  handleUsernameChange(username) {
      this.state.username = username;
      this.setState({
          buttonDisabled: this.state.username.length === 0 ||
              this.state.password.length === 0
      });
  }

  handlePasswordChange(password) {
      this.state.password = password;
      this.setState({
          buttonDisabled: this.state.username.length === 0 ||
              this.state.password.length === 0
      });
  }

  handleStartButtonClick() {
      /*CITRIX.session.join({
          login: this.state.username,
          password: this.state.password
      }, this.state.level.t1, this.state.level.t2).then((session) => {
          SessionService.session = session;
          this.props.router.push('/game');
      });*/

      this.props.router.push('/game');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Username onUsernameChange={this.handleUsernameChange}/>
          <Password onPasswordChange={this.handlePasswordChange}/>
          <Level onLevelChange={this.handleLevelChange}/>
          <StartButton
            disabled={this.state.buttonDisabled}
            onClick={this.handleStartButtonClick}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(Login)
