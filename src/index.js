/* eslint-disable max-classes-per-file */

import './reset.css';
import './style.css';
//import { isComplete } from './completion';
//import { dragStart, dragOver, drop } from './dropdrag';
import Preserve from './addremove.js';

const taskArr = JSON.parse(localStorage.getItem('myTasks')) || [];

class SaveLocal {
  static saveArr() {
    const acceptableString = JSON.stringify(taskArr);
    localStorage.setItem('myTasks', acceptableString);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Preserve.individualTasks(taskArr);
  Preserve.initialTask(taskArr);
});

// for the edit use span.contenteditable = true

/* eslint-enable max-classes-per-file */
