"use strict";
const graph = new Graph();
let isMovingNode = false;
let selectedNode = null;
let movingNode = null;
// node to connect with an arrow
let firstNode = null;
let secondNode = null;
setupEditor();
const canvas = document.querySelector("#editor");
const canvasCtx = canvas.getContext("2d");
// TODO: make arrows curved of 3 points
// TODO: add scale effect
