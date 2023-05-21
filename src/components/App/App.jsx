import React, { useEffect, useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import { createListItem, changeProperty, filterTasks } from './utils.js';

import './App.css';

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterName, setFilterName] = useState('All');
  const [activeCount, setActiveCount] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const onAddItem = (description, min, sec) => {
    const milliSec = min * 60 * 1000 + sec * 1000;
    const newItem = createListItem(description, milliSec);
    setTasks([...tasks, newItem]);
  };

  const onChangeTime = (time, id) => {
    setTasks(changeProperty(tasks, id, 'time', false, time));
  };

  const onEditingItem = (e, id) => {
    setTasks(changeProperty(tasks, id, 'description', false, e.target.value));
  };

  const onDeleteItem = (id) => {
    setTasks((prevTasks) => {
      const indx = prevTasks.findIndex((e) => e.id === id);
      const newArr = [...prevTasks.slice(0, indx), ...prevTasks.slice(indx + 1)];
      return newArr;
    });
  };

  const onSpotFilter = (e) => {
    e.target.classList.add('selected');
    setFilterName(e.target.innerText);
  };

  const onClearCompleted = () => {
    setTasks(tasks.filter((e) => !e.status));
  };

  const onToggleStatus = (id) => {
    setTasks(changeProperty(tasks, id, 'status', true));
  };

  const onToggleEditing = (id) => {
    setTasks(changeProperty(tasks, id, 'editing', true));
  };

  useEffect(() => {
    setActiveCount(tasks.filter((e) => !e.status).length);
    setFilteredTasks(filterTasks(tasks, filterName));
  }, [tasks, filterName]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onSubmit={onAddItem} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleteItem={onDeleteItem}
          onToggleStatus={onToggleStatus}
          onToggleEditing={onToggleEditing}
          onEditingItem={onEditingItem}
          onChangeTime={onChangeTime}
        />
        <Footer active={activeCount} onClearCompleted={onClearCompleted} onSpotFilter={onSpotFilter} />
      </section>
    </section>
  );
};
