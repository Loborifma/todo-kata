import React from "react";

import NewTaskForm from "../new-task-form/NewTaskForm";
import TaskList from "../task-list/TaskList";
import Footer from "../footer/Footer";

import "./App.css";

export default class App extends React.Component {
  maxId = 100;

  state = {
    tasks: [
      this.createListItem("Completed task"),
      this.createListItem("Editing task"),
      this.createListItem("Active task"),
    ],
    filter: "All",
  };

  createListItem(description) {
    return {
      id: this.maxId++,
      description: description,
      status: false,
      editing: false,
    };
  }

  changeProperty(arr, id, propName, isToggle, newValue) {
    const indx = arr.findIndex((e) => e.id === id);

    const oldItem = arr[indx];
    let newItem;

    if (isToggle) {
      newItem = { ...oldItem, [propName]: !oldItem[propName] };
    } else {
      newItem = { ...oldItem, [propName]: newValue };
    }

    return [...arr.slice(0, indx), newItem, ...arr.slice(indx + 1)];
  }

  filterTasks = (arr, filter) => {
    switch (filter) {
      case "Active":
        return arr.filter((e) => !e.status);
      case "Completed":
        return arr.filter((e) => e.status);
      default:
        return arr;
    }
  };

  onAddItem = (description) => {
    const newItem = this.createListItem(description);
    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem];
      return {
        tasks: newArr,
      };
    });
  };

  onEditingItem = (e, id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.changeProperty(
          tasks,
          id,
          "description",
          false,
          e.target.value
        ),
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState(({ tasks }) => {
      const indx = tasks.findIndex((e) => e.id === id);

      const newArr = [...tasks.slice(0, indx), ...tasks.slice(indx + 1)];

      return {
        tasks: newArr,
      };
    });
  };

  onSpotFilter = (e) => {
    e.target.classList.add("selected");
    this.setState({
      filter: e.target.innerText,
    });
  };

  onClearCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((e) => !e.status),
      };
    });
  };

  onToggleStatus = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.changeProperty(tasks, id, "status", true),
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.changeProperty(tasks, id, "editing", true),
      };
    });
  };

  render() {
    const { tasks, filter } = this.state;

    const activeCount = tasks.filter((e) => !e.status).length;
    const filteredTasks = this.filterTasks(tasks, filter);

    return (
      <section className="todoapp">
        <NewTaskForm onSubmit={this.onAddItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleteItem={this.onDeleteItem}
            onToggleStatus={this.onToggleStatus}
            onToggleEditing={this.onToggleEditing}
            onEditingItem={this.onEditingItem}
          />
          <Footer
            active={activeCount}
            onClearCompleted={this.onClearCompleted}
            onSpotFilter={this.onSpotFilter}
          />
        </section>
      </section>
    );
  }
}
