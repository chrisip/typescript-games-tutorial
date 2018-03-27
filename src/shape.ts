import * as Canvas from './canvas';

export interface Shape {
  draw(ctx: CanvasRenderingContext2D): void;
  x: number;
  y: number;
  color: string;
  lineWidth: number;
}

export class Circle implements Shape {
  constructor(
      public x: number = 0,
      public y: number = 0,
      public radius: number = 10,
      public color: string = 'red',
      public lineWidth: number = 2,
  ) {}

  public draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}

export class Rectangle implements Shape {
  constructor(
      public x: number = 0,
      public y: number = 0,
      public width: number = 0,
      public height: number = 0,
      public color: string = 'blue',
      public lineWidth: number = 2,
  ) {}

  public draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
  }
}

export class Point {
  constructor(
      public x: number = 0,
      public y: number = 0,
  ) {}
}

export class Asteroid implements Shape {
  public velocityX: number = 0;
  public velocityY: number = 0;
  public rotation: number = 0;
  public rotationSpeed: number = 0;
  public pointList: Array<Point> = new Array<Point>();

  constructor(
      public x: number = undefined,
      public y: number = undefined,
      public size?: number,
      public color: string = 'white',
      public lineWidth: number =2,
  ) {
    if (!x) {
      this.x = Math.round(Math.random() * Canvas.WIDTH);
    }
    if (!y) {
      this.y = Math.round(Math.random() * Canvas.HEIGHT);
    }
    if (!size) {
      this.size = Math.ceil(Math.random() * 10) + 4;
    }
    this.velocityX = Math.round(Math.random() * 4 - 2);
    this.velocityY = Math.round(Math.random() * 4 - 2);
    this.rotationSpeed = Math.random() * 0.06 - 0.03;
    let xRand: number = 0;
    let yRand: number = 0;
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand, yRand + 3 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand - 1 * this.size, yRand + 2 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand - 2 * this.size, yRand + 2 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand - 3 * this.size, yRand + this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand - 4 * this.size, yRand));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand - 1 * this.size, yRand - 3 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand + 2 * this.size, yRand - 4 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand + 2 * this.size, yRand - 3 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand + 4 * this.size, yRand - 2 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand + 4 * this.size, yRand + this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
    this.pointList.push(new Point(xRand + 3 * this.size, yRand + 2 * this.size));
    xRand = Math.round(Math.random() * this.size - this.size / 2);
    yRand = Math.round(Math.random() * this.size - this.size / 2);
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.x < -this.size * 2) {
      this.x = Canvas.WIDTH + this.size * 2;
    }
    else if (this.x > Canvas.WIDTH + this.size * 2) {
      this.x = -2 * this.size;
    }
    if (this.y < -this.size * 2) {
      this.y = Canvas.HEIGHT + this.size * 2;
    }
    else if (this.y > Canvas.HEIGHT + this.size * 2) {
      this.y = -2 * this.size;
    }
    this.rotation += this.rotationSpeed;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);
    for (let i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}