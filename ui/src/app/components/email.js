import React from 'react';
import TextField from 'material-ui/TextField';
import emailValidator from 'email-validator';

class Email extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', value: props.value }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
      let email = event.target.value.trim();
      if (email.length === 0 || emailValidator.validate(email)) {
        this.setState({ errorText: '' })
      } else {
        this.setState({ errorText: 'Invalid email' })
      }
    }

  render() {
    return (
      <div>
        <TextField
          hintText="Please enter an email address"
          floatingLabelText="Email"
          type="username"
          errorText= {this.state.errorText}
          onChange={this.onChange}
        /><br />
      </div>
    )
  }
}

export default Email;
