/* eslint-disable max-classes-per-file */

import './reset.css';
import './style.css';
import { dragStart, dragOver, drop } from './dropdrag';
import { isComplete } from './completion';

const taskArr = JSON.parse(localStorage.getItem('myTasks')) || [];

class SaveLocal {
  static saveArr() {
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

  arrInsert() {
    taskArr.push(this);
  }
}

class PopulateList {
  static create(value) {
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
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-ellipsis-v');
    contentHolder.appendChild(icon);
    content.appendChild(contentHolder);
    main.appendChild(content);
  }
}

function addTask(description, completed, index) {
  const task = new CreateTask(description, completed, index);
  task.arrInsert(task);
  PopulateList.create(task);
}

class Preserve {
  static individualTasks() {
    for (let i = 0; i < taskArr.length; i += 1) {
      PopulateList.create(taskArr[i]);
    }
  }

  static initialTask() {
    addTask('Sport', 'false', taskArr.length);
    addTask('Dinner', 'false', taskArr.length);
    addTask('Work', 'false', taskArr.length);
    addTask('Study', 'false', taskArr.length);
    addTask('Laundry', 'false', taskArr.length);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (taskArr.length === 0) {
    Preserve.initialTask();
    SaveLocal.saveArr();
  } else {
    Preserve.individualTasks();
  }

  const items = document.querySelectorAll('#sortList li');

  for (let i = 0; i < items.length; i += 1) {
    items[i].addEventListener('dragstart', () => dragStart(items[i]));
    items[i].addEventListener('dragover', (e) => dragOver(e));
    items[i].addEventListener('drop', (e) => {
      drop(e, items[i], taskArr);
      SaveLocal.saveArr();
    });
  }

  const data = document.querySelectorAll('.data-box');
  for (let j = 0; j < data.length; j += 1) {
    data[j].addEventListener('change', () => {
      isComplete(data[j], j, taskArr);
      SaveLocal.saveArr();
    });

    if (taskArr[j].completed === 'true') {
      data[j].setAttribute('checked', '');
      data[j].nextSibling.classList.add('done');
    }
  }
});

/* eslint-enable max-classes-per-file */
