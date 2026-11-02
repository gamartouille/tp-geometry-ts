import Point from "./Point";

export default class LineString implements Geometry {
  private point?: Point;

  constructor(point?: Point) {
    this.point = point ;
  }

  getType(): string {
    return "LineString";
  }

  getNumPoints(): Number {
    return this.point ? 1 : 0;
  }

  getPointN(n: Number): Point {
    if (n === 0 && this.point) {
      return this.point;
    }
  }
}
