import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AttendeeList from './attendeeList';
import StopButton from './stopButton';
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.hanleOnEnd = this.hanleOnEnd.bind(this);
    this.handleStopButtonClick = this.handleStopButtonClick.bind(this);
    SessionService.session.onEnd(this.hanleOnEnd);
  }

  hanleOnEnd(txt, st, et, points){
    console.log(`${txt} --- duration: ${(st-et)/1024}, points: ${points}`)
  }

  handleStopButtonClick(){
    SessionService.session.end();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AttendeeList/>
          <StopButton
            onClick={this.handleStopButtonClick}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Game;
