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