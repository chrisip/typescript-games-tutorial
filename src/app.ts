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

const keyboardInput = (event: KeyboardEvent) => {
  // Press Left Arrow
  if (event.keyCode === 37) {
    window.alert('Left Key Pressed');
  }
  // Press Up Arrow
  else if (event.keyCode === 38) {
    window.alert('Up Key Pressed');
  }
  // Press Right Arrow
  else if (event.keyCode === 39) {
    window.alert('Right Key Pressed');
  }
  // Press Down Arrow
  else if (event.keyCode === 40) {
    window.alert('Down Key Pressed');
  }
  // Press Space Bar
  else if (event.keyCode === 32) {
    window.alert('Space Key Pressed');
  }
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  document.addEventListener('keydown', keyboardInput);
  ctx = canvas.getContext('2d');
  gameLoop();
}