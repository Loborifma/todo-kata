import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    description: '',
  };

  onDescriptionChange = (evt) => {
    this.setState({
      description: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.description) {
      this.props.onSubmit(this.state.description);
      this.setState({
        description: '',
      });
    }
  };

  render() {
    return (
      <form
        className="header"
        onSubmit={(evt) => {
          this.onSubmit(evt);
        }}
      >
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
      </form>
    );
  }
}
