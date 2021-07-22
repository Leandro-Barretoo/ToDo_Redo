export function isComplete(elem, index, arr) {
  const indexes = document.querySelectorAll('#sortList li');
  let indexPosition = 0;

  for (let i = 0; i < indexes.length; i += 1) {
    if (indexes[i] === elem.parentNode.parentNode) {
      indexPosition = i;
    }
  }

  if (elem.checked) {
    elem.nextSibling.classList.add('done');
    arr[indexPosition].completed = 'true';
  } else {
    elem.removeAttribute('checked', '');
    elem.nextSibling.classList.remove('done');
    arr[indexPosition].completed = 'false';
  }
}
