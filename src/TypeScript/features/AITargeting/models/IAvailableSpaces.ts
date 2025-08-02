import { IShip } from "../../../models/IShip";

export interface IAvailableSpacesShip {
    findAvailableSpaces(ship: IShip): void;
}