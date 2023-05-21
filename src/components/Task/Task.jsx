import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

export const Task = ({
  id,
  description,
  onDeleteItem,
  onToggleStatus,
  onToggleEditing,
  onEditingItem,
  onChangeTime,
  status,
  editing,
  time,
}) => {
  const [timerPlay, setTimerPlay] = useState(true);
  const [intervalId, setIntervalId] = useState('');
  const [isDone, setDone] = useState('');
  const [isEditing, setEditing] = useState(false);

  const formatTimer = (time) => {
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

  const onClickPlay = () => {
    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
        setTimerPlay(true);
        onToggleStatus(id);
        onChangeTime(0, id);
        return;
      }
      onChangeTime((time -= 1000), id);
    }, 1000);

    if (time > 0) {
      setTimerPlay(false);
      setIntervalId(interval);
    }
  };

  const onClickPause = () => {
    clearInterval(intervalId);
    setTimerPlay(true);
  };

  useEffect(() => {
    if (status) {
      setDone('completed');
      onClickPause();
    } else {
      if (editing) {
        setDone('editing');
        setEditing(true);
        onClickPause();
      } else {
        setDone('');
      }
    }
    return () => onClickPause();
  }, [status, editing]);

  return (
    <li className={isDone}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          name="check-status"
          checked={status}
          onChange={() => onToggleStatus(id)}
        />
        <label htmlFor="check-status">
          <span className="title" onClick={() => onToggleStatus(id)}>
            {description}
          </span>
          <span className="description">
            <button
              className="icon icon-play"
              title="Play"
              type="button"
              hidden={!timerPlay}
              onClick={onClickPlay}
            ></button>
            <button
              className="icon icon-pause"
              title="Pause"
              type="button"
              hidden={timerPlay}
              onClick={onClickPause}
            ></button>
            <span>{formatTimer(time)}</span>
          </span>
          <span className="description">{formatDistanceToNow(new Date())}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing} type="button" title="Editing"></button>
        <button className="icon icon-destroy" onClick={onDeleteItem} type="button" title="Delete"></button>
      </div>
      {isEditing && (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onToggleEditing();
          }}
        >
          <input type="text" className="edit" value={description} onChange={onEditingItem} autoFocus />
        </form>
      )}
    </li>
  );
};

Task.defaultProps = {
  status: false,
  editing: false,
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  onEditingItem: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  status: PropTypes.bool,
  editing: PropTypes.bool,
  time: PropTypes.number.isRequired,
};
