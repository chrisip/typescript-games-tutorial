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
  shapeList.forEach(shape => {
    shape.draw(ctx);
  });
}

const shapeList: Array<Shape.Shape> = new Array<Shape.Shape>();

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  shapeList.push(new Shape.Asteroid());
  shapeList.push(new Shape.Asteroid());
  shapeList.push(new Shape.Asteroid());
  shapeList.push(new Shape.Asteroid());
  shapeList.push(new Shape.Asteroid());
  shapeList.push(new Shape.Circle(20, 50, 30));
  shapeList.push(new Shape.Circle(120, 70, 50));
  shapeList.push(new Shape.Rectangle(500, 500, 80, 60));
  ctx = canvas.getContext('2d');
  gameLoop();
}