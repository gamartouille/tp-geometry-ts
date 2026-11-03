import { describe, expect, it } from "vitest";
import LineString from "../src/LineString";
import Point from "../src/Point";
import WktWriter from "../src/WktWriter";

describe("WktWriter", () => {
  const writer = new WktWriter();

  it("writes an empty point", () => {
    expect(writer.write(new Point())).toBe("POINT EMPTY");
  });

  it("writes a point with coordinates", () => {
    expect(writer.write(new Point([3.0, 4.0]))).toBe("POINT(3 4)");
  });

  it("writes an empty line string", () => {
    expect(writer.write(new LineString())).toBe("LINESTRING EMPTY");
  });

  it("writes a line string with coordinates", () => {
    const line = new LineString([
      new Point([0.0, 0.0]),
      new Point([1.0, 1.0]),
      new Point([5.0, 5.0]),
    ]);

    expect(writer.write(line)).toBe("LINESTRING(0 0, 1 1, 5 5)");
  });
});
