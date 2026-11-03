import Coordinate from "./Coordinate";

export default class Enveloppe {
    private bottomLeft: Coordinate;
    private topRight: Coordinate;

    constructor(bottomLeft: Coordinate, topRight: Coordinate) {
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
    }

    isEmpty(): boolean {
        return this.bottomLeft.length === 0 || this.topRight.length === 0;
    }

    getXmin(): number {
        return this.bottomLeft.length > 0 ? this.bottomLeft[0] : Number.NaN;
    }

    getYmin(): number {
        return this.bottomLeft.length > 1 ? this.bottomLeft[1] : Number.NaN;
    }
    
    getXmax(): number {
        return this.topRight.length > 0 ? this.topRight[0] : Number.NaN;
    }

    getYmax(): number {
        return this.topRight.length > 1 ? this.topRight[1] : Number.NaN;
    }

    toString(): string {
        return `Enveloppe [${this.getXmin()}, ${this.getYmin()}] - [${this.getXmax()}, ${this.getYmax()}]`;
    }
}
