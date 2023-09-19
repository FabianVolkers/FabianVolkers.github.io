// import schema from "./schema.js";
import {green, red, yellow, darkBlue} from "./config.js";
import {sleep} from "./utils.js";

let selectionSortP5 = new p5((sketch) => {
  var canvasParent = "canvas-selection-sort";
  var buttonParent = "button-container-selection-sort";
  var minIndex = 0;
  var maxSortedIndex = 0;
  var play = false;
  var button, canvasHeight, canvasWidth, array, states;

  async function selectionSort(callback = () => {}) {
    const startTime = Date.now();
    let steps = 0;
  
    console.log("Selection Sort");
  
    for (let i = 0; i < array.length; i++) {
      states = Array.from({ length: array.length }, () => 0);
      minIndex = i;
      states[i] = 1;
  
      for (let j = i + 1; j < array.length; j++) {
        // find the smallest value of the unsorted part
        if (array[j] < array[minIndex]) minIndex = j;
        states[j] = 1;
        steps++;
        await sleep(2);
      }
  
      // swap smallest value with first element of unsorted part
      const smallestValue = array[minIndex];
      array[minIndex] = array[i];
      array[i] = smallestValue;
      maxSortedIndex = i;
  
      states[i] = 0;
    }
  
    minIndex = -1;
  
    const timeInMs = Date.now() - startTime;
    console.log(`Executed in ${timeInMs}ms and ${steps} steps`);
  
    callback();
  }

  function createPlayButton(id, parent) {
    button = sketch.createButton("Play");
    button.elt.id = id;
    button.parent(parent);
  
    button.mousePressed(() => {
      play = true;
      button.hide();
      selectionSort(() => {
        setTimeout(() => {
          play = false;
          console.log(button.elt);
          button.elt.textContent = "Replay";
          button.show();
        }, 1000);
      });
    });
  }

  sketch.setup = () => {
    canvasWidth = document.getElementById(canvasParent).offsetWidth;
    canvasHeight = document.getElementById(canvasParent).offsetHeight;
    array = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * canvasHeight)
    );
    states = Array.from({ length: array.length }, () => 0);

    let canvas = sketch.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParent);
    canvas.elt.style.setProperty("margin", "5% 0px");

    sketch.background(...darkBlue);
    createPlayButton("selection-sort-play-button", buttonParent);

  };

  sketch.draw = () => {
    if (!play) return;
    sketch.background(...darkBlue);
    const barWidth = canvasWidth / array.length;
    for (let i = 0; i < array.length; i++) {
      if (i == minIndex) sketch.fill(...red);
      else if (states[i] == 1) sketch.fill(...yellow);
      else if (i <= maxSortedIndex) sketch.fill(...green);
      else sketch.fill(255);

      sketch.rect(i * barWidth, canvasHeight - array[i], barWidth, array[i]);
    }
  }
});
