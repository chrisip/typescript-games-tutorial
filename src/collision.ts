import * as Canvas from './canvas';
import * as Geometry from './geometry';
import * as Shape from './shape';

export enum ColliderType {
  Circle = 'Circle',
  Rectangle = 'Rectangle',
  OrientedRectangle = 'OrientedRectangle',
  Line = 'Line',
  Polgygon = 'Polgyon',
  Compound = 'Compound',
}

export interface Collider {
  colliderType: ColliderType,
  position: Geometry.Vector;
}

export class CircleCollider implements Collider {
  public colliderType: ColliderType = ColliderType.Circle;
  public position: Geometry.Vector = new Geometry.Vector();
  public radius: number = 1;
}

export class RectangleCollider implements Collider {
  public colliderType: ColliderType = ColliderType.Rectangle;
  public position: Geometry.Vector = new Geometry.Vector();
  public dimension: Geometry.Vector = new Geometry.Vector(1, 1);

  public hitTest = (obj: Collider): boolean => {
    if (obj.colliderType === ColliderType.Rectangle) {
      return Collision.RectangleRectangle(this, <RectangleCollider>obj);
    }
    return false;
  }
}

export class LineCollider implements Collider {
  public colliderType: ColliderType = ColliderType.Line;
  public position: Geometry.Vector = new Geometry.Vector();
  public endPosition: Geometry.Vector = new Geometry.Vector(1, 1);
}

export class OrientedRectangleCollider implements Collider {
  public colliderType: ColliderType = ColliderType.OrientedRectangle;
  public position: Geometry.Vector = new Geometry.Vector();
  public halfDimension: Geometry.Vector = new Geometry.Vector(1, 1);
  public rotation: number = 0;

  public axisOverlap = (axis: LineCollider): boolean => {
    const topEdge: LineCollider = this.getEdge(0);
    const bottomEdge: LineCollider = this.getEdge(2);
    const direction: Geometry.Vector = axis.position.duplicate();
    direction.subtract(axis.endPosition);
    direction.normalize();
    const axisRange: Geometry.Range = OrientedRectangleCollider.projectLine(axis, direction);
    const range0: Geometry.Range = OrientedRectangleCollider.projectLine(topEdge, direction);
    const range2: Geometry.Range = OrientedRectangleCollider.projectLine(bottomEdge, direction);
    let projection: Geometry.Range = range0.duplicate();
    projection = projection.combine(range2);
    return axisRange.overlap(projection);
  }

  public static projectLine = (line: LineCollider, onto: Geometry.Vector): Geometry.Range => {
    const ontoNormalized: Geometry.Vector = onto.duplicate();
    ontoNormalized.normalize();
    const range: Geometry.Range = new Geometry.Range();
    const dot1: number = ontoNormalized.dot(line.position);
    const dot2: number = ontoNormalized.dot(line.endPosition);
    if (dot2 > dot1) {
      range.min = dot1;
      range.max = dot2;
    }
    else {
      range.min = dot2;
      range.max = dot1;
    }
    return range;
  }

  private _a: Geometry.Vector = new Geometry.Vector();
  private _b: Geometry.Vector = new Geometry.Vector();

  public getEdge = (edgeNum: number): LineCollider => {
    this._a.copy(this.halfDimension);
    this._b.copy(this.halfDimension);
    edgeNum %= 4;
    // Top
    if (edgeNum === 0) {
      this._a.x = -this._a.x;
    }
    // Right
    else if (edgeNum === 1) {
      this._b.y = -this._b.y;
    }
    // Bottom
    else if (edgeNum === 2) {
      this._a.y = -this._a.y;
      this._b.x = -this._b.x;
      this._b.y = -this._b.y;
    }
    // Left
    else if (edgeNum === 3) {
      this._a.x = -this._a.x;
      this._a.y = -this._a.y;
      this._b.x = -this._b.x;
    }
    this._a.rotate(this.rotation);
    this._a.add(this.position);
    this._b.rotate(this.rotation);
    this._b.add(this.position);
    const edge: LineCollider = new LineCollider();
    edge.position.copy(this._a);
    edge.endPosition.copy(this._b);
    return edge;
  }
}

export class Collision {
  public static CircleCircle(a: CircleCollider, b: CircleCollider): boolean {
    const tempVector: Geometry.Vector = a.position.duplicate();
    tempVector.subtract(b.position);
    if (tempVector.magnitudeSquared <= (a.radius + b.radius) * (a.radius + b.radius)) {
      return true;
    }
    return false;
  }

  public static RectangleRectangle(a: RectangleCollider, b: RectangleCollider): boolean {
    let xOverlap: boolean = false;
    let yOverlap: boolean = false;
    // Check x overlap
    // Is a's left edge to the left of b's left edge?
    if (a.position.x <= b.position.x) {
      // Is a's right edge to the right of b's left edge?
      if (a.position.x + a.dimension.x >= b.position.x) {
        xOverlap = true;
      }
    }
    // Is a's left edge to the right of b's left edge?
    else {
      // Is b's right edge to the right of a's left edge?
      if (b.position.x + b.dimension.x >= a.position.x) {
        xOverlap = true;
      }
    }
    // Check y overlap
    // Is a's top edge above b's top edge?
    if (a.position.y <= b.position.y) {
      // Is a's bottom edge below b's top edge?
      if (a.position.y + a.dimension.y >= b.position.y) {
        yOverlap = true;
      }
    }
    // Is a's top edge below b's top edge?
    else {
      // Is b's bottom edge below a's top edge?
      if (b.position.y + b.dimension.y >= a.position.y) {
        yOverlap = true;
      }
    }
    if (xOverlap === true && yOverlap === true) {
      return true;
    }
    return false;
  }

  public static LineLine(a: LineCollider, b: LineCollider): boolean {
    let directionA: Geometry.Vector = a.endPosition.duplicate();
    let directionB: Geometry.Vector = b.endPosition.duplicate();
    directionA.subtract(a.position);
    if (directionA.x === 0 && directionA.y === 0) {
      // This is not a line, this is a point. Don't bother checking
      return false;
    }
    let distancePoint1: Geometry.Vector = a.position.duplicate();
    let distancePoint2: Geometry.Vector = a.position.duplicate();
    distancePoint1.subtract(b.position);
    distancePoint2.subtract(b.endPosition);
    let rotatedDirection: Geometry.Vector = directionA.duplicate();
    rotatedDirection.rotate90();
    if (rotatedDirection.dot(distancePoint1) * rotatedDirection.dot(distancePoint2) > 0) {
      return false;
    }
    directionB.subtract(b.position);
    if (directionB.x === 0 && directionB.y === 0) {
      // This is not a line, this is a point. Don't bother checking
      return false;
    }
    distancePoint1.copy(b.position);
    distancePoint2.copy(b.position);
    distancePoint1.subtract(a.position);
    distancePoint2.subtract(a.endPosition);
    rotatedDirection.copy(directionB);
    rotatedDirection.rotate90();
    if (rotatedDirection.dot(distancePoint1) * rotatedDirection.dot(distancePoint2) > 0) {
      return false;
    }
    return true;
  }

  public static OrientedRectangleOrientedRectangle(a: OrientedRectangleCollider, b: OrientedRectangleCollider): boolean {
    let edge: LineCollider = a.getEdge(0);
    if (b.axisOverlap(edge) === false) {
      return false;
    }
    edge = a.getEdge(1);
    if (b.axisOverlap(edge) === false) {
      return false;
    }
    edge = b.getEdge(0);
    if (a.axisOverlap(edge) === false) {
      return false;
    }
    edge = b.getEdge(1);
    return a.axisOverlap(edge);
  }
}

export class Tester {
  private circle1: CircleCollider;
  private circle2: CircleCollider;
  private rectangle1: RectangleCollider;
  private rectangle2: RectangleCollider;
  private line1: LineCollider;
  private line2: LineCollider;
  private orientedRectangle1: OrientedRectangleCollider;
  private orientedRectangle2: OrientedRectangleCollider;

  constructor() {
    this.circle1 = new CircleCollider();
    this.circle2 = new CircleCollider();
    this.rectangle1 = new RectangleCollider();
    this.rectangle2 = new RectangleCollider();
    this.line1 = new LineCollider();
    this.line2 = new LineCollider();
    this.orientedRectangle1 = new OrientedRectangleCollider();
    this.orientedRectangle2 = new OrientedRectangleCollider();
  }

  public draw = (ctx: CanvasRenderingContext2D) => {
    this.drawCircles(ctx);
    this.drawRectangles(ctx);
    this.drawLines(ctx);
    this.drawOrientedRectangles(ctx);
  }

  public reset = () => {
    this.resetCircles();
    this.resetRectangles();
    this.resetLines();
    this.resetOrientedRectangles();
  }

  private drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  private drawCircles = (ctx: CanvasRenderingContext2D): void => {
    let color = 'blue';
    if (Collision.CircleCircle(this.circle1, this.circle2)) {
      color = 'red';
    }
    this.drawCircle(ctx, this.circle1.position.x, this.circle1.position.y, this.circle1.radius, color);
    this.drawCircle(ctx, this.circle2.position.x, this.circle2.position.y, this.circle2.radius, color);
  }

  private resetCircles = (): void => {
    this.circle1.radius = Math.floor(Math.random() * 400);
    this.circle1.position.x = this.circle1.radius / 2 + Math.floor(Math.random() * (Canvas.WIDTH - this.circle1.radius / 2));
    this.circle1.position.y = this.circle1.radius / 2 + Math.floor(Math.random() * (Canvas.HEIGHT - this.circle1.radius / 2));
    this.circle2.radius = Math.floor(Math.random() * 400);
    this.circle2.position.x = this.circle2.radius / 2 + Math.floor(Math.random() * (Canvas.WIDTH - this.circle2.radius / 2));
    this.circle2.position.y = this.circle2.radius / 2 + Math.floor(Math.random() * (Canvas.HEIGHT - this.circle2.radius / 2));
  }

  private drawRectangle = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string, lineWidth: number = 5): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.restore();
  }

  private drawRectangles = (ctx: CanvasRenderingContext2D): void => {
    let color = 'blue';
    if (Collision.RectangleRectangle(this.rectangle1, this.rectangle2)) {
      color = 'red';
    }
    this.drawRectangle(ctx, this.rectangle1.position.x, this.rectangle1.position.y, this.rectangle1.dimension.x, this.rectangle1.dimension.y, color);
    this.drawRectangle(ctx, this.rectangle2.position.x, this.rectangle2.position.y, this.rectangle2.dimension.x, this.rectangle2.dimension.y, color);
  }

  private resetRectangles = (): void => {
    this.rectangle1.position.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.rectangle1.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
    this.rectangle1.dimension.x = 100 + Math.floor(Math.random() * Canvas.WIDTH / 2);
    this.rectangle1.dimension.y = 100 + Math.floor(Math.random() * Canvas.HEIGHT / 2);
    this.rectangle2.position.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.rectangle2.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
    this.rectangle2.dimension.x = 100 + Math.floor(Math.random() * Canvas.WIDTH / 2);
    this.rectangle2.dimension.y = 100 + Math.floor(Math.random() * Canvas.HEIGHT / 2);
  }

  private drawLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string, lineWidth: number): void => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  private drawLines = (ctx: CanvasRenderingContext2D): void => {
    let color = 'blue';
    if (Collision.LineLine(this.line1, this.line2)) {
      color = 'red';
    }
    this.drawLine(ctx, this.line1.position.x, this.line1.position.y, this.line1.endPosition.x, this.line1.endPosition.y, color, 3);
    this.drawLine(ctx, this.line2.position.x, this.line2.position.y, this.line2.endPosition.x, this.line2.endPosition.y, color, 3);
  }

  private resetLines = (): void => {
    this.line1.position.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.line1.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
    this.line1.endPosition.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.line1.endPosition.y = Math.floor(Math.random() * Canvas.HEIGHT);
    this.line2.position.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.line2.position.y = Math.floor(Math.random() * Canvas.HEIGHT);
    this.line2.endPosition.x = Math.floor(Math.random() * Canvas.WIDTH);
    this.line2.endPosition.y = Math.floor(Math.random() * Canvas.HEIGHT);
  }

  private drawOrientedRectangle = (ctx: CanvasRenderingContext2D, orientedRectangle: OrientedRectangleCollider, color: string): void => {
    const top: LineCollider = orientedRectangle.getEdge(0);
    const right: LineCollider = orientedRectangle.getEdge(1);
    const bottom: LineCollider = orientedRectangle.getEdge(2);
    const left: LineCollider = orientedRectangle.getEdge(3);
    this.drawLine(ctx, top.position.x, top.position.y, top.endPosition.x, top.endPosition.y, color, 5);
    this.drawLine(ctx, right.position.x, right.position.y, right.endPosition.x, right.endPosition.y, color, 5);
    this.drawLine(ctx, bottom.position.x, bottom.position.y, bottom.endPosition.x, bottom.endPosition.y, color, 5);
    this.drawLine(ctx, left.position.x, left.position.y, left.endPosition.x, left.endPosition.y, color, 5);
  }

  private drawOrientedRectangles = (ctx: CanvasRenderingContext2D): void => {
    let color = 'blue';
    if (Collision.OrientedRectangleOrientedRectangle(this.orientedRectangle1, this.orientedRectangle2)) {
      color = 'red';
    }
    this.drawOrientedRectangle(ctx, this.orientedRectangle1, color);
    this.drawOrientedRectangle(ctx, this.orientedRectangle2, color);
  }

  private resetOrientedRectangles = (): void => {
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