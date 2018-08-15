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
      public lineWidth: number = 2,
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

export class Vector {
  constructor(
      public x: number = 0,
      public y: number = 0,
  ) {}

  public get magnitude(): number {
    return Math.sqrt(this.magnitudeSquared);
  }

  public get magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public normalize = (): Vector => {
    const magnitude: number = this.magnitude;
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }

  public zero = (): void => {
    this.x = 0;
    this.y = 0;
  }

  public copy = (vector: Vector): void => {
    this.x = vector.x;
    this.y = vector.y;
  }

  public rotate = (radians: number): void => {
    const cos: number = Math.cos(radians);
    const sin: number = Math.sin(radians);
    const x: number = (cos * this.x) + (sin * this.y);
    const y: number = (cos * this.y) - (sin * this.x);
    this.x = x;
    this.y = y;
  }

  public get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  public multiply = (value: number): void => {
    this.x *= value;
    this.y *= value;
  }

  public add = (vector: Vector): void => {
    this.x += vector.x;
    this.y += vector.y;
  }

  public subtract = (vector: Vector): void => {
    this.x -= vector.x;
    this.y -= vector.y;
  }
}

export class Spaceship implements Shape {
  public velocity: Vector = new Vector(0, 0);
  public orientation: Vector = new Vector(1, 0);
  private _maxSpeed: number = 10;
  public maxSpeedSquared: number = this._maxSpeed * this._maxSpeed;
  public acceleration: number = 0.2;
  public rotation: number = 0;
  public pointList: Array<Vector> = new Array<Vector>();
  private _tempPoint: Vector = new Vector(0, 0);

  constructor(
      public x: number,
      public y: number,
      public size: number,
      public color: string = 'white',
      public lineWidth: number = 2,
  ) {
    this.pointList.push(new Vector(3 * this.size, 0));
    this.pointList.push(new Vector(-2 * this.size, -2 * this.size));
    this.pointList.push(new Vector(-1 * this.size, 0));
    this.pointList.push(new Vector(-2 * this.size, 2 * this.size));
  }

  get maxSpeed(): number {
    return Math.sqrt(this.maxSpeedSquared);
  }

  set maxSpeed(value: number) {
    this._maxSpeed = value;
    this.maxSpeedSquared = value * value;
  }

  public accelerate(): void {
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.velocity.copy(this.orientation);
      this.velocity.multiply(this.acceleration);
    }
    this._tempPoint.copy(this.orientation);
    this._tempPoint.multiply(this.acceleration);
    this.velocity.add(this._tempPoint);
    if (this.velocity.magnitudeSquared >= this.maxSpeedSquared) {
      this.velocity.multiply(this.maxSpeed / this.velocity.magnitude);
    }
  }

  public decelerate(): void {
    this.velocity.multiply(0.9);
    if (this.velocity.magnitudeSquared < 1) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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

  public turnLeft = (): void => {
    this.rotation -= 0.1;
    if (this.rotation < 0) {
      this.rotation += Math.PI * 2;
    }
    this.orientation.x = 1;
    this.orientation.y = 0;
    this.orientation.rotate(-this.rotation);
  }

  public turnRight = (): void => {
    this.rotation += 0.1;
    this.rotation %= Math.PI * 2;
    this.orientation.x = 1;
    this.orientation.y = 0;
    this.orientation.rotate(-this.rotation);
  }
}