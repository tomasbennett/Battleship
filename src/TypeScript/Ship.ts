import { IShip } from "./models/IShip";

export class Ship implements IShip {
    private noHits: number

    constructor(
        private shipLength: number
    ) {
        this.noHits = 0;
    }

    hit(): void {
        this.noHits++;
    }

    isSunk(): boolean {
        if (this.noHits >= this.shipLength) {
            return true;
        }

        return false;
    }
}