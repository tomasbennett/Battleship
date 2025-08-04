import { IDirection } from "./IDirection";

export interface IShip {
    get name(): string;
    direction: IDirection;
    length: number;
    
    hit(): void;

    isSunk(): boolean;
    
}


export interface IShipCoordinates {
    ship: IShip;

    xCoord: number;

    yCoord: number;
}