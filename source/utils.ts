function scrollOnLoad(x: number, y: number) {
  setTimeout(() => {
    window.scrollTo(x, y);
  }, 1);
}

function scrollWindowEvent(event: MouseEvent) {
  window.scrollBy(-event.movementX, -event.movementY);
}

function findNodeInArea(x: number, y: number) {
  let nodeInArea: Rectangle | null = null;

  // check if click is made inside the area of a node
  for (let node of graph.getNodes()) {
    if (x >= node.x && x <= node.x + node.width) {
      if (y >= node.y && y <= node.y + node.height) {
        // can't draw a node when clicking on another one
        nodeInArea = node;
        break;
      }
    }
  }

  return nodeInArea;
}

function repaintCanvas(canvasCtx: CanvasRenderingContext2D) {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackgroundGrid(canvas);
  for (let node of graph.getNodes()) {
    const rectangle = node;

    const borderColor = "#ad0144";
    const backgroundColor = "rgba(255, 255, 255, 0.8)";
    let highlightColor = null;

    if (selectedNode && rectangle.id === selectedNode.id) {
      highlightColor = "yellow";
    }

    if (firstNode === rectangle || secondNode === rectangle) {
      highlightColor = "green";
    }

    drawNode(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height,
      rectangle.text,
      highlightColor
    );
  }

  for (let nodeArrows of graph.getArrows()) {
    for (let arrow of nodeArrows) {
      drawArrow(
        canvasCtx,
        arrow.startX(),
        arrow.startY(),
        arrow.endX(),
        arrow.endY()
      );
    }
  }
}

// add basic full-screen canvas to the body of HTML
function setupEditor() {
  const body = document.querySelector("body");

  const canvas = document.createElement("canvas");
  canvas.id = "editor";
  canvas.width = window.innerWidth * 4;
  canvas.height = window.innerHeight * 4;
  canvas.style.backgroundColor = "black";

  body!.appendChild(canvas);

  scrollOnLoad(canvas.width / 3.5, canvas.height / 3.5);
  drawBackgroundGrid(canvas);
}

function connectNodesEvent(event: MouseEvent) {
  const x = event.x + window.scrollX;
  const y = event.y + window.scrollY;

  if (firstNode) {
    const foundNode = findNodeInArea(x, y);
    if (foundNode === firstNode) {
      firstNode = null;
    } else {
      secondNode = foundNode;

      // draw arrow and add it to array
      if (secondNode) {
        drawArrow(
          canvasCtx,
          firstNode.x + firstNode.width,
          firstNode.y + firstNode.height / 2,
          secondNode.x,
          secondNode.y + secondNode.height / 2
        );

        graph.addEdge(firstNode, secondNode);

        firstNode = null;
        secondNode = null;
      }
    }
  } else {
    firstNode = findNodeInArea(x, y);
  }

  console.log(firstNode, secondNode);
  repaintCanvas(canvasCtx);
}

function setupMoveNodeEvent(node: Rectangle) {
  isMovingNode = true;
  movingNode = node;
  canvas!.addEventListener("mousemove", moveNodeEvent);
}

function removeMoveNodeEvent() {
  canvas!.removeEventListener("mousemove", moveNodeEvent);
}

function setupScrollWindowEvent() {
  canvas!.addEventListener("mousemove", scrollWindowEvent);
}

function removeScrollWindowEvent() {
  canvas!.removeEventListener("mousemove", scrollWindowEvent);
}
