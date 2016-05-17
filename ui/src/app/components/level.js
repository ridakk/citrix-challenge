import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

class Level extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 1};
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
      <SelectField value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} primaryText="First time moderator" />
        <MenuItem value={2} primaryText="Exprienced moderator" />
        <MenuItem value={3} primaryText="Not human!" />
      </SelectField>
      </div>
    )
  }
}

export default Level;
