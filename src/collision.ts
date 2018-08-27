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
  position: Shape.Vector;
}

export class CircleCollider implements Collider {
  public colliderType: ColliderType = ColliderType.Circle;
  public position: Shape.Vector = new Shape.Vector();
  public radius: number = 1;
}

export class RectangleCollider implements Collider {
  public colliderType: ColliderType = ColliderType.Rectangle;
  public position: Shape.Vector = new Shape.Vector();
  public dimension: Shape.Vector = new Shape.Vector(1, 1);

  public hitTest = (obj: Collider): boolean => {
    if (obj.colliderType === ColliderType.Rectangle) {
      return Collision.RectangleRectangle(this, <RectangleCollider>obj);
    }
    return false;
  }
}

export class Collision {
  public static CircleCircle(a: CircleCollider, b: CircleCollider): boolean {
    const tempVector: Shape.Vector = a.position.duplicate();
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
}