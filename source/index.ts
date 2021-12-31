const graph = new Graph();

let isMovingNode: boolean = false;
let selectedNode: Rectangle | null = null;
let movingNode: Rectangle | null = null;

// node to connect with an arrow
let firstNode: Rectangle | null = null;
let secondNode: Rectangle | null = null;

setupEditor();
const canvas = document.querySelector("#editor") as HTMLCanvasElement;
const canvasCtx = canvas.getContext("2d")!;

// TODO: make arrows curved of 3 points
// TODO: add scale effect
