import Coordinate from "./Coordinate";
import type Geometry from "./Geometry";

export default class Point implements Geometry {
  private coordinate: Coordinate;

  constructor(coordinate: Coordinate = []) {
    this.coordinate = coordinate ?? [];
  }

  getType(): string {
    return "Point";
  }

  isEmpty(): boolean {
    return this.coordinate.length === 0;
  }

  translate(dx: number, dy: number): Point {
    const x = this.x() + dx;
    const y = this.y() + dy;
    return new Point([x, y]);
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  x(): number {
    return this.coordinate.length > 0 ? this.coordinate[0] : Number.NaN;
  }

  y(): number {
    return this.coordinate.length > 1 ? this.coordinate[1] : Number.NaN;
  }
}
