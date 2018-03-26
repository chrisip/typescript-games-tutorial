let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

interface iShape {
  draw(): void;
  x: number;
  y: number;
  color: string;
  lineWidth: number;
}

class cCircle implements iShape {
  constructor(
      public x: number = 0,
      public y: number = 0,
      public radius: number = 10,
      public color: string = 'red',
      public lineWidth: number = 2,
  ) {}

  public draw = (): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}

class cRectangle implements iShape {
  constructor(
      public x: number = 0,
      public y: number = 0,
      public width: number = 0,
      public height: number = 0,
      public color: string = 'blue',
      public lineWidth: number = 2,
  ) {}

  public draw = (): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
  }
}

const circle1: cCircle = new cCircle(200, 300, 50);
const circle2: cCircle = new cCircle(400, 550, 150, 'blue', 5);

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (circle1.x++ >= (CANVAS_WIDTH + circle1.radius)) {
    circle1.x = -circle1.radius;
  }
  if (circle2.y++ >= (CANVAS_HEIGHT + circle2.radius)) {
    circle2.y = -circle2.radius;
  }
  circle1.draw();
  circle2.draw();
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext('2d');
  gameLoop();
}