function drawRect(
  canvasCtx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string = "#ad0144",
  strokeWidth: number = 5,
  fillStyle: string | null = null
) {
  canvasCtx.beginPath();
  canvasCtx.strokeStyle = color;

  if (fillStyle != null) {
    canvasCtx.fillStyle = fillStyle;
    canvasCtx.strokeStyle = fillStyle;
  } else {
    canvasCtx.fillStyle = "transparent";
  }

  canvasCtx.lineWidth = strokeWidth;
  canvasCtx.rect(x, y, width, height);
  canvasCtx.fill();
  canvasCtx.stroke();
}

function drawBackgroundGrid(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  for (let i = 0; i < canvas.width; i += 10) {
    drawRect(ctx, i, 0, 1, canvas.height, "#55555533", 1);
  }

  for (let i = 0; i < canvas.height; i += 10) {
    drawRect(ctx, 0, i, canvas.width, 1, "#55555533", 1);
  }
}

function drawNode(
  x: number,
  y: number,
  width: number,
  height: number,
  text: string = "",
  highlightColor: string | null = null
) {
  const ctx = canvas.getContext("2d")!;
  const borderColor = "#ad0144";
  let backgroundColor = "rgba(255, 255, 255, 0.8)";

  if (highlightColor) {
    backgroundColor = highlightColor;
  }

  drawRect(ctx, x, y, width, height, borderColor, 4, backgroundColor);

  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.font = "20px Inter";

  ctx.fillText(text, x + width / 2, y + height / 2);
}

function drawArrow(
  context: CanvasRenderingContext2D,
  fromx: number,
  fromy: number,
  tox: number,
  toy: number
) {
  canvasCtx.beginPath();
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "white";
  canvasCtx.fillStyle = "white";

  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );

  canvasCtx.stroke();
}
