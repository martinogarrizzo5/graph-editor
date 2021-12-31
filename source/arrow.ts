class Arrow {
  fromNode: Rectangle;
  toNode: Rectangle;

  constructor(fromNode: Rectangle, toNode: Rectangle) {
    this.fromNode = fromNode;
    this.toNode = toNode;
  }

  startX(): number {
    let startXPos: number;

    if (this.isOverlappingX()) {
      startXPos = this.fromNode.x + this.fromNode.width / 2;
    } else if (this.fromNode.x < this.toNode.x) {
      startXPos = this.fromNode.x + this.fromNode.width;
    } else {
      startXPos = this.fromNode.x;
    }

    return startXPos;
  }

  startY() {
    let startYPos: number;

    if (this.isOverlappingX() && this.fromNode.y < this.toNode.y) {
      startYPos = this.fromNode.y + this.fromNode.height;
    } else if (this.isOverlappingX() && this.fromNode.y > this.toNode.y) {
      startYPos = this.fromNode.y;
    } else {
      startYPos = this.fromNode.y + this.fromNode.height / 2;
    }
    return startYPos;
  }

  endX(): number {
    let endXPos: number;

    if (this.isOverlappingX()) {
      endXPos = this.toNode.x + this.toNode.width / 2;
    } else if (this.fromNode.x < this.toNode.x) {
      endXPos = this.toNode.x;
    } else {
      endXPos = this.toNode.x + this.toNode.width;
    }

    return endXPos;
  }

  endY() {
    let endYPos: number;

    if (this.isOverlappingX() && this.fromNode.y < this.toNode.y) {
      endYPos = this.toNode.y;
    } else if (this.isOverlappingX() && this.fromNode.y > this.toNode.y) {
      endYPos = this.toNode.y + this.toNode.height;
    } else {
      endYPos = this.toNode.y + this.toNode.height / 2;
    }

    return endYPos;
  }

  isBetween(a: number, b: number, inclusive: number): boolean {
    let isValid = false;

    if (a >= b && a <= inclusive) {
      isValid = true;
    }

    return isValid;
  }

  isOverlappingX() {
    const margin = 30;
    return (
      this.isBetween(
        this.toNode.x,
        this.fromNode.x - margin,
        this.fromNode.x + this.fromNode.width + margin
      ) ||
      this.isBetween(
        this.toNode.x + this.toNode.width,
        this.fromNode.x - margin,
        this.fromNode.x + this.fromNode.width + margin
      )
    );
  }
}
