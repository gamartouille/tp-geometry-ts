import type Geometry from "./Geometry";
import type GeometryVisitor from "./GeometryVisitor";
import WktVisitor from "./WktVisitor";

export default abstract class AbstractGeometry implements Geometry {
  abstract getType(): string;
  abstract isEmpty(): boolean;
  abstract translate(dx: number, dy: number): Geometry;
  abstract clone(): Geometry;
  abstract getEnvelope(): import("./Enveloppe").default;
  abstract accept(visitor: GeometryVisitor): string;

  asText(): string {
    return this.accept(new WktVisitor());
  }
}
