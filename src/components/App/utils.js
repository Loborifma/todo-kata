import { v4 as uuidv4 } from 'uuid';

export const createListItem = (description, milliSec) => {
  const id = uuidv4();
  return {
    id: id,
    description: description,
    time: milliSec,
    status: false,
    editing: false,
  };
};

export const changeProperty = (arr, id, propName, isToggle, newValue) => {
  const indx = arr.findIndex((e) => e.id === id);

  const oldItem = arr[indx];
  let newItem;

  if (isToggle) {
    newItem = { ...oldItem, [propName]: !oldItem[propName] };
  } else {
    newItem = { ...oldItem, [propName]: newValue };
  }

  return [...arr.slice(0, indx), newItem, ...arr.slice(indx + 1)];
};

export const filterTasks = (arr, filter) => {
  switch (filter) {
    case 'Active':
      return arr.filter((e) => !e.status);
    case 'Completed':
      return arr.filter((e) => e.status);
    default:
      return arr;
  }
};
