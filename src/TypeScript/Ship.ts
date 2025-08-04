import { IDirection } from "./models/IDirection";
import { IShip } from "./models/IShip";

export class Ship implements IShip {
    private noHits: number;
    // private isHorizontal: boolean;

    public direction: IDirection;

    public get name(): string {
        return this._name;
    }

    constructor(
        public length: number,
        private _name: string
    ) {
        this.noHits = 0;

        this.direction = "horizontal";

        // this.isHorizontal = true;
    }

    hit(): void {
        this.noHits++;
    }

    isSunk(): boolean {
        if (this.noHits >= this.length) {
            return true;
        }

        return false;
    }
}