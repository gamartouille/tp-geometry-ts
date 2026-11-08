import { describe, expect, it, vi } from "vitest";
import LineString from "../src/LineString";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import Point from "../src/Point";

describe("LogGeometryVisitor", () => {
  it("logs an empty point message", () => {
    const log = vi.fn();
    const visitor = new LogGeometryVisitor(log);

    const message = visitor.visitPoint(new Point());

    expect(message).toBe("Je suis un point vide.");
    expect(log).toHaveBeenCalledWith("Je suis un point vide.");
  });

  it("logs a non-empty point message", () => {
    const log = vi.fn();
    const visitor = new LogGeometryVisitor(log);

    const message = visitor.visitPoint(new Point([2.0, 3.0]));

    expect(message).toBe("Je suis un point avec x=2.0 et y=3.0.");
    expect(log).toHaveBeenCalledWith("Je suis un point avec x=2.0 et y=3.0.");
  });

  it("logs an empty line string message", () => {
    const log = vi.fn();
    const visitor = new LogGeometryVisitor(log);

    const message = visitor.visitLineString(new LineString());

    expect(message).toBe("Je suis une polyligne vide.");
    expect(log).toHaveBeenCalledWith("Je suis une polyligne vide.");
  });

  it("logs a non-empty line string message with the number of points", () => {
    const log = vi.fn();
    const visitor = new LogGeometryVisitor(log);

    const message = visitor.visitLineString(
      new LineString([
        new Point([0, 0]),
        new Point([1, 1]),
        new Point([2, 2]),
      ]),
    );

    expect(message).toBe("Je suis une polyligne définie par 3 point(s).")
    expect(log).toHaveBeenCalledWith("Je suis une polyligne définie par 3 point(s).");
  });
});
