import { CreateTask, PopulateList } from '../src/addremove';
import localStoragemock from './local-storage-mocks';

export function addTask(arr) {
  const description = 'New task';
  const task = new CreateTask(description, 'false', 0);
  task.arrInsert(arr);
  PopulateList.create(task, arr);
}

export function deleteBtn(btn) {
  btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
}

export function outCollection(task, arr) {
  const itemIndex = arr.indexOf(task);
  arr.splice(itemIndex, 1);
  return arr;
}

export function deleteLocalStorage(key, existingStorage, delItem) {
  // deleting by updating

  const itemsToRemove = existingStorage.filter((task) => task.index !== delItem.index);

  localStoragemock.setItem(key, itemsToRemove);

  return localStoragemock.getItem(key);
}
