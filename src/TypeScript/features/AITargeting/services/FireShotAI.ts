import { ICommand, ICommandEvent, ICommandHTML } from "../../../models/ICommand";
import { IFindHTML, IFindIndex } from "../../../models/IFindCoordinate";
import { IGameBoard } from "../../../models/IGameBoard";
import { IRegistryShips } from "../../../models/IRegistry";
import { IShip } from "../../../models/IShip";
import { ICommandCoords } from "../models/ICommandCoordinates";
import { IDirectionDetermination } from "../models/ICoordinateDirDetermine";
import { IRegistryRemoveSpaces } from "../models/IRegistryRemoval";
import { ITargetingState } from "../models/IStateManager";

export class FireShotAI implements ICommand {
    constructor(
        private nextTargetSelector: ITargetingState,

        private enemyGameBoard: IGameBoard,

        private removeAvailableSpace: IRegistryRemoveSpaces, //NEEDS TO BE CREATED MAYBE JUST NEEDS TO BE A MEMORY CLASS LIKE AN IREGISTRY THAT REMOVES SINGLE ITEMS BY ARRAY VALUES???


        private findIndx: IFindIndex,
        private gameSpaceHTMLArr: HTMLDivElement[],

        private hitShotCommand: ICommandHTML,
        private missShotCommand: ICommandHTML,


        private shipsSunkRegistry: IRegistryShips,
        private gameOverAICommand: ICommand,

        private directionDetermination: IDirectionDetermination,
    ) {}

    execute(): void {
        const nextTargetCoords: [number, number] | null = this.nextTargetSelector.chooseFiringCoords();
        if (nextTargetCoords === null) return;

        const [xNextCoords, yNextCoords]: [number, number] = nextTargetCoords;

        const isHit: boolean = this.enemyGameBoard.ships.some(({xCoord, yCoord}) => {
            return xCoord === xNextCoords && yCoord === yNextCoords;
        });

        //SO WE NEED TO SAY IF IT'S A HIT AND THERE ARE NO CURRENT DIRECTIONS TO FOLLOW THEN ADD NEW ONES AROUND THE ORIGINAL POINT
        //IF THERE ARE POINTS TO FOLLOW THEN IT MEANS THERE WAS A HIT BEFOREHAND AND AN ORIGINAL POINT THAT WE CAN BACK PEDDAL ON,

        //THERE ARE TWO CIRCUMSTANCES HERE, ONE IS THAT THE POINT BEFORE THE ORIGINAL POINT HAS ALREADY BEEN ADDED, THIS WOULD ONLY HAPPEN IF
        //dont set lasthit when doing cardinal directions, so only if you find a hit, there is an original point already and last hit hasn't been set you should set the opposite direction of original point

        //EACH MUST TAKE FROM AVAILABLE SPACES
        const gameSpaceIndx: number | null = this.findIndx.returnIndx(xNextCoords, yNextCoords);
        if (gameSpaceIndx === null) return;
        const gameSpaceDiv: HTMLDivElement = this.gameSpaceHTMLArr[gameSpaceIndx];

        if (!isHit) {
            //PUT A WHITE SPACE ON THE GIVEN ELEMENT FOR THE COORDS AND GIVE IT A DATA-ATTRIBUTE NAME
            this.missShotCommand.execute(gameSpaceDiv);

        } else {
            this.hitShotCommand.execute(gameSpaceDiv);

            const shipHit: IShip | null = this.enemyGameBoard.grid[yNextCoords][xNextCoords];
            if (shipHit === null) return;
            shipHit.hit();

            const originalHitCoords: [number, number] | null = this.nextTargetSelector.originalShot;
            if (originalHitCoords === null) {
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
                    
                }


            }

        }

        // if (isHit && this.nextTargetSelector.originalShot === null) {
        //     //CARDINALS NEED TO BE SET IN NO LATEST SHOT SET
        //     this.nextTargetSelector.priorityDirectionsStack.unshift(...this.cardinalDirections);
        //     this.nextTargetSelector.originalShot = nextTargetCoords;

        //     this.hitShotCommand.execute(gameSpaceDiv);

        // } 
        // else if (isHit && this.nextTargetSelector.originalShot !== null && this.nextTargetSelector.latestShot === null) {
        //     //IF THERE HAS ALREADY BEEN A HIT BUT NO SPECIFIC DIRECTION TO TRAVEL HAS BEEN GIVEN YET
        //     //HERE WE CAN CALCULATE A DIRECTION BY SAYING THAT IF WE TAKE AWAY NEXTTARGET COORDS FROM 
        //     //PROBABLY CLEVER WAY OF DOING THIS BY GETTTING THE SUBTRACTION BETWEEN ORIGINAL POINT AND NEXTCOORDS 

        //     // this.nextTargetSelector.latestShot = nextTargetCoords;
            

        //     this.hitShotCommand.execute(gameSpaceDiv);
        // }
        // else {
        //     //IF THERE IS ALREADY A CARDINAL DIRECTION BUT ANOTHER HIT HAS BEEN GIVEN

        //     this.nextTargetSelector.priorityDirectionsStack.unshift();
        //     // this.nextTargetSelector.latestShot = nextTargetCoords;

        //     this.hitShotCommand.execute(gameSpaceDiv);
        // }

        //BIG QUESTION: WHEN TO RESET ORIGINAL AND LATEST SHOTS
        this.removeAvailableSpace.remove(nextTargetCoords);
    }

    
}