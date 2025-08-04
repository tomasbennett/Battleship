import { Ship } from "../Ship";
import { IAvailableSpacesShip } from "../features/AITargeting/models/IAvailableSpaces";
import { ICommand, ICommandEvent, ICommandShipCoords } from "../models/ICommand";
import { IFindHTML, IFindIndex } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryHTML } from "../models/IRegistry";
import { IShip } from "../models/IShip";


// export class ResetDialogBtnCommand implements ICommandEvent {
//     constructor(
//         private submitBtn: HTMLElement,
//         private submitBtnCommand: ICommandEvent,
//         private numSelectableShips: number,

//         private gameBoard: IGameBoard,

//         private shipsSelectUsed: IRegistryHTML,

//         private findHTML: ICommandShipCoords
//     ) {}

//     public execute: (e: Event) => void = (e: Event): void => {
//         if (!(e instanceof MouseEvent)) return;

//         const target: EventTarget | null = e.target;
//         if (target === null) return;

//         const resetBtn: HTMLElement = (target as HTMLElement);

        
//         if (this.gameBoard.ships.length >= this.numSelectableShips) {
//             this.submitBtn.setAttribute("data-clickable", "not-ready");
//             this.submitBtn.removeEventListener("click", this.submitBtnCommand.execute);
            
//         }

//         //FINALLY GET THE SHIPS COORDINATES OUT AND USING THEIR DIRECTION, LENGTH AND 
//         this.gameBoard.ships.forEach((shipCoords) => {

//             this.findHTML.execute(shipCoords);          


//         });
//         this.gameBoard.removeShips();
        
//         this.shipsSelectUsed.refresh();
        
        
//         resetBtn.setAttribute("data-clickable", "not-ready");
//         resetBtn.removeEventListener("click", this.execute);
        


//     }
// }

export class ResetDialogCommand implements ICommandEvent { //We'LL nned to check through this big time
    constructor(
        private resetBtn: HTMLButtonElement,

        private submitBtn: HTMLElement,
        private submitBtnCommand: ICommandEvent,
        private numSelectableShips: number,

        private gameBoard: IGameBoard,

        private shipsSelectUsed: IRegistryHTML,

        private findHTML: ICommandShipCoords
    ) {}

    public execute: (e: Event | undefined) => void = (e: Event | undefined): void => {
        if (this.gameBoard.ships.length >= this.numSelectableShips) {
            this.submitBtn.setAttribute("data-clickable", "not-ready");
            this.submitBtn.removeEventListener("click", this.submitBtnCommand.execute);
            
        }

        //FINALLY GET THE SHIPS COORDINATES OUT AND USING THEIR DIRECTION, LENGTH AND 
        this.gameBoard.ships.forEach((shipCoords) => {

            this.findHTML.execute(shipCoords);          


        });
        this.gameBoard.removeShips();
        
        this.shipsSelectUsed.refresh();
        
        
        this.resetBtn.setAttribute("data-clickable", "not-ready");
        this.resetBtn.removeEventListener("click", this.execute);
    }
}



export class SubmitDialogBtnCommand implements ICommandEvent {
    constructor(
        private dialog: HTMLDialogElement,
        private gameBoard: IGameBoard,
        private findHTML: ICommandShipCoords,

        // private startGameCommand: ICommand,
        private shootCommand: ICommandEvent,

        private placeComputerShips: IAvailableSpacesShip

    ) {}

    public execute: (e: Event) => void = (e: Event): void => {
        if (!(e instanceof MouseEvent)) return;
        
        const target: EventTarget | null = e.target;
        if (target === null) return;

        this.dialog.close();
        this.dialog.style.display = "none";

        this.gameBoard.ships.forEach((ship) => {
            this.findHTML.execute(ship);

            const computerShip: IShip = new Ship(ship.ship.length,  ship.ship.name);
            this.placeComputerShips.findAvailableSpaces(computerShip);

        });

        document.addEventListener("click", this.shootCommand.execute);


    }
}