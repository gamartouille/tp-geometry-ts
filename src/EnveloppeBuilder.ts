import Coordinate from "./Coordinate";
import Enveloppe from "./Enveloppe";

export default class EnveloppeBuilder {
    private coordinate: Coordinate;

    insert(coordinate: Coordinate) {
        this.coordinate = coordinate;
    }

    build(): Enveloppe {
        const bottomLeft: Coordinate = [this.coordinate[0], this.coordinate[1]]; 
        const topRight: Coordinate = [this.coordinate[2], this.coordinate[3]];   
        return new Enveloppe(bottomLeft, topRight);
    }
}