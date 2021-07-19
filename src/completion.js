export function isComplete(elem, index, arr) {
  if (elem.checked) {
    elem.nextSibling.classList.add('done');
    arr[index].completed = 'true';
  } else {
    elem.nextSibling.classList.remove('done');
    arr[index].completed = 'false';
    elem.removeAttribute('checked', '');
  }
}
