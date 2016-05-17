import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

const levels = {
  1: {
    t1: 500,
    t2: 1000
  },
  2: {
    t1: 300,
    t2: 700
  },
  3: {
    t1: 150,
    t2: 350
  }
}

class Level extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 1};
  }

  handleChange(event, index, value) {
    this.setState({value});
    this.props.onLevelChange(levels[value]);
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
