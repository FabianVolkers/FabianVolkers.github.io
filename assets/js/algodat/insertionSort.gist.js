// source for https://gist.github.com/FabianVolkers/a81c197520a895e93a9da6af9be483c9

function insertionSort(array) {
  const sortedArray = [...array];

  for (let i = 0; i < sortedArray.length; i++) {
    let maxSortedIndex = i;

    for (let j = 0; j < maxSortedIndex; j++) {
      if (sortedArray[j] > sortedArray[i]) {
        // insert next biggest item into array
        sortedArray.splice(j, 0, sortedArray[i]);

        // remove element from array
        sortedArray.splice(i + 1, 1);
        break;
      }
    }
  }

  return sortedArray;
}
