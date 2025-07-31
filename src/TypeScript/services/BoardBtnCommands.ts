import { ICommandEvent } from "../models/ICommand";
import { IFindHTML, IFindIndex } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryHTML } from "../models/IRegistry";


export class ResetDialogBtnCommand implements ICommandEvent {
    constructor(
        private submitBtn: HTMLElement,
        private submitBtnCommand: ICommandEvent,
        private numSelectableShips: number,

        private gameBoard: IGameBoard,

        private shipsSelectUsed: IRegistryHTML,

        private findHTML: IFindHTML
    ) {}

    public execute: (e: Event) => void = (e: Event): void => {
        if (!(e instanceof MouseEvent)) return;

        const target: EventTarget | null = e.target;
        if (target === null) return;

        const resetBtn: HTMLElement = (target as HTMLElement);

        
        if (this.gameBoard.ships.length >= this.numSelectableShips) {
            this.submitBtn.setAttribute("data-clickable", "not-ready");
            this.submitBtn.removeEventListener("click", this.submitBtnCommand.execute);
            
        }

        //FINALLY GET THE SHIPS COORDINATES OUT AND USING THEIR DIRECTION, LENGTH AND 
        this.gameBoard.ships.forEach((shipCoords) => {

            this.findHTML.returnGameSpaces(shipCoords).forEach((gameSpace) => {
                gameSpace.classList.remove("dialog-ship-cell");
                gameSpace.setAttribute("data-cell-available", "no-interaction");
            });            


        });
        this.gameBoard.removeShips();
        
        this.shipsSelectUsed.refresh();
        
        
        resetBtn.setAttribute("data-clickable", "not-ready");
        resetBtn.removeEventListener("click", this.execute);
        


    }
}


export class SubmitDialogBtnCommand implements ICommandEvent {
    constructor(
        private dialog: HTMLDialogElement,
        private gameBoard: IGameBoard,
        private findHTML: IFindHTML
    ) {}

    public execute: (e: Event) => void = (e: Event): void => {
        if (!(e instanceof MouseEvent)) return;
        
        const target: EventTarget | null = e.target;
        if (target === null) return;

        this.dialog.close();

        

    }
}