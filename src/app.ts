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
  private rectangle1: Collision.RectangleCollider;
  private rectangle2: Collision.RectangleCollider;
  private line1: Collision.LineCollider;
  private line2: Collision.LineCollider;
  private orientedRectangle1: Collision.OrientedRectangleCollider;
  private orientedRectangle2: Collision.OrientedRectangleCollider;

  constructor() {
    this.keyboardInput = new Input.Keyboard();
    this.shapeList = new Array<Shape.Shape>();
    this.spaceship = new Shape.Spaceship(200, 450, 5);
    this.reporter = new Stat.Reporter('stats', this.spaceship);
    // TODO: Remove this after finishing testing collisions
    this.circle1 = new Collision.CircleCollider();
    this.circle2 = new Collision.CircleCollider();
    this.rectangle1 = new Collision.RectangleCollider();
    this.rectangle2 = new Collision.RectangleCollider();
    this.line1 = new Collision.LineCollider();
    this.line2 = new Collision.LineCollider();
    this.orientedRectangle1 = new Collision.OrientedRectangleCollider();
    this.orientedRectangle2 = new Collision.OrientedRectangleCollider();
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
    this.keyboardInput.addKeyCodeCallback(Input.Key.Space, () => {
      this.spaceship.shoot();
      this.resetCircles();
      this.resetRectangles();
      this.resetLines();
      this.resetOrientedRectangles();
    });
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
    this.drawRectangles();
    this.drawLines();
    this.drawOrientedRectangles();
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

    // TODO: Remove this after finishing testing collisions
    public drawRectangle = (x: number, y: number, width: number, height: number, color: string, lineWidth: number = 5): void => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.rect(x, y, width, height);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // TODO: Remove this after finishing testing collisions
    public drawRectangles = (): void => {
      let color = 'blue';
      if (Collision.Collision.RectangleRectangle(this.rectangle1, this.rectangle2)) {
        color = 'red';
      }
      this.drawRectangle(this.rectangle1.position.x, this.rectangle1.position.y, this.rectangle1.dimension.x, this.rectangle1.dimension.y, color);
      this.drawRectangle(this.rectangle2.position.x, this.rectangle2.position.y, this.rectangle2.dimension.x, this.rectangle2.dimension.y, color);
    }

    // TODO: Remove this after finishing testing collisions
    public resetRectangles = (): void => {
      this.rectangle1.position.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.rectangle1.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
      this.rectangle1.dimension.x = 100 + Math.floor(Math.random() * Canvas.WIDTH / 2);
      this.rectangle1.dimension.y = 100 + Math.floor(Math.random() * Canvas.HEIGHT / 2);
      this.rectangle2.position.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.rectangle2.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
      this.rectangle2.dimension.x = 100 + Math.floor(Math.random() * Canvas.WIDTH / 2);
      this.rectangle2.dimension.y = 100 + Math.floor(Math.random() * Canvas.HEIGHT / 2);
    }

    // TODO: Remove this after finishing testing collisions
    public drawLine = (startX: number, startY: number, endX: number, endY: number, color: string, lineWidth: number): void => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }

    // TODO: Remove this after finishing testing collisions
    public drawLines = (): void => {
      let color = 'blue';
      if (Collision.Collision.LineLine(this.line1, this.line2)) {
        color = 'red';
      }
      this.drawLine(this.line1.position.x, this.line1.position.y, this.line1.endPosition.x, this.line1.endPosition.y, color, 3);
      this.drawLine(this.line2.position.x, this.line2.position.y, this.line2.endPosition.x, this.line2.endPosition.y, color, 3);
    }

    // TODO: Remove this after finishing testing collisions
    public resetLines = (): void => {
      this.line1.position.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.line1.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
      this.line1.endPosition.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.line1.endPosition.y = Math.floor(Math.random() * Canvas.HEIGHT);
      this.line2.position.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.line2.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
      this.line2.endPosition.x = Math.floor(Math.random() * Canvas.WIDTH);
      this.line2.endPosition.y = Math.floor(Math.random() * Canvas.HEIGHT);
    }

    // TODO: Remove this after finishing testing collisions
    public drawOrientedRectangle = (orientedRectangle: Collision.OrientedRectangleCollider, color: string): void => {
      const top: Collision.LineCollider = orientedRectangle.getEdge(0);
      const right: Collision.LineCollider = orientedRectangle.getEdge(1);
      const bottom: Collision.LineCollider = orientedRectangle.getEdge(2);
      const left: Collision.LineCollider = orientedRectangle.getEdge(3);
      this.drawLine(top.position.x, top.position.y, top.endPosition.x, top.endPosition.y, color, 5);
      this.drawLine(right.position.x, right.position.y, right.endPosition.x, right.endPosition.y, color, 5);
      this.drawLine(bottom.position.x, bottom.position.y, bottom.endPosition.x, bottom.endPosition.y, color, 5);
      this.drawLine(left.position.x, left.position.y, left.endPosition.x, left.endPosition.y, color, 5);
    }

    // TODO: Remove this after finishing testing collisions
    public drawOrientedRectangles = (): void => {
      let color = 'blue';
      if (Collision.Collision.OrientedRectangleOrientedRectangle(this.orientedRectangle1, this.orientedRectangle2)) {
        color = 'red';
      }
      this.drawOrientedRectangle(this.orientedRectangle1, color);
      this.drawOrientedRectangle(this.orientedRectangle2, color);
    }

    // TODO: Remove this after finishing testing collisions
    public resetOrientedRectangles = (): void => {
      this.orientedRectangle1.position.x = 200 + Math.floor(Math.random() * 800);
      this.orientedRectangle1.position.y = 200 + Math.floor(Math.random() * 300);
      this.orientedRectangle1.halfDimension.x = 100 + Math.floor(Math.random() * 100);
      this.orientedRectangle1.halfDimension.y = 100 + Math.floor(Math.random() * 100);
      this.orientedRectangle1.rotation = Math.random() * Math.PI * 2;
      this.orientedRectangle2.position.x = 200 + Math.floor(Math.random() * 800);
      this.orientedRectangle2.position.y = 200 + Math.floor(Math.random() * 300);
      this.orientedRectangle2.halfDimension.x = 100 + Math.floor(Math.random() * 100);
      this.orientedRectangle2.halfDimension.y = 100 + Math.floor(Math.random() * 100);
      this.orientedRectangle2.rotation = Math.random() * Math.PI * 2;
    }
}

const game = new Game();

window.onload = game.onLoad;