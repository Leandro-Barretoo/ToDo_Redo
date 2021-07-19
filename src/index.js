import './reset.css';
import './style.css';

let taskArr = JSON.parse(localStorage.getItem('myTasks')) || [];

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
  arrInsert(value) {
    taskArr.push(value);
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
    data.setAttribute('class', 'data');
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
  SaveLocal.saveArr();
}

let swapArrayElements = function(arr, indexA, indexB) {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};


Array.prototype.swap = function(indexA, indexB) {
  swapArrayElements(this, indexA, indexB);
}

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
}

function complete() {
  const data = document.querySelectorAll('.data');
  for(let i = 0; i < data.length; i += 1) {
    data[i].addEventListener('change', (event) => {
      if (data[i].checked) {
        data[i].nextSibling.classList.add('done');
        taskArr[i].completed = 'true';
        SaveLocal.saveArr();
      } else {
        data[i].nextSibling.classList.remove('done');
        taskArr[i].completed = 'false';
        SaveLocal.saveArr();
      }
    });
  }
}

class Preserve {
  static individualTasks() {
    for(let i = 0; i < taskArr.length; i += 1) {
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
  //Preserve.individualTasks();
  Preserve.initialTask();
  let items = document.querySelectorAll('#sortList li'),
      dragged = null;

  for (let i of items) {
    i.addEventListener('dragstart', function() {
     dragged = this;
      for (let j of items) {
        if (j != dragged) { j.classList.add('hint'); }
      }
    });

    i.addEventListener('dragenter', function() {
      if (this != dragged) { this.classList.add('active'); }
    });

    i.addEventListener('dragleave', function() {
      this.classList.remove('active');
    });

    i.addEventListener('dragend', function() {
      for (let j of items) {
        j.classList.remove('hint');
        j.classList.remove('active');
      }
    });

    i.addEventListener('dragover', function(evt) {
      evt.preventDefault();
    });

    i.addEventListener('drop', function(evt) {
      evt.preventDefault();
      if (this != dragged) {
        let all = document.querySelectorAll('#sortList li'),
            draggedpos = 0, droppedpos = 0;
        for (let it = 0; it < all.length; it += 1) {
          if (dragged == all[it]) { draggedpos = it; }
          if (this == all[it]) { droppedpos = it; }
        }
        if (draggedpos < droppedpos) {
          this.parentNode.insertBefore(dragged, this.nextSibling);
          taskArr.move(draggedpos, droppedpos);
          for (let j = 0; j < taskArr.length; j += 1) {
            taskArr[j].index = taskArr.indexOf(taskArr[j]);
          }
          SaveLocal.saveArr();
        } else {
          this.parentNode.insertBefore(dragged, this);
          taskArr.move(draggedpos, droppedpos);
          for (let j = 0; j < taskArr.length; j += 1) {
            taskArr[j].index = taskArr.indexOf(taskArr[j]);
          }
          SaveLocal.saveArr();
        }
      }
    });
  }
  complete();
});
