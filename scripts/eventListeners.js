"use strict";
canvas.addEventListener("contextmenu", (event) => {
    // prevent right click menu appearing on screen
    event.preventDefault();
});
canvas.addEventListener("mousedown", (event) => {
    const x = event.x + window.scrollX;
    const y = event.y + window.scrollY;
    // left mouse button
    if (event.button === 0) {
        let nodeInArea = findNodeInArea(x, y);
        if (nodeInArea == null) {
            // add new node
            isMovingNode = false;
            const drawnNode = graph.addAndDrawVertex(x, y);
            selectedNode = drawnNode;
            repaintCanvas(canvasCtx);
        }
        else {
            // move existent node
            setupMoveNodeEvent(nodeInArea);
        }
    }
    // right mouse button
    else if (event.button === 2) {
        setupScrollWindowEvent();
    }
});
// clean events on mouse up
canvas.addEventListener("mouseup", (event) => {
    removeMoveNodeEvent();
    removeScrollWindowEvent();
});
function moveNodeEvent(event) {
    if (movingNode) {
        movingNode.x = event.x + window.scrollX - movingNode.width / 2;
        movingNode.y = event.y + window.scrollY - movingNode.height / 2;
        repaintCanvas(canvasCtx);
    }
}
// edit text inside node
canvas.addEventListener("dblclick", (event) => {
    const x = event.x + window.scrollX;
    const y = event.y + window.scrollY;
    const nodeInArea = findNodeInArea(x, y);
    if (nodeInArea) {
        if (nodeInArea === selectedNode) {
            selectedNode = null;
        }
        else {
            selectedNode = nodeInArea;
        }
        repaintCanvas(canvasCtx);
    }
});
window.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
        canvas.addEventListener("click", connectNodesEvent);
    }
    if (selectedNode) {
        event.preventDefault();
        if (event.key == "Control" || event.key == "Shift") {
            return;
        }
        if (event.key === "x" && event.ctrlKey) {
            graph.deleteNode(selectedNode.id);
            selectedNode = null;
            firstNode = null;
            secondNode = null;
        }
        else if (event.key === "Backspace") {
            // remove last character
            selectedNode.text = selectedNode.text.slice(0, selectedNode.text.length - 1);
        }
        else {
            selectedNode.text += event.key;
        }
        if (selectedNode) {
            selectedNode.width = Math.max(selectedNode.initialWidth, selectedNode.text.length * 15);
        }
    }
    repaintCanvas(canvasCtx);
});
window.addEventListener("keyup", (event) => {
    canvas.removeEventListener("click", connectNodesEvent);
});
