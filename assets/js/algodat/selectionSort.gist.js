function selectionSort(array) {
  const sortedArray = [...array];

  for (let i = 0; i < sortedArray.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < sortedArray.length; j++) {
      // find the smallest value of the unsorted part
      if (sortedArray[j] < sortedArray[minIndex]) minIndex = j;
    }

    // swap smallest value with first element of unsorted part
    const smallestValue = sortedArray[minIndex];
    sortedArray[minIndex] = sortedArray[i];
    sortedArray[i] = smallestValue;
  }

  return sortedArray;
}
