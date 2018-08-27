import * as Canvas from './canvas';
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

  constructor() {
    this.keyboardInput = new Input.Keyboard();
    this.shapeList = new Array<Shape.Shape>();
    this.spaceship = new Shape.Spaceship(200, 450, 5);
    this.reporter = new Stat.Reporter('stats', this.spaceship);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Left, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.A, this.spaceship.turnLeft);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Up, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.W, this.spaceship.accelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Right, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.D, this.spaceship.turnRight);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Down, this.spaceship.decelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.S, this.spaceship.decelerate);
    this.keyboardInput.addKeyCodeCallback(Input.Key.Space, this.spaceship.shoot);
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
    this.reporter.draw();
  }
}

const game = new Game();

window.onload = game.onLoad;