import { sortFunctionSketch } from "./schema.js";
import { sleep } from "./utils.js";

const bubbleSortConfig = {
    canvasParent: "canvas-bubble-sort",
    buttonParent: "button-container-bubble-sort",
    play: false,
    sortFunction: async (obj) => {
        console.log("Bubble Sort");
        const startTime = Date.now();
    let steps = 0;

    let array = obj.array;

    let sorted = false
    obj.minSortedIndex = array.length;

    while(!sorted){
        let changed = false;
        for(let i = 0; i < obj.minSortedIndex; i++){
            obj.index = i;
            obj.index2 = i+1;
            if(array[i] > array[i+1]){
                changed = true;
                const first = array[i];
                array[i] = array[i+1]
                array[i+1] = first
                
            }
            if(i+1 == obj.minSortedIndex) obj.minSortedIndex--;
            steps++;
            await sleep(2);
        }

        if(!changed){
            sorted = true;
            obj.index = -1;
            obj.index2 = -1;
            obj.minSortedIndex = -1;
        };
    }

    obj.sortCallback();

    },

    yellow: (i, obj) => {return false},
    green: (i, obj) => {return i >= obj.minSortedIndex},
    red: (i, obj) => {return i == obj.index || i == obj.index2},
    vars: ["index", "index2", "minSortedIndex"],
};

const bblsrt = new sortFunctionSketch(bubbleSortConfig);

console.log(bblsrt);

export const bubbleSortSketch = new sortFunctionSketch(bubbleSortConfig).sketch;