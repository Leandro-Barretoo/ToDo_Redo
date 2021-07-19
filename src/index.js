import './style.css';

const taskArr = [{
  description: 'Do 30 min cardio',
  completed: false,
  index: 1,
}, {
  description: 'Meditate 10 min',
  completed: true,
  index: 2,
}, {
  description: 'Do dinner',
  completed: false,
  index: 3,
}];
  
function displayTask() {
  for (let i = 0; i < taskArr.length; i += 1) {
    const cont = document.getElementById('main-container');
    const itemContainer = document.createElement('div');
    itemContainer.setAttribute('class', 'item-container');
    const squareContainer = document.createElement('div');
    squareContainer.setAttribute('class', 'square-container');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'far fa-square');
    squareContainer.appendChild(icon);
    const item = document.createElement('p');
    item.setAttribute('class', 'item');
    item.innerHTML = taskArr[i].description;
    squareContainer.appendChild(item);
    itemContainer.appendChild(squareContainer);
    const dotsContainer = document.createElement('div');
    dotsContainer.setAttribute('class', 'dots-container');
    const iconTwo = document.createElement('i');
    iconTwo.setAttribute('class', 'fas fa-ellipsis-v');
    dotsContainer.appendChild(iconTwo);
    itemContainer.appendChild(dotsContainer);
    cont.appendChild(itemContainer);
  }
  
  if (taskArr.length > 0) {
    const cont = document.getElementById('main-container');
    const itemContainer = document.createElement('div');
    itemContainer.setAttribute('class', 'item-container');
    itemContainer.setAttribute('id', 'clear');
    const clear = document.createElement('p');
    clear.innerHTML = 'Clear all completed';
    itemContainer.appendChild(clear);
    cont.appendChild(itemContainer);
  };
}
  
document.addEventListener('DOMContentLoaded', displayTask);
