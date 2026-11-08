import { describe, expect, it } from "vitest";
import type Coordinate from "../src/Coordinate";
import Enveloppe from "../src/Enveloppe";
import EnveloppeBuilder from "../src/EnveloppeBuilder";
import type Geometry from "../src/Geometry";
import type GeometryVisitor from "../src/GeometryVisitor";
import LineString from "../src/LineString";
import Point from "../src/Point";
import WktWriter from "../src/WktWriter";

describe("Enveloppe", () => {
  it("creates a non-empty envelope from coordinates", () => {
    const bottomLeft: Coordinate = [1, 2];
    const topRight: Coordinate = [4, 9];
    const envelope = new Enveloppe(bottomLeft, topRight);

    expect(envelope.isEmpty()).toBe(false);
    expect(envelope.getXmin()).toBe(1);
    expect(envelope.getYmin()).toBe(2);
    expect(envelope.getXmax()).toBe(4);
    expect(envelope.getYmax()).toBe(9);
    expect(envelope.toString()).toBe("Enveloppe [1, 2] - [4, 9]");
  });

  it("detects empty envelopes and returns NaN bounds", () => {
    const envelope = new Enveloppe([], []);

    expect(envelope.isEmpty()).toBe(true);
    expect(Number.isNaN(envelope.getXmin())).toBe(true);
    expect(Number.isNaN(envelope.getYmin())).toBe(true);
    expect(Number.isNaN(envelope.getXmax())).toBe(true);
    expect(Number.isNaN(envelope.getYmax())).toBe(true);
  });
});

describe("EnveloppeBuilder", () => {
  it("builds an envelope from a 4-coordinate array", () => {
    const builder = new EnveloppeBuilder();
    builder.insert([3, 4, 10, 12]);

    const envelope = builder.build();
    expect(envelope.getXmin()).toBe(3);
    expect(envelope.getYmin()).toBe(4);
    expect(envelope.getXmax()).toBe(10);
    expect(envelope.getYmax()).toBe(12);
  });
});

describe("geometry contracts", () => {
  it("matches the Geometry and GeometryVisitor interfaces", () => {
    const point: Geometry = new Point([3, 4]);
    const line: Geometry = new LineString([new Point([0, 0]), new Point([1, 1])]);
    const writer: GeometryVisitor = new WktWriter();

    expect(point.getType()).toBe("Point");
    expect(line.getType()).toBe("LineString");
    expect(writer.visitPoint(point as Point)).toBe("POINT(3 4)");
    expect(writer.visitLineString(line as LineString)).toBe("LINESTRING(0 0, 1 1)");
  });
});

describe("type-only geometry contracts", () => {
  it("uses Coordinate, Geometry and GeometryVisitor declarations", () => {
    const coordinate: Coordinate = [10, 20];
    const point: Geometry = new Point([3, 4]);
    const line: Geometry = new LineString([new Point([0, 0]), new Point([1, 1])]);
    const writer: GeometryVisitor = new WktWriter();

    expect(coordinate).toEqual([10, 20]);
    expect(point.accept(writer)).toBe("POINT(3 4)");
    expect(line.accept(writer)).toBe("LINESTRING(0 0, 1 1)");
  });
});
