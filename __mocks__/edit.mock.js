// make a span
// change the span
// replace new span with old span content
// changes the array
// changes the localstorage
export function changeText(toBeEdited, newlyAdd) {
  return (toBeEdited.innerHTML = newlyAdd);
}

export function arrEdit(arr, newlyAdd) {
  return (arr[0].description = newlyAdd);
}
