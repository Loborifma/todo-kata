import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/Task';
import './TaskList.css';

export default class TaskList extends React.Component {
  static defaultProps = {
    tasks: [],
    onDeleteItem: () => {},
    onToggleStatus: () => {},
    onToggleEditing: () => {},
    onEditingItem: () => {},
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onDeleteItem: PropTypes.func,
    onToggleStatus: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onEditingItem: PropTypes.func,
  };

  render() {
    const { onDeleteItem, onToggleStatus, onToggleEditing, onEditingItem, tasks } = this.props;

    return (
      <ul className="todo-list">
        {tasks.map((el) => {
          const { id, ...anotherProps } = el;

          return (
            <Task
              key={id}
              {...anotherProps}
              onDeleteItem={() => onDeleteItem(id)}
              onToggleStatus={() => onToggleStatus(id)}
              onToggleEditing={() => onToggleEditing(id)}
              onEditingItem={(e) => onEditingItem(e, id)}
            />
          );
        })}
      </ul>
    );
  }
}
