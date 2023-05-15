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
    min: '',
    sec: '',
  };

  handelDescriptionChange = (evt) => {
    this.setState({
      description: evt.target.value,
    });
  };

  handelMinutesChange = (evt) => {
    const res = evt.target.value;
    this.setState({
      min: res >= 0 ? res : '',
    });
  };

  handelSecondsChange = (evt) => {
    const res = evt.target.value;
    this.setState({
      sec: res >= 0 ? res : '',
    });
  };

  handelSubmit = (evt) => {
    evt.preventDefault();

    const { description, min, sec } = this.state;
    if (description && min && sec) {
      this.props.onSubmit(description, min, sec);
      this.setState({
        description: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.handelSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          required
          value={this.state.description}
          onChange={this.handelDescriptionChange}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          required
          value={this.state.min}
          onChange={this.handelMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          value={this.state.sec}
          onChange={this.handelSecondsChange}
        />
        <input type="submit" hidden />
      </form>
    );
  }
}
