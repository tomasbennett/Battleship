import { IGameBoard } from "../../../models/IGameBoard";
import { IShip } from "../../../models/IShip";
import { IAvailableSpacesShip } from "../models/IAvailableSpaces";

export class FindAvailableSpaces implements IAvailableSpacesShip {
    private shipSpaces: [number, number][];

    constructor(
        private computerGameBoard: IGameBoard
    ) {
        this.shipSpaces = [];
    }

    findAvailableSpaces(ship: IShip): void {
        const availableSpaces: [number, number][] = [];

        const dx: number = ship.direction === "horizontal" ? 1 : 0;
        const dy: number = ship.direction === "vertical" ? 1 : 0;

        const xReducedBorder: number = this.computerGameBoard.xAxisLength - ship.length * dx + 1;
        const yReducedBorder: number = this.computerGameBoard.yAxisLength - ship.length * dy + 1;

        for (let y = 0; y < yReducedBorder; y++) {
            for (let x = 0; x < xReducedBorder; x++) {
                // const newCoord: [number, number] = [x, y];
                let isValid = true;
                for (let i = 0; i < ship.length; i++) {
                    const checkX = x + i * dx;
                    const checkY = y + i * dy;
                    if (this.shipSpaces.some(([xShip, yShip]) => xShip === checkX && yShip === checkY)) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    availableSpaces.push([x, y]);
                }
                //YOU CAN STEP THIS UP AND PREVENT A SEARCH ON CERTAIN NODES THAT HAVE FOUND A SHIP BASED ON THE LENGTH OF THE SHIP


            }

        }

        const shipCoords: [number, number] = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        for (let i = 0; i < ship.length; i++) {
            const xShipCoord: number = shipCoords[0] + i * dx;
            const yShipCoord: number = shipCoords[1] + i * dy;
            this.shipSpaces.push([xShipCoord, yShipCoord]);

        }

        this.computerGameBoard.placeShip(ship, shipCoords[0], shipCoords[1]);


    }
}