import type GeometryVisitor from "./GeometryVisitor";
import type Enveloppe from "./Enveloppe";

interface Geometry {
  getType(): string;
  isEmpty(): boolean;
  translate(dx: number, dy: number): Geometry;
  clone(): Geometry;
  getEnvelope(): Enveloppe;
  accept(visitor: GeometryVisitor): string;
  asText(): string;
}

export default Geometry;
