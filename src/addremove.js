import { dragStart, dragOver, drop } from './dropdrag';
import { isComplete } from './completion';

class SaveLocal {
  static saveArr(taskArr) {
    const acceptableString = JSON.stringify(taskArr);
    localStorage.setItem('myTasks', acceptableString);
  }
}

class CreateTask {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  arrInsert(taskArr) {
    taskArr.push(this);
  }
}

class RemoveTask {
  static deleteBtn(btn, value, taskArr) {
    btn.addEventListener('click', (ev) => {
      const button = ev.target;
      button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
      this.outCollection(value, taskArr);
    });
  }

  static outCollection(value, taskArr) {
    const itemIndex = taskArr.indexOf(value);
    taskArr.splice(itemIndex, 1);
    for (let j = 0; j < taskArr.length; j += 1) {
      taskArr[j].index = taskArr.indexOf(taskArr[j]);
    }
    SaveLocal.saveArr(taskArr);
  }

  static clearChecked(taskArr) {
    if (taskArr.length != 0) {
      let itemsToRemove = taskArr.filter(task => task.completed === 'true');
      const items = document.querySelectorAll('#sortList li');
      for (let i = 0; i < items.length; i += 1) {
        let temp = items[i].childNodes[0].childNodes[1].innerHTML;
          for (let j = 0; j < itemsToRemove.length; j += 1) {
            if (temp === itemsToRemove[j].description) {
              items[i].parentNode.removeChild(items[i]);
            }
          }
      }

      for (let i = 0; i < itemsToRemove.length; i += 1) {
        this.outCollection(itemsToRemove[i], taskArr);
        SaveLocal.saveArr(taskArr);
      }
    }
  }
}


class PopulateList {
  static create(value, taskArr) {
    const main = document.getElementById('sortList');
    const content = document.createElement('li');
    content.setAttribute('class', 'drag');
    content.setAttribute('draggable', 'true');
    const contentHolder = document.createElement('div');
    contentHolder.setAttribute('class', 'item-container');
    const data = document.createElement('input');
    data.setAttribute('type', 'checkbox');
    data.setAttribute('class', 'data-box');
    contentHolder.appendChild(data);
    const cont = document.createElement('span');
    const elem = document.createTextNode(`${value.description}`);
    cont.appendChild(elem);
    contentHolder.appendChild(cont);
    const btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    btn.setAttribute('class', 'removeBtn');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-ellipsis-v');
    contentHolder.appendChild(icon);
    contentHolder.appendChild(btn);
    RemoveTask.deleteBtn(btn, value, taskArr);
    content.appendChild(contentHolder);
    main.appendChild(content);
  }
}

function addTask(taskArr) {
  let desc = document.getElementById('data');
  const task = new CreateTask(desc.value, 'false', taskArr.length);
  task.arrInsert(taskArr);
  PopulateList.create(task, taskArr);
  SaveLocal.saveArr(taskArr);
}

export default class Preserve {
  static individualTasks(taskArr) {
    for (let i = 0; i < taskArr.length; i += 1) {
      PopulateList.create(taskArr[i], taskArr);
    }

    const items = document.querySelectorAll('#sortList li');

    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener('dragstart', () => dragStart(items[i]));
      items[i].addEventListener('dragover', (e) => dragOver(e));
      items[i].addEventListener('drop', (e) => {
        drop(e, items[i], taskArr);
        SaveLocal.saveArr(taskArr);
      });
    }

    const data = document.querySelectorAll('.data-box');

    for (let j = 0; j < data.length; j += 1) {
      data[j].addEventListener('change', () => {
        isComplete(data[j], j, taskArr);
        SaveLocal.saveArr(taskArr);
      });

      if (taskArr[j].completed === 'true') {
        data[j].setAttribute('checked', '');
        data[j].nextSibling.classList.add('done');
      }
    }

    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
      RemoveTask.clearChecked(taskArr);
    });
  }

  static initialTask(taskArr) {
    const form = document.getElementById('form');
    const input = document.querySelector('#data');
    const addBtn = document.querySelector('.fa-level-down-alt');

    input.addEventListener('keypress', (e) => {
      if (e.key === "Enter") {
        addTask(taskArr);
        form.reset();

        const items = document.querySelectorAll('#sortList li');

        for (let i = 0; i < items.length; i += 1) {
          items[i].addEventListener('dragstart', () => dragStart(items[i]));
          items[i].addEventListener('dragover', (e) => dragOver(e));
          items[i].addEventListener('drop', (e) => {
            drop(e, items[i], taskArr);
            SaveLocal.saveArr(taskArr);
          });
        }

        const data = document.querySelectorAll('.data-box');
        for (let j = 0; j < data.length; j += 1) {
          data[j].addEventListener('change', () => {
            isComplete(data[j], j, taskArr);
            SaveLocal.saveArr(taskArr);
          });
        }
      }
    });
  }
}
