"use strict";
class Arrow {
    constructor(fromNode, toNode) {
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
