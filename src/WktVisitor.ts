import type Geometry from "./Geometry";
import type GeometryVisitor from "./GeometryVisitor";
import type LineString from "./LineString";
import type Point from "./Point";

export default class WktVisitor implements GeometryVisitor {
  private buffer: string = "";

  write(geometry: Geometry): string {
    this.buffer = geometry.accept(this);
    return this.buffer;
  }

  getResult(): string {
    return this.buffer;
  }

  visitPoint(point: Point): string {
    if (point.isEmpty()) {
      return "POINT EMPTY";
    }

    const coordinate = point.getCoordinate();
    return `POINT(${coordinate[0]} ${coordinate[1]})`;
  }

  visitLineString(lineString: LineString): string {
    if (lineString.isEmpty()) {
      return "LINESTRING EMPTY";
    }

    const coordinates: string[] = [];
    for (let i = 0; i < lineString.getNumPoints(); i++) {
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
