console.log("Selection sort");
const canvasParent = "canvas-selection-sort";

// console.log(document.getElementById(canvasParent).offsetWidth);

// initialize array with 30 random numbers
var states = Array.from({ length: array.length }, () => 0);
var minIndex = 0;
var maxSortedIndex = 0;
var play = false;
var button, canvasRect, canvasHeight, canvasWidth, array;

function setup() {
  canvasWidth = document.getElementById(canvasParent).offsetWidth;
  canvasHeight = canvasWidth * 0.75;
  array = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * canvasHeight)
  );
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-selection-sort");
//   canvas.elt.style.setProperty("position", "absolute");
    // canvas.elt.style.setProperty("left", "0");
    // canvas.elt.style.setProperty("top", "0");
    // canvas.elt.style.setProperty("z-index", "-1");
    // canvas.elt.style.setProperty("z-index", "-1");

  background(0);
  // play button in the center
  button = createButton("Play");
  button.size(90, 45);
  button.parent(canvasParent);
  button.elt.style.setProperty("position", "absolute");
  button.elt.style.setProperty("top", "0");
  button.elt.style.setProperty("left", "calc(50% - 45px)");
  button.elt.style.setProperty(
    "margin-top",
    `calc(${canvasHeight / 2}px - 22.5px)`
  );

  //   , marginTop = "50%");
  //   console.log(canvasRect.left, canvasRect.top)

  button.mousePressed(() => {
    play = true;
    button.hide();
    selectionSort(() => {
        setTimeout(() => {
            play = false;
            // button.elt.innerHTML("Replay")
            button.show();
        }, 1000);
    });
});
}

function centerButton() {
  canvasRect = document
    .getElementById(canvasParent)
    .childNodes[0].getBoundingClientRect();
  button.position(canvasRect.left + width / 2 - 50, canvasRect.top + 300 - 25);
}

function draw() {
  if (!play) {
    // centerButton();
    return;
  }
  background(0);
  const barWidth = width / array.length;
  for (let i = 0; i < array.length; i++) {
    if (i == minIndex) fill(255, 0, 0);
    else if (states[i] == 1) fill(255, 255, 0);
    else if (i <= maxSortedIndex) fill(0, 255, 0);
    else fill(255);

    rect(i * barWidth, height - array[i], barWidth, array[i]);
  }
}

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

  // if(DEBUG) console.log("Sorted Array: ", array)
  const timeInMs = Date.now() - startTime;
  console.log(`Executed in ${timeInMs}ms and ${steps} steps`);

  callback();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
