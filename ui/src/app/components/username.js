import React from 'react';
import TextField from 'material-ui/TextField';

const Username = () => (
  <div>
    <TextField
      hintText="Please enter an email address"
      floatingLabelText="Username"
      type="username"
    /><br />
  </div>
);

export default Username;
