import type Geometry from "./Geometry";
import type GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";

export default class WktWriter implements GeometryVisitor {
  private readonly visitor = new WktVisitor();

  write(geometry: Geometry): string {
    return this.visitor.write(geometry);
  }

  visitPoint(point: import("./Point").default): string {
    return this.visitor.visitPoint(point);
  }

  visitLineString(lineString: import("./LineString").default): string {
    return this.visitor.visitLineString(lineString);
  }
}