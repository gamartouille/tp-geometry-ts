import Coordinate from "./Coordinate";
import type Geometry from "./Geometry.ts";
import type GeometryVisitor from "./GeometryVisitor";

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
    return new Point([ x, y]);
  }
  
  clone(): Point {
    return new Point([...this.coordinate]);
  }

  accept(visitor: GeometryVisitor): string {
    return visitor.visitPoint(this);
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
