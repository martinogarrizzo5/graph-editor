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

// TODO: modify arrows to be in the right part of the nodes
// TODO: make arrows curved of 3 points
// TODO: add scale effect
// TODO: on right click ask the user if he wants to delete the node
// TODO: delete node when backspace is pressed with no character in the text
