"use strict";
class Rectangle {
    constructor(x, y, width, height) {
        this.id = Math.random().toString() + Date.now();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = "";
        this.initialHeight = height;
        this.initialWidth = width;
    }
}
