import { insertionSortSketch } from "./insertionSort.js";
import { selectionSortSketch } from "./selectionSort.js";

const enabledSketches = [
    insertionSortSketch,
    selectionSortSketch,
];

for(let sketch of enabledSketches) {
    new p5(sketch);
};
