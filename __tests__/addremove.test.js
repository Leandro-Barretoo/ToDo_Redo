import { addTask } from '../__mocks__/addremove.js';
import { RemoveTask } from '../src/addremove.js';
import localStoragemock from '../__mocks__/local-storage-mocks';

describe('add function', () => {
  test('add item to arr', () => {
    const newArr = [];
    document.body.innerHTML = ' <div>' + '   <ul id="sortList"></ul>' + ' </div>';
    addTask(newArr);
    expect(newArr.length).toBe(1);
  });

  test('display element on the page', () => {
    const newArr = [];
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
