import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default class TasksFilter extends React.Component {
  static propTypes = {
    onSpotFilter: PropTypes.func.isRequired,
  };

  clearClasses = (e) => {
    const parent = e.target.parentNode.parentNode;

    Array.from(parent.children).forEach((e) => {
      e.firstElementChild.classList.remove('selected');
    });
  };

  render() {
    const { onSpotFilter } = this.props;

    return (
      <ul className="filters" onClickCapture={this.clearClasses}>
        <li>
          <button className="selected" onClick={onSpotFilter}>
            All
          </button>
        </li>
        <li>
          <button className="" onClick={onSpotFilter}>
            Active
          </button>
        </li>
        <li>
          <button className="" onClick={onSpotFilter}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
