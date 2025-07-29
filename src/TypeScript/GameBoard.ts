import { IGameBoard } from "./models/IGameBoard";
import { IShip } from "./models/IShip";

export class GameBoard implements IGameBoard {
    private ships: IShip[];

    private grid: IShip[][] | null[][];

    constructor(
        private xAxisLength: number,
        private yAxisLength: number
    ) {
        this.ships = [];

        this.grid = Array.from({ length: this.yAxisLength }, () =>
            Array(this.xAxisLength).fill(null)
        );
    }

    placeShip(ship: IShip, xCoord: number, yCoord: number): void {
        if (!this.canPlaceShip(xCoord, yCoord, ship)) return;

        const dx = ship.direction === "horizontal" ? 1 : 0;
        const dy = ship.direction === "vertical" ? 1 : 0;

        for (let i = 0; i < ship.length; i++) {
            const newX = xCoord + dx * i;
            const newY = yCoord + dy * i;
            this.grid[newY][newX] = ship;
        }

        this.ships.push(ship);

    }

    // validSpace(shipLength: number, currPos: [number, number]): boolean {
    //     const [row, col]: [number, number] = currPos;

    //     return shipLength + col < this.xAxisLength &&
    //            shipLength - col >= 0 &&
    //            shipLength + 

    // }

    // findCoordinate(currPos: number): [number, number] | null {
    //     if (currPos < 0 || this.xAxisLength <= 0) {
    //         return null;
    //     }

    //     const col: number = currPos % this.xAxisLength;
    //     const row: number = Math.floor(currPos / this.xAxisLength);

    //     return [col, row];
    // }

    canPlaceShip(x: number, y: number, ship: IShip): boolean {
        
        if (ship.direction === "horizontal") {
            
            if (x >= 0 && x + ship.length <= this.xAxisLength &&
            y >= 0 && y < this.yAxisLength) {

                for (let i = 0; i < ship.length; i++) {
                    if (this.grid[y][x + i] !== null) {
                        return false;
                    }
                }
                return true;

            } else {
                return false;

            }
            
        } else {

            if (y >= 0 && y + ship.length <= this.yAxisLength &&
            x >= 0 && x < this.xAxisLength) {

                for (let i = 0; i < ship.length; i++) {
                    if (this.grid[y + i][x] !== null) {
                        return false;
                    }
                }
                return true;

            } else {
                return false;

            }
        }
    }
}