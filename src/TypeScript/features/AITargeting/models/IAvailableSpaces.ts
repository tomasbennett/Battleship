import { IShip } from "../../../models/IShip";

export interface IAvailableSpacesShip {
    set shipSpaces(value: [number, number][]);

    findAvailableSpaces(ship: IShip): void;
}