// import schema from "./schema.js";
import { sortFunctionSketch } from "./schema.js";
import { green, red, yellow, darkBlue } from "./config.js";
import { sleep } from "./utils.js";

const selectionSortConfig = {
  canvasParent: "canvas-selection-sort",
  buttonParent: "button-container-selection-sort",
  play: false,
  sortFunction: async (obj) =>{
    const startTime = Date.now();
    let steps = 0;
    let array = obj.array;

    console.log("Selection Sort");

    for (let i = 0; i < array.length; i++) {
      obj.states = Array.from({ length: array.length }, () => 0);
      obj.minIndex = i;
      obj.states[i] = 1;

      for (let j = i + 1; j < array.length; j++) {
        // find the smallest value of the unsorted part
        if (array[j] < array[obj.minIndex]) obj.minIndex = j;
        obj.states[j] = 1;
        steps++;
        await sleep(2);
      }

      // swap smallest value with first element of unsorted part
      const smallestValue = array[obj.minIndex];
      array[obj.minIndex] = array[i];
      array[i] = smallestValue;
      obj.maxSortedIndex = i;

      obj.states[i] = 0;
    }

    obj.minIndex = -1;

    const timeInMs = Date.now() - startTime;
    console.log(`Executed in ${timeInMs}ms and ${steps} steps`);

    obj.sortCallback();
  },
  yellow: (i, obj) => {return obj.states[i] == 1},
  green: (i, obj) => {return i <= obj.maxSortedIndex},
  red: (i, obj) => {return i == obj.minIndex},
  vars: ["states"],
};

export const selectionSortSketch = new sortFunctionSketch(selectionSortConfig).sketch;
