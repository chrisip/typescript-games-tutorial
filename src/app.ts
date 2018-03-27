import * as Canvas from './canvas';
import * as Shape from './shape';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  shapeList.forEach(shape => {
    shape.draw(ctx);
  });
}

const shapeList: Array<Shape.Shape> = new Array<Shape.Shape>();

const asteroid: Shape.Asteroid = new Shape.Asteroid();
asteroid.velocityX = 0;
asteroid.velocityY = 0;


const keyboardInput = (event: KeyboardEvent) => {
  // Press Left Arrow or 'A' Key
  if (event.keyCode === 37 || event.keyCode === 65) {
    asteroid.x -= 5;
  }
  // Press Up Arrow or 'W' Key
  else if (event.keyCode === 38 || event.keyCode === 87) {
    asteroid.y -= 5;
  }
  // Press Right Arrow or 'D' Key
  else if (event.keyCode === 39 || event.keyCode === 68) {
    asteroid.x += 5;
  }
  // Press Down Arrow or 'S' Key
  else if (event.keyCode === 40 || event.keyCode === 83) {
    asteroid.y += 5;
  }
  // Press Space Bar
  else if (event.keyCode === 32) {
    window.alert('Space Key Pressed');
  }
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  document.addEventListener('keydown', keyboardInput);
  shapeList.push(asteroid);
  ctx = canvas.getContext('2d');
  gameLoop();
}