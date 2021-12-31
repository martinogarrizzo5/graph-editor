"use strict";
canvas.addEventListener("contextmenu", (event) => {
    // prevent right click menu appearing on screen
    event.preventDefault();
});
canvas.addEventListener("mousedown", (event) => {
    // left mouse button
    if (event.button === 0) {
        // check if click is made inside the area of a node
        let nodeInArea = findNodeInArea(event.x + window.scrollX, event.y + window.scrollY);
        // draw the node
        if (nodeInArea == null) {
            isMovingNode = false;
            const baseNodeSize = 100;
            drawNode(event.x + window.scrollX - baseNodeSize / 2, event.y + window.scrollY - baseNodeSize / 2, baseNodeSize, baseNodeSize);
            // add node to the table
            const drawnNode = new Rectangle(event.x + window.scrollX - baseNodeSize / 2, event.y + window.scrollY - baseNodeSize / 2, baseNodeSize, baseNodeSize);
            graph.addVertex(drawnNode);
            selectedNode = drawnNode;
            repaintCanvas(canvasCtx);
        }
        // move the node
        else {
            isMovingNode = true;
            movingNode = nodeInArea;
            canvas.addEventListener("mousemove", moveNodeEvent);
        }
    }
    // right mouse button
    else if (event.button === 2) {
        canvas.addEventListener("mousemove", scrollWindowEvent);
    }
});
// clean events on mouse up
canvas.addEventListener("mouseup", (event) => {
    canvas.removeEventListener("mousemove", scrollWindowEvent);
    canvas.removeEventListener("mousemove", moveNodeEvent);
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
    if (selectedNode) {
        event.preventDefault();
        if (event.key == "Control") {
            return;
        }
        if (event.key === "x" && event.ctrlKey) {
            graph.deleteNode(selectedNode.id);
        }
        else if (event.key === "Backspace") {
            // remove last character
            selectedNode.text = selectedNode.text.slice(0, selectedNode.text.length - 1);
        }
        else if (event.key === "Shift") {
            canvas.addEventListener("click", connectNodesEvent);
        }
        else {
            selectedNode.text += event.key;
        }
        selectedNode.width = Math.max(selectedNode.initialWidth, selectedNode.text.length * 15);
    }
    repaintCanvas(canvasCtx);
});
window.addEventListener("keyup", (event) => {
    canvas.removeEventListener("click", connectNodesEvent);
});
