import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { DIFFICULTY_LEVELS } from './difficultyLevels';

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
    this.props.onLevelChange(DIFFICULTY_LEVELS[value]);
  }

  render() {
    return (
      <div>
      <SelectField value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} primaryText="This is my first time" />
        <MenuItem value={2} primaryText="I am expreienced" />
        <MenuItem value={3} primaryText="Mute Mute Mute" />
        <MenuItem value={4} primaryText="Insane !!!" />
      </SelectField>
      </div>
    )
  }
}

export default Level;
