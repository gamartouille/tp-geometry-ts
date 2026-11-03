import type Geometry from "./Geometry.ts";
import type GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";

export default class LineString implements Geometry {
  private points: Point[];

  constructor(points: Point | Point[] = []) {
    this.points = Array.isArray(points) ? points : points ? [points] : [];
  }

  getType(): string {
    return "LineString";
  }

  isEmpty(): boolean {
    return this.points.length === 0;
  }

  translate(dx: number, dy: number): LineString {
    const translatedPoints = this.points.map((point) => {
      const x = point.x() + dx;
      const y = point.y() + dy;
      return new Point([x, y]);
    });
    return new LineString(translatedPoints);
  }

  clone(): LineString {
    const clonedPoints = this.points.map((point) => new Point([point.x(), point.y()]));
    return new LineString(clonedPoints);
  }

  accept(visitor: GeometryVisitor): string {
    return visitor.visitLineString(this);
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point | undefined {
    return this.points[n];
  }
}
