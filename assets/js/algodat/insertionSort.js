import { darkBlue, red, yellow, green } from "./config.js";
import { sleep } from "./utils.js";
import { sortFunctionSketch } from "./schema.js";

const insertionSortConfig = {
    canvasParent: "canvas-insertion-sort",
    buttonParent: "button-container-insertion-sort",
    play: false,
    sortFunction: async (obj) => {
        const startTime = Date.now();
        let steps = 0;
        let array = obj.array;
    
        console.log("Insertion Sort");
    
        for (let i = 0; i < array.length; i++) {
          obj.maxSortedIndex = i;
    
          for (let j = 0; j < obj.maxSortedIndex; j++) {
            obj.minIndex = j;
            if (array[j] > array[i]) {
              // insert next biggest item into array
              array.splice(j, 0, array[i]);
    
              // remove element from array
              array.splice(i + 1, 1);
              break;
            }
            steps++;
            await sleep(2);
          }
        }
        obj.minIndex = -1;
    
        const timeInMs = Date.now() - startTime;
        console.log(`Executed in ${timeInMs}ms and ${steps} steps`);
        obj.sortCallback();
    },
    yellow: (i, obj) => {return false},
    green: (i, obj) => {return i <= obj.maxSortedIndex},
    red: (i, obj) => {return i == obj.minIndex},
    vars: ["maxSortedIndex", "minIndex"]
};

export const insertionSortSketch = new sortFunctionSketch(insertionSortConfig).sketch;
