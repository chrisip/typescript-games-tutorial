import * as Shape from './shape';

export class Reporter {
  tableElem: JQuery<HTMLElement>;

  constructor(private tableElemId: string, private spaceship: Shape.Spaceship) {
    this.tableElem = $(`#${tableElemId}`);
    console.warn('tableElem', this.tableElem);
  }

  public draw = (): void => {
    const rows: string[] = [];
    rows.push(`<tr><td>x</td><td>${this.spaceship.x}</td></tr>`);
    rows.push(`<tr><td>y</td><td>${this.spaceship.y}</td></tr>`);
    rows.push(`<tr><td>size</td><td>${this.spaceship.size}</td></tr>`);
    rows.push(`<tr><td>color</td><td>${this.spaceship.color}</td></tr>`);
    rows.push(`<tr><td>lineWidth</td><td>${this.spaceship.lineWidth}</td></tr>`);
    rows.push(`<tr><td>velocity</td><td>${this.serializeVector(this.spaceship.velocity)}</td></tr>`);
    rows.push(`<tr><td>orientation</td><td>${this.serializeVector(this.spaceship.orientation)}</td></tr>`);
    rows.push(`<tr><td>maxSpeed</td><td>${this.spaceship.maxSpeed}</td></tr>`);
    rows.push(`<tr><td>maxSpeedSquared</td><td>${this.spaceship.maxSpeedSquared}</td></tr>`);
    rows.push(`<tr><td>acceleration</td><td>${this.spaceship.acceleration}</td></tr>`);
    rows.push(`<tr><td>rotation</td><td>${this.spaceship.rotation}</td></tr>`);
    rows.push(`<tr><td>pointList</td><td>${this.spaceship.pointList}</td></tr>`);
    this.tableElem.find('tbody').html(rows.join(''));
  }

  public serializeVector = (vector: Shape.Vector) => {
    return `x: ${vector.x}, y: ${vector.y}, magnitude: ${vector.magnitude}, angle: ${vector.getAngle()}`;
  }
}