import * as Canvas from './canvas';
import * as Shape from './shape';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const circle1: Shape.Circle = new Shape.Circle(200, 300, 50);
const circle2: Shape.Circle = new Shape.Circle(400, 550, 150, 'blue', 5);

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  if (circle1.x++ >= (Canvas.WIDTH + circle1.radius)) {
    circle1.x = -circle1.radius;
  }
  if (circle2.y++ >= (Canvas.HEIGHT + circle2.radius)) {
    circle2.y = -circle2.radius;
  }
  circle1.draw(ctx);
  circle2.draw(ctx);
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  ctx = canvas.getContext('2d');
  gameLoop();
}