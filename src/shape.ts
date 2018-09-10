import * as Canvas from './canvas';
import * as Geometry from './geometry';
import * as Collision from './collision';

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

export class Asteroid extends Collision.PolygonCollider implements Shape {
  public active: boolean = true;
  public velocity: Geometry.Vector = new Geometry.Vector();
  public rotation: number = 0;
  public rotationSpeed: number = 0;
  private _size: number = 20;

  constructor(
      x?: number,
      y?: number,
      size?: number,
      public color: string = 'white',
      public lineWidth: number = 2,
  ) {
    super();
    if (!x) {
      this.x = Math.round(Math.random() * Canvas.WIDTH);
    }
    if (!y) {
      this.y = Math.round(Math.random() * Canvas.HEIGHT);
    }
    if (!size) {
      this.size = Math.ceil(Math.random() * 10) + 4;
    }
    this.x = x;
    this.y = y;
    this.size = size;
    this.setRandomVelocity();
    this.setRandomRotationSpeed();
  }

  public get x(): number {
    return this.position.x;
  }

  public set x(x: number) {
    this.position.x = x;
  }

  public get y(): number {
    return this.position.y;
  }

  public set y(y: number) {
    this.position.y = y;
  }

  public get size(): number {
    return this._size;
  }

  public set size(size: number) {
    this._size = size;
    let xRand: number = 0;
    let yRand: number = 0;
    xRand = Math.round(Math.random() * size - size / 2);
    yRand = Math.round(Math.random() * size - size / 2);
    do {
      while (this.pointList.length > 0) {
        this.pointList.pop();
      }
      this.pointList.push(new Geometry.Vector(xRand, yRand + 3 * size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand + 3 * size, yRand + size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand + 3 * size, yRand - size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand + size, yRand - 3 * size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand - size, yRand - 3 * size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand - 3 * size, yRand - size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand - 3 * size, yRand + size));
      xRand = Math.round(Math.random() * size - size / 2);
      yRand = Math.round(Math.random() * size - size / 2);
      this.pointList.push(new Geometry.Vector(xRand - size, yRand + 3 * size));
    } while (Collision.PolygonCollider.isConvex(this) === false);
  }

  public setRandomVelocity = (): void => {
    const sizeSquared: number = this.size * this.size;
    this.velocity.x = 80 * Math.random() / sizeSquared - 40 / sizeSquared;
    this.velocity.y = 80 * Math.random() / sizeSquared - 40 / sizeSquared;
  }

  public setRandomRotationSpeed = (): void => {
    this.rotationSpeed = Math.random() * 0.06 - 0.03;
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    if (this.active === false) {
      return;
    }
    this.position.add(this.velocity);
    // TODO: Replace this constant 2 or 4 with a var
    if (this.x < -this.size * 4) {
      this.x = Canvas.WIDTH + this.size * 4;
    }
    else if (this.x > Canvas.WIDTH + this.size * 4) {
      this.x = -4 * this.size;
    }
    if (this.y < -this.size * 4) {
      this.y = Canvas.HEIGHT + this.size * 4;
    }
    else if (this.y > Canvas.HEIGHT + this.size * 4) {
      this.y = -4 * this.size;
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

  // TODO: Instead of making list a parameter, store asteroid list somewhere else
  public explode = (list?: Array<Asteroid>) => {
    const position: Geometry.Vector = this.position.duplicate();
    const size: number = this.size;
    this.active = false;
    // Fragment if size was greater than a certain amount
    // TODO: Create a switch to allow or disallow fragmentation
    // TODO: Make the minimum fragmentation amount a variable
    if (size >= 5) {
      // TODO: Make number of fragments variable
      const fragmentAmount = 2;
      for (let i: number = 0; i < fragmentAmount; i++) {
        const newAsteroid = Asteroid.getOne(list);
        newAsteroid.x = position.x + Math.random() * size - size / 2;
        newAsteroid.y = position.y + Math.random() * size - size / 2;
        newAsteroid.size = size / 2;
        newAsteroid.setRandomVelocity();
        list.push(newAsteroid);
      }
    }
  }

  // TODO: Consolidate as appears in Bullet
  public static getInactiveFromList(list: Array<Asteroid>): Asteroid|null {
    let asteroid: Asteroid|null = null;
    list.some(existingAsteroid => {
      if (!existingAsteroid.active) {
        asteroid = existingAsteroid;
        return true;
      }
    });
    return asteroid;
  }

  public static getOne = (list?: Array<Asteroid>) => {
    let asteroid: Asteroid;
    if (list) {
      asteroid = Asteroid.getInactiveFromList(list);
    }
    if (asteroid) {
      asteroid.active = true;
    } else {
      asteroid = new Asteroid();
      if (list) {
        list.push(asteroid);
      }
    }
    return asteroid;
  }
}

export class Spaceship extends Collision.PolygonCollider implements Shape {
  public alive: boolean = true;
  public velocity: Geometry.Vector = new Geometry.Vector(0, 0);
  public orientation: Geometry.Vector = new Geometry.Vector(1, 0);
  private _maxSpeed: number = 5;
  public maxSpeedSquared: number = this._maxSpeed * this._maxSpeed;
  public acceleration: number = 0.1;
  public rotation: number = 0;
  public drawPointList: Array<Geometry.Vector> = new Array<Geometry.Vector>();
  private tempVector: Geometry.Vector = new Geometry.Vector(0, 0);
  public bulletList: Array<Bullet> = new Array<Bullet>();

  constructor(
      x: number,
      y: number,
      public size: number = 20,
      public color: string = 'white',
      public lineWidth: number = 2,
  ) {
    super();
    this.x = x;
    this.y = y;
    this.drawPointList.push(new Geometry.Vector(3 * this.size, 0));
    this.drawPointList.push(new Geometry.Vector(-2 * this.size, -2 * this.size));
    this.drawPointList.push(new Geometry.Vector(-1 * this.size, 0));
    this.drawPointList.push(new Geometry.Vector(-2 * this.size, 2 * this.size));
    this.pointList.push(this.drawPointList[0], this.drawPointList[1], this.drawPointList[3]);
  }
  
  public get x(): number {
    return this.position.x;
  }

  public set x(x: number) {
    this.position.x = x;
  }

  public get y(): number {
    return this.position.y;
  }

  public set y(y: number) {
    this.position.y = y;
  }

  get maxSpeed(): number {
    return Math.sqrt(this.maxSpeedSquared);
  }

  set maxSpeed(value: number) {
    this._maxSpeed = value;
    this.maxSpeedSquared = value * value;
  }

  public accelerate = (): void => {
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.velocity.copy(this.orientation);
      this.velocity.multiply(this.acceleration);
    }
    this.tempVector.copy(this.orientation);
    this.tempVector.multiply(this.acceleration);
    this.velocity.add(this.tempVector);
    if (this.velocity.magnitudeSquared >= this.maxSpeedSquared) {
      this.velocity.multiply(this.maxSpeed / this.velocity.magnitude);
    }
  }

  public decelerate = (): void => {
    this.velocity.multiply(0.9);
    if (this.velocity.magnitudeSquared < 1) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    if (this.alive === false) {
      return;
    }
    this.position.add(this.velocity);
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
    ctx.moveTo(this.drawPointList[this.drawPointList.length - 1].x, this.drawPointList[this.drawPointList.length - 1].y);
    for (let i: number = 0; i < this.drawPointList.length; i++) {
      ctx.lineTo(this.drawPointList[i].x, this.drawPointList[i].y);
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

  public shoot = (): void => {
    if (!this.alive) {
      return;
    }
    // TODO: Add bulletWait
    // https://www.embed.com/typescript-games/code/SeparatingAxisTheorem/app.txt
    let bullet: Bullet = Bullet.getInactiveFromList(this.bulletList);
    if (!bullet || bullet.active) {
      bullet = new Bullet(this.x, this.y, 3);
      this.bulletList.push(bullet);
    }
    else {
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.active = true;
    }
    bullet.launch(this.orientation, this.rotation);
  }
}

export class Bullet extends Collision.PolygonCollider implements Shape {
  public active: boolean = true;
  public lineWidthAnimVal: number = 0;
  public widthUp: boolean = true;
  public velocity: Geometry.Vector = new Geometry.Vector();
  public speed: number = 5;
  private _size: number = 0;
  private halfSize: number = 0;

  public constructor(
    x: number,
    y: number,
    size: number,
    public color: string = 'red',
    public lineWidth: number = 5,
  ) {
    super();
    this.x = x;
    this.y = y;
    this.size = size;
  }

  public get x(): number {
    return this.position.x;
  }

  public set x(x: number) {
    this.position.x = x;
  }

  public get y(): number {
    return this.position.y;
  }

  public set y(y: number) {
    this.position.y = y;
  }

  public get size(): number {
    return this._size;
  }

  public set size(size: number) {
    this._size = size;
    this.halfSize = size / 2;
    while (this.pointList.length > 0) {
      this.pointList.pop();
    }
    this.pointList.push(new Geometry.Vector(-this.halfSize, -this.halfSize));
    this.pointList.push(new Geometry.Vector(this.halfSize, -this.halfSize));
    this.pointList.push(new Geometry.Vector(this.halfSize, this.halfSize));
    this.pointList.push(new Geometry.Vector(-this.halfSize, this.halfSize));
  }

  public launch = (orientation: Geometry.Vector, rotation: number): void => {
    this.velocity.copy(orientation);
    this.velocity.multiply(this.speed);
    this.rotation = rotation;
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    if (this.active === false) {
      return;
    }
    if (this.widthUp === true) {
      this.lineWidthAnimVal += 0.1;
      if (this.lineWidthAnimVal >= 2) {
        this.widthUp = false;
      }
    }
    else {
      this.lineWidthAnimVal -= 0.1;
      if (this.lineWidthAnimVal <= -2) {
        this.widthUp = true;
      }
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // TODO: Derive this hardcoded 10 from somewhere
    if (this.x < -10 || this.x > (Canvas.WIDTH + 10) || this.y < -10 || this.y > (Canvas.HEIGHT + 10)) {
      this.active = false;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth + this.lineWidthAnimVal;
    ctx.rect(-this.halfSize, -this.halfSize, this.size, this.size);
    ctx.stroke();
    ctx.restore();
  }

  public static getInactiveFromList(list: Array<Bullet>): Bullet|null {
    let bullet: Bullet|null = null;
    list.some(existingBullet => {
      if (!existingBullet.active) {
        bullet = existingBullet;
        return true;
      }
    });
    return bullet;
  }
}