import type GeometryVisitor from "./GeometryVisitor";

interface Geometry {
  getType(): string;
  isEmpty(): boolean;
  translate(dx: number, dy: number): Geometry;
  clone(): Geometry;
  accept(visitor: GeometryVisitor): string;
}

export default Geometry;
