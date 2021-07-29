import {drop} from '../__mocks__/dropdrag.js';
import {clearChecked} from '../__mocks__/addremove.js';

describe('drag and drop', () => {
  test('update index', () => {
    const arr = [{description: 'Task One', completed: 'false', index: 0},
    {description: 'Task Two', completed: 'false', index: 1},
    {description: 'Task Three', completed: 'false', index: 2}];

    drop(arr, arr[0].index, arr[2].index);

    expect(arr[2].index).toBe(2);
    expect(arr[0].index).toBe(0);
    expect(arr).toEqual([{description: 'Task Two', completed: 'false', index: 0},
    {description: 'Task Three', completed: 'false', index: 1},
    {description: 'Task One', completed: 'false', index: 2}]);
  })
})

describe('Completed status', () => {
  test('get removed if true', () => {
    const arr = [{description: 'Task One', completed: 'true', index: 0},
    {description: 'Task Two', completed: false, index: 1}];
    document.body.innerHTML =
    '<div>' +
    ' <ul id="sortList">' +
    ' <li>Task One</li>' +
    ' <li>Task Two</li>' +
    ' </ul>' +
    '</div>';

    clearChecked(arr);
    const items = document.querySelectorAll('#sortList li');
    expect(items.length).toBe(1);
    expect(arr).toHaveLength(1);
  })
})
