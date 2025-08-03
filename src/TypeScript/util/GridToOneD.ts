import { ICommandHTML, ICommandShipCoords } from "../models/ICommand";
import { IFindCoordinate, IFindHTML, IFindIndex, IFindShipsFullCoords } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IShipCoordinates } from "../models/IShip";

export class GridToOneD implements IFindIndex {
    constructor(
        private gameBoard: IGameBoard
    ) {
        
    }
    returnIndx(xCoord: number, yCoord: number): number | null {
        if (xCoord >= this.gameBoard.xAxisLength || yCoord >= this.gameBoard.yAxisLength) return null;
        return xCoord + this.gameBoard.xAxisLength * yCoord;

    }

}

export class FindShipGameSpaces implements ICommandShipCoords {
    constructor(
        private gameBoard: IGameBoard,
        private gameSpaceArr: HTMLDivElement[],

        private findIndx: IFindIndex,

        private htmlCommand: ICommandHTML
    ) {}

    execute(ship: IShipCoordinates): void {
        const index: number = this.findIndx.returnIndx(ship.xCoord, ship.yCoord)!;

        const verticalFactor: number = ship.ship.direction === "vertical" ?
                                    this.gameBoard.xAxisLength :
                                    1;
                 

        for (let i = 0; i < ship.ship.length; i++) {
            // gameSpaces.push(this.gameSpaceArr[index + verticalFactor * i]);
            this.htmlCommand.execute(this.gameSpaceArr[index + verticalFactor * i]);
        }
    }
}

export class FindShipCoordinates implements IFindShipsFullCoords {
    constructor() {}

    findShipsFullCoords(ship: IShipCoordinates): [number, number][] {
        const returnCoordsArr: [number, number][] = [];
        
        const dx: number = ship.ship.direction === "horizontal" ? 1 : 0;
        const dy: number = ship.ship.direction === "vertical" ? 1 : 0;
        
        for (let i = 0; i < ship.ship.length; i++) {
            // gameSpaces.push(this.gameSpaceArr[index + verticalFactor * i]);
            // this.htmlCommand.execute(this.gameSpaceArr[index + verticalFactor * i]);

            const xCoord: number = ship.xCoord + i * dx;
            const yCoord: number = ship.yCoord + i * dy;

            returnCoordsArr.push([xCoord, yCoord]);
        }

        return returnCoordsArr;
        
    }
}