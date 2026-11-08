import type Geometry from "./Geometry";
import type GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import Enveloppe from "./Enveloppe";
import EnveloppeBuilder from "./EnveloppeBuilder";
import AbstractGeometry from "./AbstractGeometry";

export default class LineString extends AbstractGeometry {
  private points: Point[];

  constructor(points: Point | Point[] = []) {
    super();
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

  getEnvelope(): Enveloppe {
    if (this.isEmpty()) {
      return new Enveloppe([], []);
    }

    const firstPoint = this.points[0];
    let xmin = firstPoint.x();
    let ymin = firstPoint.y();
    let xmax = xmin;
    let ymax = ymin;

    for (const point of this.points.slice(1)) {
      xmin = Math.min(xmin, point.x());
      ymin = Math.min(ymin, point.y());
      xmax = Math.max(xmax, point.x());
      ymax = Math.max(ymax, point.y());
    }

    const builder = new EnveloppeBuilder();
    builder.insert([xmin, ymin, xmax, ymax]);
    return builder.build();
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
