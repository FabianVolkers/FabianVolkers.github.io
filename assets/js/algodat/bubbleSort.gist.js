// source for https://gist.github.com/FabianVolkers/40bbbebdb4c6903bb0637665af4df4ef
function bubbleSort(array) {
  const sortedArray = [...array];

  let sorted = false;
  let minSortedIndex = sortedArray.length;

  while (!sorted) {
    let changed = false;
    for (let i = 0; i < minSortedIndex; i++) {
      if (sortedArray[i] > sortedArray[i + 1]) {
        changed = true;
        const first = sortedArray[i];
        sortedArray[i] = sortedArray[i + 1];
        sortedArray[i + 1] = first;
      }
      if (i + 1 == minSortedIndex) minSortedIndex--;
      steps++;
    }
    if (!changed) sorted = true;
  }

  return sortedArray;
}
