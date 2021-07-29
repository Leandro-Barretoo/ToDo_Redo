import {CreateTask, PopulateList} from '../src/addremove.js';

export function addTask(arr) {
  const description = 'New task';
  const task = new CreateTask(description, 'false', 0);
  task.arrInsert(arr);
  PopulateList.create(task, arr);
}
