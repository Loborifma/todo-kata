import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
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
    const { onDeleteItem, onToggleStatus, onToggleEditing, onEditingItem, onChangeTime, tasks } = this.props;

    return (
      <ul className="todo-list">
        {tasks.map((el) => {
          return (
            <Task
              key={el.id}
              {...el}
              onDeleteItem={() => onDeleteItem(el.id)}
              onToggleStatus={() => onToggleStatus(el.id)}
              onToggleEditing={() => onToggleEditing(el.id)}
              onEditingItem={(e) => onEditingItem(e, el.id)}
              onChangeTime={onChangeTime}
            />
          );
        })}
      </ul>
    );
  }
}
