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

  public duplicate = (): Vector => {
    return new Vector(this.x, this.y);
  }

  public rotate = (radians: number): void => {
    const cos: number = Math.cos(radians);
    const sin: number = Math.sin(radians);
    const x: number = (cos * this.x) + (sin * this.y);
    const y: number = (cos * this.y) - (sin * this.x);
    this.x = x;
    this.y = y;
  }

  public rotate90 = (): void => {
    const x: number = -this.y;
    const y: number = this.x;
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

  public dot = (vector: Vector): number => {
    return this.x * vector.x + this.y * vector.y;
  }

  public project = (onto: Vector): Vector => {
    const proj: Vector = this.duplicate();
    const d: number = onto.magnitudeSquared;
    if (d !== 0) {
      const mult: Vector = onto.duplicate();
      mult.multiply(proj.dot(onto) / d);
      return mult;
    }
    return onto;
  }
}