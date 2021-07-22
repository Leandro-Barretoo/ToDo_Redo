/* eslint-disable max-classes-per-file */

import './reset.css';
import './style.css';
// import { isComplete } from './completion';
// import { dragStart, dragOver, drop } from './dropdrag';
import Preserve from './addremove';

const taskArr = JSON.parse(localStorage.getItem('myTasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
  Preserve.individualTasks(taskArr);
  Preserve.initialTask(taskArr);
});

/* eslint-enable max-classes-per-file */
