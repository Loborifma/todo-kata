import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export const TasksFilter = ({ onSpotFilter }) => {
  const parentRef = useRef(null);

  const clearClasses = () => {
    const parent = parentRef.current;

    Array.from(parent.children).forEach((element) => {
      const child = element.firstElementChild;
      if (child) {
        child.classList.remove('selected');
      }
    });
  };

  return (
    <ul className="filters" ref={parentRef} onClickCapture={clearClasses}>
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
