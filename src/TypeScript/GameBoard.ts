import { IGameBoard } from "./models/IGameBoard";
import { IShip } from "./models/IShip";

export class GameBoard implements IGameBoard {
    public get yAxisLength(): number {
        return this._yAxisLength;
    }

    public get xAxisLength(): number {
        return this._xAxisLength;
    }

    private ships: IShip[];

    private grid: IShip[][] | null[][];

    constructor(
        private _xAxisLength: number,
        private _yAxisLength: number
    ) {
        this.ships = [];

        this.grid = Array.from({ length: this._yAxisLength }, () =>
            Array(this._xAxisLength).fill(null)
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
        // console.log(`x coord which should be col = ${x}, y coord which should be row = ${y}, ship dir = ${ship.direction}`);

        
        if (ship.direction === "horizontal") {
            
            if (x >= 0 && x + ship.length <= this._xAxisLength &&
            y >= 0 && y < this._yAxisLength) {

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

            if (y >= 0 && y + ship.length <= this._yAxisLength &&
            x >= 0 && x < this._xAxisLength) {

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