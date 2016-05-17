import React from 'react';
import TextField from 'material-ui/TextField';

class Username extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', value: props.value }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
      let username = event.target.value.trim();
      if (username.length === 0) {
        this.setState({ errorText: 'Enter at least one char' })
      } else {
        this.setState({ errorText: '' })
      }
    }

  render() {
    return (
      <div>
        <TextField
          hintText="Enter something..."
          floatingLabelText="Username"
          type="username"
          errorText= {this.state.errorText}
          onChange={this.onChange}
        /><br />
      </div>
    )
  }
}

export default Username;
