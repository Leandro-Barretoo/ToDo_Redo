let dragged = null;

const swapArrayElements = function (arr, indexA, indexB) {
  const temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

Array.prototype.swap = function (indexA, indexB) {
  swapArrayElements(this, indexA, indexB);
};

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

export function dragStart(i) {
  dragged = i;
}

export function dragOver(e) {
  e.preventDefault();
}

export function drop(e, i, taskArr) {
  e.preventDefault();
  if (i !== dragged) {
    const all = document.querySelectorAll('#sortList li');
    let dragposition = 0;
    let dropposition = 0;
    for (let g = 0; g < all.length; g += 1) {
      if (dragged === all[g]) { dragposition = g; }
      if (i === all[g]) { dropposition = g; }
    }
    if (dragposition < dropposition) {
      i.parentNode.insertBefore(dragged, i.nextSibling);
      taskArr.move(dragposition, dropposition);
      for (let j = 0; j < taskArr.length; j += 1) {
        taskArr[j].index = taskArr.indexOf(taskArr[j]);
      }
    } else {
      i.parentNode.insertBefore(dragged, i);
      taskArr.move(dragposition, dropposition);
      for (let j = 0; j < taskArr.length; j += 1) {
        taskArr[j].index = taskArr.indexOf(taskArr[j]);
      }
    }
  }
}
