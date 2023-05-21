import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export const TasksFilter = ({ onSpotFilter }) => {
  const clearClasses = (e) => {
    const parent = e.target.parentNode.parentNode;

    Array.from(parent.children).forEach((e) => {
      const child = e.firstElementChild;
      if (child) {
        child.classList.remove('selected');
      }
    });
  };

  return (
    <ul className="filters" onClickCapture={clearClasses}>
      <li>
        <button className="selected" onClick={onSpotFilter} type="button">
          All
        </button>
      </li>
      <li>
        <button className="" onClick={onSpotFilter} type="button">
          Active
        </button>
      </li>
      <li>
        <button className="" onClick={onSpotFilter} type="button">
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onSpotFilter: PropTypes.func.isRequired,
};
