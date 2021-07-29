import {CreateTask, PopulateList} from '../src/addremove.js';

export function addTask(arr) {
  const description = 'New task';
  const task = new CreateTask(description, 'false', 0);
  task.arrInsert(arr);
  PopulateList.create(task, arr);
}

export function outCollection(task, arr) {
  const itemIndex = arr.indexOf(task);
  arr.splice(itemIndex, 1);
  return arr;
}
