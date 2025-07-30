import { Ship } from "../Ship";
import { ICommand, ICommandEvent, ICommandEventLastRun } from "../models/ICommand";
import { IFindCoordinate } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IShip } from "../models/IShip";
import { IShipRotate } from "../models/IShipRotate";
import { ITraverseHTML } from "../models/ITraverse";
import { DragShip } from "./DragShipsCommand";
import { RefreshGrid, RightClickRotateShip } from "./RightClickCommand";
import { ShipHTMLVisual, ShipPlaceGrid } from "./ShipVisual";

export class SelectShip implements ICommandEvent {
    constructor(
        private outerContainer: HTMLElement,
        private findElem: ITraverseHTML,
        private rightClickHTML: HTMLElement,

        private gameBoard: IGameBoard,
        private findCoord: IFindCoordinate
    ) {

    }

    public execute: (e: Event | undefined) => void = (e: Event | undefined) => {
        const shipContainer: EventTarget | null | undefined = e?.target; 
        
        if (shipContainer !== undefined && shipContainer !== null) {
            
            const shipContainerHTML: HTMLElement | null = this.findElem.search(shipContainer as HTMLElement, ".dialog-ship-container");
            if (shipContainerHTML !== null) {

                shipContainerHTML.style.opacity = "0";

                const shipImg: HTMLElement = (shipContainerHTML as HTMLElement).querySelector(".dialog-ship-image")!;

                const shipDraggable: HTMLElement = shipImg.cloneNode(true) as HTMLElement;
                shipDraggable.id = "ship-draggable";
                shipDraggable.classList.add("dragging");
    
                const shipDragCommand: ICommandEvent = new DragShip(shipDraggable);
                shipDragCommand.execute(e);
    
                window.addEventListener("pointermove", shipDragCommand.execute); //TAKE THE SHIP WITH YOU EVERYWHERE

                const shipLength: number = Array.from(shipImg.children).length;
                const ship: IShip = new Ship(shipLength);

                const highlightCellCommand: ICommandEventLastRun = new ShipPlaceGrid(
                    this.gameBoard,
                    ship,
                    this.findCoord
                );


                window.addEventListener("pointermove", highlightCellCommand.execute);
                
                this.outerContainer.appendChild(shipDraggable);
                





                this.rightClickHTML.classList.add("fade-in-out");

                const rotateShip: IShipRotate = new ShipHTMLVisual(
                    ship,
                    shipDraggable
                );
                const rightClickCommand: ICommandEvent = new RightClickRotateShip(rotateShip);
                document.addEventListener("contextmenu", rightClickCommand.execute);

                const refreshGrid: ICommandEvent = new RefreshGrid(highlightCellCommand);
                document.addEventListener("contextmenu", refreshGrid.execute);


                document.addEventListener("pointerup", (e: MouseEvent) => {
    
                    shipDraggable.remove();
                    this.rightClickHTML.classList.remove("fade-in-out");

                    window.removeEventListener("pointermove", shipDragCommand.execute);

                    window.removeEventListener("pointermove", highlightCellCommand.execute);
    
                    document.removeEventListener("contextmenu", rightClickCommand.execute);

                    document.removeEventListener("contextmenu", refreshGrid.execute);
                }, { once: true }); //REMOVE THIS SHIP FROM VIEW AND THE MOUSEMOVE EVENTLISTENER

                


                


                // const gameSpaces: Element[] = Array.from(this.gameBoardHTML.children);



            }
            
            
            



        }
    
    }

}