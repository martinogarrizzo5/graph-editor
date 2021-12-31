class Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;

  initialWidth: number;
  initialHeight: number;

  constructor(x: number, y: number, width: number, height: number) {
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
