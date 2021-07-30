import drop from '../__mocks__/dropdrag.js';
import { clearChecked } from '../__mocks__/addremove.js';
import { changeText, arrEdit } from '../__mocks__/edit.mock';
import localStoragemock from '../__mocks__/local-storage-mocks';
import isComplete from '../__mocks__/isCompleted.mock';

describe('drag and drop', () => {
  test('update index', () => {
    const arr = [
      {
        description: 'Task One',
        completed: 'false',
        index: 0,
      },
      {
        description: 'Task Two',
        completed: 'false',
        index: 1,
      },
      {
        description: 'Task Three',
        completed: 'false',
        index: 2,
      },
    ];

    drop(arr, arr[0].index, arr[2].index);

    expect(arr[2].index).toBe(2);
    expect(arr[0].index).toBe(0);
    expect(arr).toEqual([
      {
        description: 'Task Two',
        completed: 'false',
        index: 0,
      },
      {
        description: 'Task Three',
        completed: 'false',
        index: 1,
      },
      {
        description: 'Task One',
        completed: 'false',
        index: 2,
      },
    ]);
  });
});

describe('Completed status', () => {
  test('get removed if true', () => {
    const arr = [
      {
        description: 'Task One',
        completed: 'true',
        index: 0,
      },
      { description: 'Task Two', completed: false, index: 1 },
    ];
    document.body.innerHTML = '<div>'
      + ' <ul id="sortList">'
      + ' <li>Task One</li>'
      + ' <li>Task Two</li>'
      + ' </ul>'
      + '</div>';

    clearChecked(arr);
    const items = document.querySelectorAll('#sortList li');
    expect(items.length).toBe(1);
    expect(arr).toHaveLength(1);
  });
});

describe('Editing Task Description', () => {
  test('change the newly recieved text with old text', () => {
    document.body.innerHTML = '<div >'
      + '<ul id="sortList">'
      + '<li >'
      + '<span contenteditable="true">'
      + 'SAMAN'
      + '</span>'
      + '</div>';
    const toBeEdited = document.body.querySelector('#sortList li span');
    const newlyAddContent = 'LEO';
    changeText(toBeEdited, newlyAddContent);

    expect(toBeEdited.innerHTML).toBe(newlyAddContent);
  });
  test('update Array after edit', () => {
    const arr = [
      {
        description: 'SAMAN',
        completed: 'false',
        index: 0,
      },
      {
        description: 'Task Two',
        completed: 'false',
        index: 1,
      },
      {
        description: 'Task Three',
        completed: 'false',
        index: 2,
      },
    ];
    const newlyAddContent = 'LEO';
    arrEdit(arr, newlyAddContent);
    expect(arr[0].description).toBe(newlyAddContent);
  });
  test('update localStorage after edit', () => {
    const toDos = [];
    const newObj = {
      description: 'SAMAN',
      index: 0,
      completed: true,
    };
    const newlyAddContent = 'LEO';

    localStoragemock.setItem('key', []);
    toDos.push(newObj);
    arrEdit(toDos, newlyAddContent);
    localStoragemock.setItem('key', toDos);

    expect(localStoragemock.getItem('key')[0].description).toEqual(newlyAddContent);
  });
});

describe('Update individual "completed" status of a task', () => {
  test('if it is "true" --> "False" and vice versa', () => {
    document.body.innerHTML = '<div >'
      + '<ul id="sortList">'
      + '<li >'
      + '<input type="checkbox" checked="true">'
      + '</li >'
      + '<li >'
      + '<input type="checkbox">'
      + '</li >'
      + '</ul>'
      + '</div>';
    const arr = [
      { description: 'SAMAN', completed: true, index: 0 },
      { description: 'LEO', completed: false, index: 1 },
    ];
    const elements = document.body.querySelectorAll('input');

    isComplete(elements, arr);
    expect(arr[0].completed).toBeFalsy();
    expect(arr[1].completed).toBeTruthy();
  });
});
