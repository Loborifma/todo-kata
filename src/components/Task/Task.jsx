import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleStatus: PropTypes.func.isRequired,
    onToggleEditing: PropTypes.func.isRequired,
    onEditingItem: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  };

  state = {
    timerPlay: true,
    interval: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      if (this.props.status) {
        this.onClickPause();
      }
    }
  }

  componentWillUnmount() {
    this.onClickPause();
  }

  formatTimer = (time) => {
    const minutes = Math.floor(time / (60 * 1000))
      .toString()
      .padStart(2, '0');
    let seconds = (time % (60 * 1000)).toString();
    if (seconds.length < 5) {
      seconds = '0' + seconds;
    }
    seconds = seconds.slice(0, 2).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  handleDescriptionClick = () => {
    const { id, onToggleStatus } = this.props;
    onToggleStatus(id);
  };

  onClickPlay = () => {
    let { time, id, onChangeTime } = this.props;
    const intervalId = setInterval(() => {
      if (time === 0) {
        clearInterval(intervalId);
        this.setState({
          timerPlay: true,
        });
        return;
      }
      onChangeTime((time -= 1000), id);
    }, 1000);

    if (time > 0) {
      this.setState({
        timerPlay: false,
        interval: intervalId,
      });
    }
  };

  onClickPause = () => {
    clearInterval(this.state.interval);
    this.setState({
      timerPlay: true,
    });
  };

  render() {
    const { description, onDeleteItem, onToggleEditing, onEditingItem, status, editing, time } = this.props;
    const { timerPlay } = this.state;

    let isDone = status ? 'completed' : '';

    let isEditing = null;

    if (editing && !status) {
      isDone = 'editing';
      isEditing = (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onToggleEditing();
          }}
        >
          <input type="text" className="edit" value={description} onChange={onEditingItem} autoFocus />
        </form>
      );
    }

    return (
      <li className={isDone}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            name="check-status"
            checked={status}
            onChange={this.handleDescriptionClick}
          />
          <label htmlFor="check-status">
            <span className="title" onClick={this.handleDescriptionClick}>
              {description}
            </span>
            <span className="description">
              <button className="icon icon-play" type="button" hidden={!timerPlay} onClick={this.onClickPlay}></button>
              <button className="icon icon-pause" type="button" hidden={timerPlay} onClick={this.onClickPause}></button>
              <span>{this.formatTimer(time)}</span>
            </span>
            <span className="description">{formatDistanceToNow(new Date())}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing} type="button" title="Editing"></button>
          <button className="icon icon-destroy" onClick={onDeleteItem} type="button" title="Delete"></button>
        </div>
        {isEditing}
      </li>
    );
  }
}
