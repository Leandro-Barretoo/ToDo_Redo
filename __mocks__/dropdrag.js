function drop(arr, dragpo, dropo) {
  arr.splice(dropo, 0, arr.splice(dragpo, 1)[0]);
  for (let j = 0; j < arr.length; j += 1) {
    arr[j].index = arr.indexOf(arr[j]);
  }
}

export default drop;
