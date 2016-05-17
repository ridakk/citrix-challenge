import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

function handleTouchTap() {
  console.log('clicked');
};

const StartButton = () => (
  <div>
    <RaisedButton label="Start" primary={true} style={style}
    onTouchTap={handleTouchTap}/>
  </div>
);

export default StartButton;
