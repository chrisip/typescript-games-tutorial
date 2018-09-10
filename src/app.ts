import * as Canvas from './canvas';
import * as Collision from './collision';
import * as Input from './input';
import * as Shape from './shape';
import * as Stat from './stat';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private keyboardInput: Input.Keyboard;
  private shapeList: Array<Shape.Shape>;
  private spaceship: Shape.Spaceship;
  private asteroidList: Array<Shape.Asteroid>;
  private reporter: Stat.Reporter;
  private collisionTester: Collision.Tester;

  constructor() {
    this.keyboardInput = new Input.Keyboard();
    this.shapeList = new Array<Shape.Shape>();
    this.spaceship = new Shape.Spaceship(200, 450, 5);
    this.asteroidList = new Array<Shape.Asteroid>();
    this.reporter = new Stat.Reporter('stats', this.spaceship);
    this.collisionTester = new Collision.Tester();
    this.keyboardInput.addKeyCodeCallback(Input.Key.Left, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.A, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Up, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.W, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Right, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.D, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Down, this.spaceship.decelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.S, this.spaceship.decelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Space, () => {
      this.spaceship.shoot();
      this.collisionTester.reset();
    });
    this.shapeList.push(this.spaceship);
    this.asteroidList.push(new Shape.Asteroid(850, 600, 20));
    this.asteroidList.push(new Shape.Asteroid(150, 100, 20));
    this.asteroidList.push(new Shape.Asteroid(650, 200, 20));
    this.asteroidList.push(new Shape.Asteroid(1200, 500, 20));
    this.asteroidList.push(new Shape.Asteroid(200, 600, 20));
  }

  public onLoad = () => {
    this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    this.ctx = this.canvas.getContext('2d');
    this.gameLoop();
  }

  public gameLoop = () => {
    requestAnimationFrame(this.gameLoop);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
    this.keyboardInput.inputLoop();
    this.shapeList.forEach(shape => {
      shape.draw(this.ctx);
    });
    this.spaceship.bulletList.forEach(bullet => {
      bullet.draw(this.ctx);
    })
    this.asteroidList.forEach(asteroid => {
      // TODO: Instead of checking for active here, check for it in the collision,
      // since draw already checks for active
      if (asteroid.active === false) {
        return;
      }
      asteroid.draw(this.ctx);
      if (this.spaceship.hitTest(asteroid) === true) {
        this.spaceship.alive = false;
      }
      this.spaceship.bulletList.forEach(bullet => {
        // TODO: Instead of checking for active here, check for it in the collision,
        // since draw already checks for active
        if (bullet.active === false) {
          return;
        }
        if (bullet.hitTest(asteroid) === true) {
          bullet.active = false;
          asteroid.explode(this.asteroidList);
        }
      });
    });
    this.collisionTester.draw(this.ctx);
    this.reporter.draw();
  }
}

const game = new Game();

window.onload = game.onLoad;