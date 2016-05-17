import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AttendeeList from './attendeeList';
import StopButton from './stopButton';
import SessionService from '../services/sessionService'
import Modal from './modal';

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
    this.state = {
      modalTitle: '',
      modalTxt: '',
      modalOpen: false
    }
  }

  hanleOnEnd(txt, startTime, endTime, points){
    console.log(`${txt} --- duration: ${(endTime-startTime)/1024}, points: ${points}`)
    this.setState({
      modalTitle: txt,
      modalTxt: `Duration: ${(endTime-startTime)/1024}, Points: ${points}`,
      modalOpen: true
    })
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
          <Modal
            title={this.state.modalTitle}
            txt={this.state.modalTxt}
            open={this.state.modalOpen}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Game;
