/* eslint-disable max-classes-per-file */

import './reset.css';
import './style.css';
import { dragStart, dragOver, drop } from './dropdrag';
import { isComplete } from './completion';
import Preserve from './addremove.js';

const taskArr = JSON.parse(localStorage.getItem('myTasks')) || [];

class SaveLocal {
  static saveArr() {
    const acceptableString = JSON.stringify(taskArr);
    localStorage.setItem('myTasks', acceptableString);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Preserve.initialTask(taskArr);
  Preserve.individualTasks(taskArr);

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
