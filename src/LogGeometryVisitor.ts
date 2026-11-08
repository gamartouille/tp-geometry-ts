import type GeometryVisitor from "./GeometryVisitor";
import type LineString from "./LineString";
import type Point from "./Point";

export default class LogGeometryVisitor implements GeometryVisitor {
  private readonly log: (message: string) => void;

  constructor(log: (message: string) => void = console.log) {
    this.log = log;
  }

  visitPoint(point: Point): string {
    const message = point.isEmpty()
      ? "Je suis un point vide."
      : `Je suis un point avec x=${point.x().toFixed(1)} et y=${point.y().toFixed(1)}.`;

    this.log(message);
    return message;
  }

  visitLineString(lineString: LineString): string {
    const message = lineString.isEmpty()
      ? "Je suis une polyligne vide."
      : `Je suis une polyligne définie par ${lineString.getNumPoints()} point(s).`;

    this.log(message);
    return message;
  }
}
