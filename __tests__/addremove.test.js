import {
  addTask, outCollection, deleteBtn, deleteLocalStorage,
} from '../__mocks__/addremove';

import localStoragemock from '../__mocks__/local-storage-mocks';

describe('add function', () => {
  test('add item to arr', () => {
    const newArr = [];
    // eslint-disable-next-line no-useless-concat
    document.body.innerHTML = ' <div>' + '   <ul id="sortList"></ul>' + ' </div>';
    addTask(newArr);
    expect(newArr.length).toBe(1);
  });

  test('display element on the page', () => {
    const newArr = [];
    // eslint-disable-next-line no-useless-concat
    document.body.innerHTML = ' <div>' + '   <ul id="sortList"></ul>' + ' </div>';
    addTask(newArr);
    const list = document.querySelectorAll('#sortList li');
    expect(list).toHaveLength(1);
  });

  test('Add task to local Storage', () => {
    const newObj = { description: 'sth', index: 1, completed: true };
    localStoragemock.setItem('key', []);

    const toDos = [];

    toDos.push(newObj);

    localStoragemock.setItem('key', toDos);

    expect(localStoragemock.getItem('key')[0]).toEqual(newObj);
    expect(localStoragemock.getItem('key').length).toEqual(1);
  });
});

describe('remove function', () => {
  test('removes task from arr', () => {
    const newArr = ['Coding', 2];
    const taskToRemove = 'Coding';
    outCollection(taskToRemove, newArr);
    expect(newArr.length).toBe(1);
  });

  test('removes task from display', () => {
    document.body.innerHTML = '<div class="task-container">'
      + '<ul id="sortList">'
      + '<li class="drag" draggable="true">'
      + '<div class="item-container">'
      + '<input type="checkbox" class="data-box">'
      + '<span contenteditable="true">task one</span>'
      + '<i class="fas fa-ellipsis-v" aria-hidden="true"></i>'
      + '<button class="removeBtn">Delete</button>'
      + '</div>'
      + '</li>'
      + '</ul>'
      + '</div>';
    const btn = document.querySelector('.removeBtn');
    deleteBtn(btn);
    const list = document.querySelectorAll('#sortList li');
    expect(list).toHaveLength(0);
  });

  test('remove task from local storage by updating it', () => {
    localStoragemock.setItem('exist', []);
    const grabKey = localStoragemock.key('exist');
    const newArr = [];
    const fake1 = {
      description: 'exist_1',
      index: 1,
      completed: false,
    };
    newArr.push(fake1);

    const fake2 = {
      description: 'exist_2',
      index: 2,
      completed: false,
    };
    newArr.push(fake2);
    localStoragemock.setItem('exist', newArr);

    const itemToBeDel = { index: 2 };

    expect(
      deleteLocalStorage(grabKey, localStoragemock.getItem('exist'), itemToBeDel),
    ).toHaveLength(1);

    expect(deleteLocalStorage(grabKey, localStoragemock.getItem('exist'), itemToBeDel)).toEqual([
      { description: 'exist_1', index: 1, completed: false },
    ]);
  });
});
