import { green, red, yellow, darkBlue } from "./config.js";


export class sortFunctionSketch {
    constructor(config) {
        this.canvasParent = config.canvasParent;
        this.buttonParent = config.buttonParent;
        this.sortFunction = config.sortFunction;
        this.yellow = config.yellow;
        this.green = config.green;
        this.red = config.red;

        this.play = false;

        this.canvasWidth, this.canvasHeight, this.button, this.canvas, this.array;

        for (let varName of config.vars) {
            this[varName] = config[varName];
        }
    }

    createPlayButton(id, parent, sketch) {
        this.button = sketch.createButton("Play");
        this.button.elt.id = id;
        this.button.parent(parent);

        this.button.mousePressed(() => {
            this.play = true;
            this.button.hide();
            this.sortFunction(this);
        });
    }

    sortCallback = () => {
        setTimeout(() => {
            this.play = false;
            this.button.elt.textContent = "Replay";
            this.button.show();
        }, 1000);
    };

    get sketch() {
        // inject 'this' into sketch
        return (sketch) => this._sketch(sketch, this);
    }

    _sketch(sketch, obj) {
        console.log(obj)
        sketch.setup = () => {
            obj.canvasWidth = document.getElementById(obj.canvasParent).offsetWidth;
            obj.canvasHeight = document.getElementById(obj.canvasParent).offsetHeight;

            obj.array = Array.from({ length: 100 }, () => Math.floor(Math.random() * obj.canvasHeight));
            if (Object.hasOwn(obj, "states")) {
                obj.states = Array.from({ length: obj.array.length }, () => 0);
            }

            obj.canvas = sketch.createCanvas(obj.canvasWidth, obj.canvasHeight);
            obj.canvas.parent(obj.canvasParent);
            obj.canvas.elt.style.setProperty("margin", "5% 0px");
            sketch.background(...darkBlue);
            obj.createPlayButton(`${obj.sortFunction.name}-play-button`, obj.buttonParent, sketch);
        };

        sketch.draw = () => {
            if (!obj.play) return;
            sketch.background(...darkBlue);
            const barWidth = obj.canvasWidth / obj.array.length;
            for (let i = 0; i < obj.array.length; i++) {
                if (obj.red(i, obj)) sketch.fill(...red);
                else if (obj.yellow(i, obj)) sketch.fill(...yellow);
                else if (obj.green(i, obj)) sketch.fill(...green);
                else sketch.fill(255);
                sketch.rect(i * barWidth, obj.canvasHeight - obj.array[i], barWidth, obj.array[i]);
            }
        };

    };


};