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
  private reporter: Stat.Reporter;
  // TODO: Remove this after finishing testing collisions
  private circle1: Collision.CircleCollider;
  private circle2: Collision.CircleCollider;

  constructor() {
    this.keyboardInput = new Input.Keyboard();
    this.shapeList = new Array<Shape.Shape>();
    this.spaceship = new Shape.Spaceship(200, 450, 5);
    this.reporter = new Stat.Reporter('stats', this.spaceship);
    // TODO: Remove this after finishing testing collisions
    this.circle1 = new Collision.CircleCollider();
    this.circle2 = new Collision.CircleCollider();
    this.keyboardInput.addKeyCodeCallback(Input.Key.Left, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.A, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Up, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.W, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Right, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.D, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Down, this.spaceship.decelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.S, this.spaceship.decelerate);
    // TODO: Remove this after finishing testing collisions
    // this.keyboardInput.addKeyCodeCallback(Input.Key.Space, this.spaceship.shoot);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Space, this.resetCircles);
    this.shapeList.push(this.spaceship);
    this.shapeList.push(new Shape.Asteroid());
    this.shapeList.push(new Shape.Asteroid());
    this.shapeList.push(new Shape.Asteroid());
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
    // TODO: Remove this after finishing testing collisions
    this.drawCircles();
    this.reporter.draw();
  }

    // TODO: Remove this after finishing testing collisions
    public drawCircle = (x: number, y: number, radius: number, color: string): void => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 5;
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // TODO: Remove this after finishing testing collisions
    public drawCircles = (): void => {
      let color = 'blue';
      if (Collision.Collision.CircleCircle(this.circle1, this.circle2)) {
        color = 'red';
      }
      this.drawCircle(this.circle1.position.x, this.circle1.position.y, this.circle1.radius, color);
      this.drawCircle(this.circle2.position.x, this.circle2.position.y, this.circle2.radius, color);
    }
  
    // TODO: Remove this after finishing testing collisions
    public resetCircles = (): void => {
      this.circle1.radius = Math.floor(Math.random() * 400);
      this.circle1.position.x = this.circle1.radius / 2 + Math.floor(Math.random() * (Canvas.WIDTH - this.circle1.radius / 2));
      this.circle1.position.y = this.circle1.radius / 2 + Math.floor(Math.random() * (Canvas.HEIGHT - this.circle1.radius / 2));
      this.circle2.radius = Math.floor(Math.random() * 400);
      this.circle2.position.x = this.circle2.radius / 2 + Math.floor(Math.random() * (Canvas.WIDTH - this.circle2.radius / 2));
      this.circle2.position.y = this.circle2.radius / 2 + Math.floor(Math.random() * (Canvas.HEIGHT - this.circle2.radius / 2));
    }
}

const game = new Game();

window.onload = game.onLoad;