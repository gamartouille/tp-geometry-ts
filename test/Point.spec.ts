import { describe, it, expect } from "vitest";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test Point", () => {
    it("test default constructor", () => {
        const p = new Point();
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(p.isEmpty()).to.be.true;
        expect(Number.isNaN(p.x())).to.be.true;
        expect(Number.isNaN(p.y())).to.be.true;
    });
    it("test constructor with coordinates", () => {
        const p = new Point([3.0,4.0]);
        expect(p.getCoordinate()).to.deep.equal([3.0,4.0]);
        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);
    });

    it("returns an envelope containing the point", () => {
        const envelope = new Point([3.0, 4.0]).getEnvelope();
        expect(envelope.getXmin()).to.equal(3.0);
        expect(envelope.getYmin()).to.equal(4.0);
        expect(envelope.getXmax()).to.equal(3.0);
        expect(envelope.getYmax()).to.equal(4.0);
    });

    it("returns an empty envelope for an empty point", () => {
        expect(new Point().getEnvelope().isEmpty()).to.be.true;
    });
});

describe("test LineString", () => {
    it("test default constructor", () => {
        const line = new LineString();
        expect(line.isEmpty()).to.be.true;
        expect(line.getNumPoints()).to.equal(0);
        expect(line.getPointN(0)).to.be.undefined;
    });

    it("test constructor with points", () => {
        const p1 = new Point([1.0, 2.0]);
        const p2 = new Point([3.0, 4.0]);
        const line = new LineString([p1, p2]);
        expect(line.isEmpty()).to.be.false;
        expect(line.getNumPoints()).to.equal(2);
        expect(line.getPointN(0)).to.equal(p1);
        expect(line.getPointN(1)).to.equal(p2);
    });

    it("returns the envelope containing all points", () => {
        const line = new LineString([
            new Point([3.0, 4.0]),
            new Point([-1.0, 8.0]),
            new Point([5.0, -2.0]),
        ]);
        const envelope = line.getEnvelope();
        expect(envelope.getXmin()).to.equal(-1.0);
        expect(envelope.getYmin()).to.equal(-2.0);
        expect(envelope.getXmax()).to.equal(5.0);
        expect(envelope.getYmax()).to.equal(8.0);
    });

    it("returns an empty envelope for an empty line", () => {
        expect(new LineString().getEnvelope().isEmpty()).to.be.true;
    });
});
