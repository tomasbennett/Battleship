import { IRegistryShips } from "../../../models/IRegistry";
import { IShip } from "../../../models/IShip";

export class ShipsSunkRegistry implements IRegistryShips {
    private shipsSunk: IShip[];

    constructor() {
        this.shipsSunk = [];
    }

    getAll(): IShip[] {
        return this.shipsSunk;
    }
    addNew(elem: IShip): void {
        this.shipsSunk.push(elem);
    }
    refresh(): void {
        this.shipsSunk = [];
    }
}