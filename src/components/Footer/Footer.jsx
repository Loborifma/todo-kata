import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

const Footer = ({ active, onClearCompleted, onSpotFilter }) => {
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

Footer.defaultProps = {
  active: 0,
  onClearCompleted: () => {},
  onSpotFilter: () => {},
};

Footer.propTypes = {
  active: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onSpotFilter: PropTypes.func.isRequired,
};

export default Footer;
