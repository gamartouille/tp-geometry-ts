interface Geometry {
  getType(): string;
  isEmpty(): boolean;
  translate(dx: number, dy: number): Geometry;
}

export default Geometry;

