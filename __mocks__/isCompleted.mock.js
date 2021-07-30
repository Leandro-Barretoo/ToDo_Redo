export function isComplete(elements, arr) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      arr[i].completed = false;
    } else {
      arr[i].completed = true;
    }
  }
  return arr;
}
