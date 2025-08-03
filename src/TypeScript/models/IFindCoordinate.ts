import { IShipCoordinates } from "./IShip";

export interface IFindCoordinate {
    findCoordinate(currPos: number): [number, number] | null;
}

export interface IFindShipsFullCoords {
    findShipsFullCoords(ship: IShipCoordinates): [number, number][];
}

export interface IFindIndex {
    returnIndx(xCoord: number, yCoord: number): number | null;
}

export interface IFindHTML {
    returnGameSpaces(ship: IShipCoordinates): HTMLDivElement[];
}