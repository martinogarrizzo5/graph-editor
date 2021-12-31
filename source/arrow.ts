class Arrow {
  fromNode: Rectangle;
  toNode: Rectangle;

  constructor(fromNode: Rectangle, toNode: Rectangle) {
    this.fromNode = fromNode;
    this.toNode = toNode;
  }

  startX() {
    return this.fromNode.x + this.fromNode.width;
  }

  startY() {
    return this.fromNode.y + this.fromNode.height / 2;
  }

  endX() {
    return this.toNode.x;
  }

  endY() {
    return this.toNode.y + this.toNode.height / 2;
  }
}
