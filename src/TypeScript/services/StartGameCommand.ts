import { Ship } from "../Ship";
import { ICommand, ICommandEvent, ICommandHTML, ICommandMessage } from "../models/ICommand";
import { IFindCoordinate, IFindHTML } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryCoords, IRegistryHTML } from "../models/IRegistry";
import { IShip } from "../models/IShip";
import { ITraverseHTML } from "../models/ITraverse";

// export class StartGameCommand implements ICommand {
//     constructor(
//         private enemyGameSpacesHTML: HTMLDivElement[],

//         private enemyGameBoard: IGameBoard,

//         private shootCommand: ICommandEvent,

//         private hitShotCommand: ICommandHTML,
//         private missShotCommand: ICommandHTML,

//         private computerSpacesShotAt: IRegistryCoords
//     ) {}

//     execute(): void {
//         document.addEventListener("click", this.shootCommand.execute);
    
        
    
//     }
// }


export class ShootCommand implements ICommandEvent {
    constructor(
        private computerGameBoard: IGameBoard,

        private computerGameSpacesHTML: HTMLDivElement[],

        private findCoords: IFindCoordinate,

        private alreadyShotAtSpaces: IRegistryCoords,

        private missCommand: ICommandHTML,
        private hitCommand: ICommandHTML,

        private fireShotAI: ICommand,

        private gameOverUserWinnerCommand: ICommand,

        private userInfoBox: ICommandMessage
    ) {}

    execute: (e: Event | undefined) => void = (e: Event | undefined): void => {
        if (e instanceof MouseEvent) {
            const target: EventTarget | null = e.target;
            if (target === null) return;


            const clickedHTMLElem: HTMLElement = target as HTMLElement;
            const isEnemyGameSpace: boolean = this.computerGameSpacesHTML.includes(clickedHTMLElem as HTMLDivElement); //NEED TO CHECK IF IT HAS ALREADY BEEN CLICKED ON AS WELL

            if (!isEnemyGameSpace) return;

            const index: number = this.computerGameSpacesHTML.findIndex(elem => elem === clickedHTMLElem);
            if (index === -1) return;

            const coords: [number, number] | null = this.findCoords.findCoordinate(index); //THIS PRODUCES -1 IF NOT FOUND COULD MESS IT UP???
            if (coords === null) return;

            const [xShot, yShot]: [number, number] = coords;
            const isAlreadyShotSpace: boolean = this.alreadyShotAtSpaces.getAll().some(([x, y]) => x === xShot && y === yShot);
            if (isAlreadyShotSpace) return;


            this.alreadyShotAtSpaces.addNew(coords);

            document.removeEventListener("click", this.execute);

            


            const enemySpace: IShip | null = this.computerGameBoard.grid[yShot][xShot];
            
            clickedHTMLElem.setAttribute("data-cell-available", "already-shot");
            
            if (enemySpace === null) { 
                this.missCommand.execute(clickedHTMLElem);
                
                const missMessage: string = `You shot at Row: '${yShot + 1}' and Column: '${xShot + 1}' and missed.`;
                this.userInfoBox.execute(missMessage);


            }
            else {
                this.hitCommand.execute(clickedHTMLElem);
                enemySpace.hit();

                const hitMessage: string = `You shot at Row: '${yShot + 1}' and Column: '${xShot + 1}' and it's a hit!`;
                this.userInfoBox.execute(hitMessage);

                if (enemySpace.isSunk()) {
                    const sunkMessage: string = `You have sunk the computer's ${enemySpace.name}!`;
                    this.userInfoBox.execute(sunkMessage);

                    if (this.computerGameBoard.ships.every(({ ship }) => ship.isSunk())) {
                        this.gameOverUserWinnerCommand.execute();
                        // document.removeEventListener("click", this.execute);
                        return;
    
                    }
                }



            }

            setTimeout(() => {
                this.fireShotAI.execute();
                document.addEventListener("click", this.execute); //IN THE SETTIMEOUT THESE TWO NEED TO BE TIED TOGETHER

            }, 1000);

            
        }
    }
}

// export class ComputersTurn implements ICommand {
//     constructor(
//         private fireShotAI: ICommand
//     ) {

//     }

//     execute(): void {   
//         this.fireShotAI.execute();


//     }
// }