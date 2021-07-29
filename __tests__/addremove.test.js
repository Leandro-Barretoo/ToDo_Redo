import {addTask, outCollection} from '../__mocks__/addremove.js';
//import {RemoveTask} from '../src/addremove.js';

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

describe('remove function', () => {
  test('removes task from arr', () => {
    const newArr = ['Coding', 2];
    const taskToRemove = 'Coding';
    outCollection(taskToRemove, newArr);
    expect(newArr.length).toBe(1);
  })

  test('removes task from display', () => {
    document.body.innerHTML =
    ' <div>' +
    '   <ul id="sortList"></ul>' +
    ' </div>';
  })
})
