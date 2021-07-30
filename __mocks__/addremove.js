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

export function clearChecked(arr) {
  if (arr.length !== 0) {
    const itemsToRemove = arr.filter((task) => task.completed === 'true');

    for (let i = 0; i < itemsToRemove.length; i += 1) {
      outCollection(itemsToRemove[i], arr);
    }

    const items = document.querySelectorAll('#sortList li');
    for (let i = 0; i < items.length; i += 1) {
      const temp = items[i].innerHTML;
      for (let j = 0; j < itemsToRemove.length; j += 1) {
        if (temp === itemsToRemove[j].description) {
          items[i].parentNode.removeChild(items[i]);
        }
      }
    }
  }
}
