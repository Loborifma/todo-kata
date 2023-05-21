import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

export const Footer = ({ active, onClearCompleted, onSpotFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TasksFilter onSpotFilter={(e) => onSpotFilter(e)} />
      <button className="clear-completed" onClick={onClearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  active: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onSpotFilter: PropTypes.func.isRequired,
};
