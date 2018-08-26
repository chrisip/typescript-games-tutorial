import * as Canvas from './canvas';
import * as Input from './input';
import * as Shape from './shape';
import * as Stat from './stat';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  shapeList.forEach(shape => {
    shape.draw(ctx);
  });
  spaceship.bulletList.forEach(bullet => {
    bullet.draw(ctx);
  })
  reporter.draw();
}

const shapeList: Array<Shape.Shape> = new Array<Shape.Shape>();

const asteroid: Shape.Asteroid = new Shape.Asteroid();
asteroid.velocityX = 0;
asteroid.velocityY = 0;

const spaceship: Shape.Spaceship = new Shape.Spaceship(200, 450, 5);

let reporter: Stat.Reporter;
let keyboardInput: Input.Keyboard;

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  document.addEventListener('keydown', keyboardInput);
  shapeList.push(spaceship);
  keyboardInput = new Input.Keyboard();
  keyboardInput.addKeyCodeCallback(Input.Key.Left, spaceship.turnLeft);
  keyboardInput.addKeyCodeCallback(Input.Key.A, spaceship.turnLeft);
  keyboardInput.addKeyCodeCallback(Input.Key.Up, spaceship.accelerate);
  keyboardInput.addKeyCodeCallback(Input.Key.W, spaceship.accelerate);
  keyboardInput.addKeyCodeCallback(Input.Key.Right, spaceship.turnRight);
  keyboardInput.addKeyCodeCallback(Input.Key.D, spaceship.turnRight);
  keyboardInput.addKeyCodeCallback(Input.Key.Down, spaceship.decelerate);
  keyboardInput.addKeyCodeCallback(Input.Key.S, spaceship.decelerate);
  keyboardInput.addKeyCodeCallback(Input.Key.Space, spaceship.shoot);
  reporter =  new Stat.Reporter('stats', spaceship);
  ctx = canvas.getContext('2d');
  gameLoop();
}