import {addTask} from '../__mocks__/addremove.js';
import {RemoveTask} from '../src/addremove.js';

describe('add function', () => {
  test('add item to arr', () => {
    let newArr = [];
    document.body.innerHTML =
    ' <div>' +
    '   <ul id="sortList"></ul>' +
    ' </div>';
    addTask(newArr);
    expect(newArr.length).toBe(1);
  })

  test('display element on the page', () => {
    let newArr = [];
    document.body.innerHTML =
    ' <div>' +
    '   <ul id="sortList"></ul>' +
    ' </div>';
    addTask(newArr);
    const list = document.querySelectorAll('#sortList li');
    expect(list).toHaveLength(1);
  })
});
