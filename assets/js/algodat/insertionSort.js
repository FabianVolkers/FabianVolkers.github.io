import { darkBlue, red, yellow, green } from "./config.js";
import { sleep } from "./utils.js";

export const insertionSortP5 = new p5((sketch) => {
  var canvasParent = "canvas-insertion-sort";
  var buttonParent = "button-container-insertion-sort";
  var minIndex = 0;
  var maxSortedIndex = 0;
  var play = false;
  var button, canvasHeight, canvasWidth, array, states, canvas;

  function createPlayButton(id, parent) {
    button = sketch.createButton("Play");
    button.elt.id = id;
    button.parent(parent);

    button.mousePressed(() => {
      play = true;
      button.hide();
      insertionSort(() => {
        setTimeout(() => {
          play = false;
          console.log(button.elt);
          button.elt.textContent = "Replay";
          button.show();
        }, 1000);
      });
    });
  }

  async function insertionSort(callback = () => {}) {
    const startTime = Date.now();
    let steps = 0;

    console.log("Insertion Sort");
    // const sortedArray = [...array];

    for (let i = 0; i < array.length; i++) {
      maxSortedIndex = i;

      for (let j = 0; j < maxSortedIndex; j++) {
        minIndex = j;
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
    minIndex = -1;

    const timeInMs = Date.now() - startTime;
    console.log(`Executed in ${timeInMs}ms and ${steps} steps`);
    callback();
    // return array;
  }
  sketch.setup = () => {
    canvasWidth = document.getElementById(canvasParent).offsetWidth;
    canvasHeight = document.getElementById(canvasParent).offsetHeight;
    array = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * canvasHeight)
    );
    states = Array.from({ length: array.length }, () => 0);

    canvas = sketch.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParent);
    canvas.elt.style.setProperty("margin", "5% 0px");

    sketch.background(...darkBlue);
    createPlayButton("insertion-sort-play-button", buttonParent);
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
  };
});
