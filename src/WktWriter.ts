import Geometry from "./Geometry";
import LineString from "./LineString";
import Point from "./Point";
import type GeometryVisitor from "./GeometryVisitor";

export default class WktWriter implements GeometryVisitor {
  write(geometry: Geometry): string {
    return geometry.accept(this);
  }

  visitPoint(point: Point): string {
    return this.writePoint(point);
  }

  visitLineString(lineString: LineString): string {
    return this.writeLineString(lineString);
  }

  private writePoint(point: Point): string {
    if (point.isEmpty()) {
      return "POINT EMPTY";
    }
    const coordinate = point.getCoordinate();
    return `POINT(${coordinate[0]} ${coordinate[1]})`;
  }

  private writeLineString(lineString: LineString): string {
    if (lineString.isEmpty()) {
      return "LINESTRING EMPTY";
    }
    const points = lineString.getNumPoints();
    const coordinates = [];
    for (let i = 0; i < points; i++) {
      const point = lineString.getPointN(i);
      if (!point) {
        throw new Error(`LineString point at index ${i} does not exist`);
      }
      const coordinate = point.getCoordinate();
      coordinates.push(`${coordinate[0]} ${coordinate[1]}`);
    }
    return `LINESTRING(${coordinates.join(", ")})`;
  }
}