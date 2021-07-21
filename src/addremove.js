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

function addTask(taskArr, description, completed, index) {
  const task = new CreateTask(description, completed, index);
  task.arrInsert(taskArr);
  PopulateList.create(task);
}

export default class Preserve {
  static individualTasks(taskArr) {
    for (let i = 0; i < taskArr.length; i += 1) {
      PopulateList.create(taskArr[i]);
    }
  }

  static initialTask(taskArr) {
    const input = document.querySelector('#data');
    const addBtn = document.querySelector('.fa-level-down-alt');

    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        addBtn.click();
      }
    });

    addBtn.addEventListener('click', () => {
      let desc = document.getElementById('data');
      addTask(taskArr, desc.value, 'false', taskArr.length);
      SaveLocal.saveArr(taskArr);
    });
  }
}
