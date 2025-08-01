import { IShip, IShipCoordinates } from "./IShip";


// export type IGameBoard = IFindCoordinate & IValidSpace;

export interface IGameBoard {
    ships: IShipCoordinates[];

    yAxisLength: number;

    xAxisLength: number;

    grid: IShip[][] | null[][];

    placeShip(ship: IShip, xCoord: number, yCoord: number): void;

    canPlaceShip(x: number, y: number, ship: IShip): boolean;

    removeShips(): void;
}