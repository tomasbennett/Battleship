import { IDirection } from "./IDirection";

export interface IShip {
    direction: IDirection;
    length: number;
    
    hit(): void;

    isSunk(): boolean;
    
}