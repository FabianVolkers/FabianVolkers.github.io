"use strict";
import { insertionSortSketch } from "./insertionSort.js";
import { selectionSortSketch } from "./selectionSort.js";
import { bubbleSortSketch } from "./bubbleSort.js";

const enabledSketches = [
    insertionSortSketch,
    selectionSortSketch,
    bubbleSortSketch,
];

for(let sketch of enabledSketches) {
    new p5(sketch);
};
