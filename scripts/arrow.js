"use strict";
class Arrow {
    constructor(fromNode, toNode) {
        this.fromNode = fromNode;
        this.toNode = toNode;
    }
    startX() {
        let startXPos;
        if (this.isOverlappingX()) {
            startXPos = this.fromNode.x + this.fromNode.width / 2;
        }
        else if (this.fromNode.x < this.toNode.x) {
            startXPos = this.fromNode.x + this.fromNode.width;
        }
        else {
            startXPos = this.fromNode.x;
        }
        return startXPos;
    }
    startY() {
        let startYPos;
        if (this.isOverlappingX() && this.fromNode.y < this.toNode.y) {
            startYPos = this.fromNode.y + this.fromNode.height;
        }
        else if (this.isOverlappingX() && this.fromNode.y > this.toNode.y) {
            startYPos = this.fromNode.y;
        }
        else {
            startYPos = this.fromNode.y + this.fromNode.height / 2;
        }
        return startYPos;
    }
    endX() {
        let endXPos;
        if (this.isOverlappingX()) {
            endXPos = this.toNode.x + this.toNode.width / 2;
        }
        else if (this.fromNode.x < this.toNode.x) {
            endXPos = this.toNode.x;
        }
        else {
            endXPos = this.toNode.x + this.toNode.width;
        }
        return endXPos;
    }
    endY() {
        let endYPos;
        if (this.isOverlappingX() && this.fromNode.y < this.toNode.y) {
            endYPos = this.toNode.y;
        }
        else if (this.isOverlappingX() && this.fromNode.y > this.toNode.y) {
            endYPos = this.toNode.y + this.toNode.height;
        }
        else {
            endYPos = this.toNode.y + this.toNode.height / 2;
        }
        return endYPos;
    }
    isBetween(a, b, inclusive) {
        let isValid = false;
        if (a >= b && a <= inclusive) {
            isValid = true;
        }
        return isValid;
    }
    isOverlappingX() {
        const margin = 30;
        return (this.isBetween(this.toNode.x, this.fromNode.x - margin, this.fromNode.x + this.fromNode.width + margin) ||
            this.isBetween(this.toNode.x + this.toNode.width, this.fromNode.x - margin, this.fromNode.x + this.fromNode.width + margin));
    }
}
