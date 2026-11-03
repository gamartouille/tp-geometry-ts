import type LineString from "./LineString";
import type Point from "./Point";

interface GeometryVisitor {
  visitPoint(point: Point): string;
  visitLineString(lineString: LineString): string;
}

export default GeometryVisitor;
