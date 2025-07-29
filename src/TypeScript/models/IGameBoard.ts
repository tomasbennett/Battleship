import { IShip } from "./IShip";


// export type IGameBoard = IFindCoordinate & IValidSpace;

export interface IGameBoard {
    placeShip(ship: IShip, xCoord: number, yCoord: number): void;

    canPlaceShip(x: number, y: number, ship: IShip): boolean;
}