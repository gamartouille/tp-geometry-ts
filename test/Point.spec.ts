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
});

