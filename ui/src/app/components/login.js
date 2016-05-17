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
import { DIFFICULTY_LEVELS } from './difficultyLevels';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100,
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
      buttonDisabled: true,
      level: DIFFICULTY_LEVELS[1]
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
      CITRIX.session.join({
          login: this.state.username,
          password: this.state.password
      }, this.state.level.t1, this.state.level.t2).then((session) => {
          SessionService.session = session;
          this.props.router.push('/game');
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>MUTE &lsquo;EM ALL</h1>
          <h3>Your task is to attend a conference call with 99 person</h3>
          <h3>All tend to talk much not even one by one</h3>
          <h3>Only way to handle the session is to MUTE THEM ALL!!!</h3>
          <h3>When buttons turn red, it is time to hit them</h3>
          <h3>But some of them are not easy to mute, you may need to mute them multiple times</h3>
          <h3>And one more thing, don&lsquo;t forget that you are also in the same list</h3>
          <h3>If you mute your self.... GAME OVER</h3>
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
