import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router'

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      title: '',
      txt: ''
    };
  }

  handleClose() {
    this.props.router.push('/');
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          {this.props.txt}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(Modal);
