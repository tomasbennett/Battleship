import { ICommandHTML } from "../models/ICommand";
import { IFindCoordinate, IFindHTML, IFindIndex } from "../models/IFindCoordinate";
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

export class FindShipGameSpaces implements IFindHTML {
    constructor(
        private gameBoard: IGameBoard,
        private gameSpaceArr: HTMLDivElement[],

        private findIndx: IFindIndex,

        private htmlCommand: ICommandHTML
    ) {}

    returnGameSpaces(ship: IShipCoordinates): HTMLDivElement[] {
        const gameSpaces: HTMLDivElement[] = [];
        const index: number = this.findIndx.returnIndx(ship.xCoord, ship.yCoord)!;

        const verticalFactor: number = ship.ship.direction === "vertical" ?
                                    this.gameBoard.xAxisLength :
                                    1;
                 

        for (let i = 0; i < ship.ship.length; i++) {
            gameSpaces.push(this.gameSpaceArr[index + verticalFactor * i]);

        }

        return gameSpaces;
    }
}