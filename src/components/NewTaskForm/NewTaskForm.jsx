import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export const NewTaskForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handelDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handelMinutesChange = (evt) => {
    const value = evt.target.value;
    const res = value >= 0 ? value : '';
    setMin(res);
  };

  const handelSecondsChange = (evt) => {
    const value = evt.target.value;
    let res;

    if (value > 0) {
      res = value > 60 ? 60 : value;
    } else {
      res = '';
    }

    setSec(res);
  };

  const handelSubmit = (evt) => {
    evt.preventDefault();

    if (description && min && sec) {
      onSubmit(description, min, sec);
      setDescription('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form className="new-todo-form" onSubmit={handelSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        required
        value={description}
        onChange={handelDescriptionChange}
        autoFocus
      />
      <input className="new-todo-form__timer" placeholder="Min" required value={min} onChange={handelMinutesChange} />
      <input className="new-todo-form__timer" placeholder="Sec" required value={sec} onChange={handelSecondsChange} />
      <button type="submit" hidden />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onSubmit: () => {},
};

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func,
};
