import { IDirection } from "./IDirection";

export interface IShip {
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