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

export class Collision {
  public static CircleCircle(a: CircleCollider, b: CircleCollider): boolean {
    const tempVector: Shape.Vector = a.position.duplicate();
    tempVector.subtract(b.position);
    if (tempVector.magnitudeSquared <= (a.radius + b.radius) * (a.radius + b.radius)) {
      return true;
    }
    return false;
  }
}