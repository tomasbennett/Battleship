import { Ship } from "../Ship";
import { ICommand, ICommandEvent, ICommandEventLastRun } from "../models/ICommand";
import { IFindCoordinate, IFindHTML } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryHTML } from "../models/IRegistry";
import { IShip } from "../models/IShip";
import { IShipRotate } from "../models/IShipRotate";
import { ITraverseHTML } from "../models/ITraverse";
import { SubmitDialogBtnCommand } from "./BoardBtnCommands";
import { DragShip } from "./DragShipsCommand";
import { RefreshGrid, RightClickRotateShip } from "./RightClickCommand";
import { ShipHTMLVisual, ShipCellValid } from "./ShipVisual";

export class SelectShip implements ICommandEvent {

    constructor(
        private outerContainer: HTMLElement,
        private findElem: ITraverseHTML,
        private rightClickHTML: HTMLElement,

        private gameBoard: IGameBoard,
        private findCoord: IFindCoordinate,

        private refreshBtn: HTMLElement,
        private submitBtn: HTMLElement,
        private submitCommand: ICommandEvent,
        private refreshCommand: ICommandEvent,

        private shipsHTMLUsed: IRegistryHTML,
        private noShips: number
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
                const shipName: string = shipContainerHTML.querySelector(".dialog-ship-title")!.textContent!;
                const spaceIndex: number = shipName.indexOf(" ");
                const firstWord: string = spaceIndex === -1 ? shipName : shipName.slice(0, spaceIndex);
                
                
                const ship: IShip = new Ship(shipLength, firstWord);

                const highlightCellCommand: ICommandEventLastRun = new ShipCellValid(
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
                    
                    highlightCellCommand.lastElements.forEach((cell) => cell.setAttribute("data-cell-available", "no-interaction"));
                    

                    const targets: Element[] = document.elementsFromPoint(e.clientX, e.clientY);
                    const gameSpace: Element | undefined = targets.find(t => t.classList.contains("game-space"));
                    if (!gameSpace) { shipContainerHTML.style.opacity = "1"; return; }

                    const gameSpacesArr: Element[] = Array.from(gameSpace.parentElement!.children);
                    const index: number = gameSpacesArr.indexOf(gameSpace);
                    const coords: [number, number] | null = this.findCoord.findCoordinate(index);
                
                    if (coords && this.gameBoard.canPlaceShip(...coords, ship)) {
                        const prevShipLength: number = this.gameBoard.ships.length;

                        this.gameBoard.placeShip(ship, ...coords);

                        shipContainerHTML.style.display = "none";
                        this.shipsHTMLUsed.addNew(shipContainerHTML);

                        const shipCells: HTMLElement[] = highlightCellCommand.lastElements;
                        shipCells.forEach((cell) => cell.classList.add("dialog-ship-cell"));

                        

                        if (this.gameBoard.ships.length === 1 && prevShipLength === 0) { 
                            //ACTIVATE THE RESET BTN
                              


                            this.refreshBtn.setAttribute("data-clickable", "ready");

                            this.refreshBtn.addEventListener("click", this.refreshCommand.execute);

                        } else if (this.gameBoard.ships.length === this.noShips) {
                            //ACTIVATE THE SUBMIT BTN
                            
                            this.submitBtn.setAttribute("data-clickable", "ready");

                            this.submitBtn.addEventListener("click", this.submitCommand.execute);
                        }

                    } else {
                        shipContainerHTML.style.opacity = "1"; 

                    }
                    

                }, { once: true }); //REMOVE THIS SHIP FROM VIEW AND THE MOUSEMOVE EVENTLISTENER

                


                


                // const gameSpaces: Element[] = Array.from(this.gameBoardHTML.children);



            }
            
            
            



        }
    
    }

}