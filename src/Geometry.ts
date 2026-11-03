interface Geometry {
  getType(): string;
  isEmpty(): boolean;
  translate(dx: number, dy: number): Geometry;
  clone(): Geometry;
}

export default Geometry;

