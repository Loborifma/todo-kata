import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import "./Task.css";

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

  render() {
    const {
      description,
      onDeleteItem,
      onToggleStatus,
      onToggleEditing,
      onEditingItem,
      status,
      editing,
    } = this.props;

    let isDone = status ? "completed" : "";

    let isEditing = null;

    if (editing && !status) {
      isDone = "editing";
      isEditing = (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onToggleEditing();
          }}
        >
          <input
            type="text"
            className="edit"
            value={description}
            onChange={onEditingItem}
          />
        </form>
      );
    }

    return (
      <li className={isDone}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={status}
            onChange={onToggleStatus}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(new Date())}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleteItem}></button>
        </div>
        {isEditing}
      </li>
    );
  }
}
