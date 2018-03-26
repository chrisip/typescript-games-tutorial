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