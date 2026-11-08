import { describe, expect, it } from "vitest";
import LineString from "../src/LineString";
import Point from "../src/Point";
import WktVisitor from "../src/WktVisitor";

describe("WktVisitor", () => {
  it("writes an empty point", () => {
    const visitor = new WktVisitor();
    expect(visitor.write(new Point())).toBe("POINT EMPTY");
  });

  it("writes a point with coordinates", () => {
    const visitor = new WktVisitor();
    expect(visitor.write(new Point([3.0, 4.0]))).toBe("POINT(3 4)");
  });

  it("writes an empty line string", () => {
    const visitor = new WktVisitor();
    expect(visitor.write(new LineString())).toBe("LINESTRING EMPTY");
  });

  it("writes a line string with coordinates", () => {
    const visitor = new WktVisitor();
    const line = new LineString([
      new Point([0.0, 0.0]),
      new Point([1.0, 1.0]),
      new Point([5.0, 5.0]),
    ]);

    expect(visitor.write(line)).toBe("LINESTRING(0 0, 1 1, 5 5)");
    expect(visitor.getResult()).toBe("LINESTRING(0 0, 1 1, 5 5)");
  });
});
