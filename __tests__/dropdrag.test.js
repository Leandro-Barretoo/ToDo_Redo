import {drop} from '../__mocks__/dropdrag.js';

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
