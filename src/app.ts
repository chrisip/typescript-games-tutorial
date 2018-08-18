import * as Canvas from './canvas';
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
  bulletList.forEach(bullet => {
    bullet.draw(ctx);
  })
  reporter.draw();
}

const shapeList: Array<Shape.Shape> = new Array<Shape.Shape>();
const bulletList: Array<Shape.Bullet> = new Array<Shape.Bullet>();

const asteroid: Shape.Asteroid = new Shape.Asteroid();
asteroid.velocityX = 0;
asteroid.velocityY = 0;

const spaceship: Shape.Spaceship = new Shape.Spaceship(200, 450, 5);

let reporter: Stat.Reporter;

const keyboardInput = (event: KeyboardEvent) => {
  // Press Left Arrow or 'A' Key
  if (event.keyCode === 37 || event.keyCode === 65) {
    spaceship.turnLeft();
  }
  // Press Up Arrow or 'W' Key
  else if (event.keyCode === 38 || event.keyCode === 87) {
    spaceship.accelerate();
  }
  // Press Right Arrow or 'D' Key
  else if (event.keyCode === 39 || event.keyCode === 68) {
    spaceship.turnRight();
  }
  // Press Down Arrow or 'S' Key
  else if (event.keyCode === 40 || event.keyCode === 83) {
    spaceship.decelerate();
  }
  // Press Space Bar
  else if (event.keyCode === 32) {
    event.preventDefault();
    let bullet: Shape.Bullet|null = null;
    bulletList.some(existingBullet => {
      if (!existingBullet.active) {
        bullet = existingBullet;
        return true;
      }
    });
    if (!bullet || bullet.active) {
      bullet = new Shape.Bullet(spaceship.x, spaceship.y, 3);
      bulletList.push(bullet);
    }
    else {
      bullet.x = spaceship.x;
      bullet.y = spaceship.y;
      bullet.active = true;
    }
    bullet.launch(spaceship.orientation);
  }
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  document.addEventListener('keydown', keyboardInput);
  shapeList.push(spaceship);
  reporter =  new Stat.Reporter('stats', spaceship);
  ctx = canvas.getContext('2d');
  gameLoop();
}