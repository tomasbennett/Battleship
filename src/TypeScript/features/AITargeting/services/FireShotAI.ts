import { ICommand, ICommandHTML } from "../../../models/ICommand";
import { IFindIndex, IFindShipsFullCoords } from "../../../models/IFindCoordinate";
import { IGameBoard } from "../../../models/IGameBoard";
import { IRegistryCoords, IRegistryShips } from "../../../models/IRegistry";
import { IShip } from "../../../models/IShip";
import { IDirectionDetermination } from "../models/ICoordinateDirDetermine";
import { IRegistryRemoveSpaces } from "../models/IRegistryRemoval";
import { ITargetingState } from "../models/IStateManager";

export class FireShotAI implements ICommand {
    constructor(
        private nextTargetSelector: ITargetingState,

        private enemyGameBoard: IGameBoard,

        private removeAvailableSpace: IRegistryRemoveSpaces,


        private findIndx: IFindIndex,
        private gameSpaceHTMLArr: HTMLDivElement[],

        private hitShotCommand: ICommandHTML,
        private missShotCommand: ICommandHTML,


        private shipsSunkRegistry: IRegistryShips,
        private gameOverAICommand: ICommand,

        private directionDetermination: IDirectionDetermination,

        private findUserShipsFullCoords: IFindShipsFullCoords,

        private shotAtCoords: IRegistryCoords
    ) {}

    execute(): void {
        const nextTargetCoords: [number, number] | null = this.nextTargetSelector.chooseFiringCoords();
        if (nextTargetCoords === null) return;

        const [xNextCoords, yNextCoords]: [number, number] = nextTargetCoords;


        let isHit: boolean = false;
        for (const ship of this.enemyGameBoard.ships) {
            const fullShipCoords: [number, number][] = this.findUserShipsFullCoords.findShipsFullCoords(ship);
            if (fullShipCoords.some(([x, y]) => x === xNextCoords && y === yNextCoords)) {
                isHit = true;
                break;
            }

        }

        // this.enemyGameBoard.ships.forEach((ship) => {
        //     const fullShipCoords: [number, number][] = this.findUserShipsFullCoords.findShipsFullCoords(ship);

        // });
        // const isHit: boolean = this.enemyGameBoard.ships.some(({xCoord, yCoord}) => {
        //     return xCoord === xNextCoords && yCoord === yNextCoords;
        // }); //SO THIS ONLY CHOOSES THE COORDINATE OF THE SHIP NOT THE FULL COORDINATES INCLUDING THE LENGTH

        const gameSpaceIndx: number | null = this.findIndx.returnIndx(xNextCoords, yNextCoords);
        if (gameSpaceIndx === null) return;
        const gameSpaceDiv: HTMLDivElement = this.gameSpaceHTMLArr[gameSpaceIndx];

        this.removeAvailableSpace.remove(nextTargetCoords);
        this.shotAtCoords.addNew(nextTargetCoords);


        if (!isHit) {
            this.missShotCommand.execute(gameSpaceDiv);

        } else {
            this.hitShotCommand.execute(gameSpaceDiv);

            const shipHit: IShip | null = this.enemyGameBoard.grid[yNextCoords][xNextCoords];
            if (shipHit === null) return;
            shipHit.hit();

            const originalHitCoords: [number, number] | null = this.nextTargetSelector.originalShot;
            if (originalHitCoords === null) {
                this.nextTargetSelector.originalShot = nextTargetCoords;
                this.nextTargetSelector.priorityDirectionsStack.unshift([xNextCoords + 1, yNextCoords + 0]);
                this.nextTargetSelector.priorityDirectionsStack.unshift([xNextCoords + 0, yNextCoords + 1]);
                this.nextTargetSelector.priorityDirectionsStack.unshift([xNextCoords - 1, yNextCoords + 0]);
                this.nextTargetSelector.priorityDirectionsStack.unshift([xNextCoords + 0, yNextCoords - 1]);

            } else {
                const directionHeading: [number, number] | null = this.directionDetermination.determineDir(originalHitCoords, nextTargetCoords);
                if (directionHeading === null) return;
                this.nextTargetSelector.priorityDirectionsStack.unshift([xNextCoords + directionHeading[0], yNextCoords + directionHeading[1]]);

            }

            if (shipHit.isSunk()) {
                this.shipsSunkRegistry.addNew(shipHit);

                
                
                if (this.shipsSunkRegistry.getAll().length >= this.enemyGameBoard.ships.length) {
                    this.gameOverAICommand.execute();
                    return;

                }
                
                
            }
            
            
        }
        if (this.nextTargetSelector.priorityDirectionsStack.length === 0) { this.nextTargetSelector.originalShot = null; } //Could work a queue system whereby all coordinates are checked before following

        

    }

    
}