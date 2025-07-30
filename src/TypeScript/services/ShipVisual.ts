import { ICommandEvent, ICommandEventLastRun } from "../models/ICommand";
import { IFindCoordinate } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IShip } from "../models/IShip";
import { IShipRotate } from "../models/IShipRotate";

export class ShipHTMLVisual implements IShipRotate {
    constructor(
        private ship: IShip,
        private shipHTML: HTMLElement
    ) {}

    rotateShip(): void {
        if (this.ship.direction === "horizontal") {
            this.ship.direction = "vertical";
            this.shipHTML.style.transform = "rotate(90deg)";

            return;
        }

        this.ship.direction = "horizontal";
        this.shipHTML.style.transform = "rotate(0deg)";

        return;

    }

}

export class ShipPlaceGrid implements ICommandEventLastRun {
    // private lastElement: HTMLElement | null;
    public lastElements: HTMLElement[];

    constructor(
        private gameGrid: IGameBoard,
        private ship: IShip,

        private findCoord: IFindCoordinate

    ) {
        // this.lastElement = null;
        this.lastElements = [];
    }

    public execute: (e: Event | undefined) => void = (e: Event | undefined): void => {

        if (e instanceof MouseEvent) {

            const elements: Element[] = document.elementsFromPoint(e.clientX, e.clientY);
            const gameSpace: Element | undefined = elements.find((elem) => {
                return elem.classList.contains("game-space");
            });

            if (gameSpace === this.lastElements[0]) return;

            this.lastElements.forEach((elem) => elem.setAttribute("data-cell-available", "no-interaction"));
            this.lastElements = [];

            if (!gameSpace) return;


            const gameSpacesArr: Element[] = Array.from(gameSpace!.parentElement!.children);
            const index: number = gameSpacesArr.indexOf(gameSpace);
            const coords: [number, number] | null = this.findCoord.findCoordinate(index);

            if (coords === null) return;

            const [col, row]: [number, number] = coords; //DOUBLE CHECK THAT THESE ARE THE RIGHT WAYS AROUND!!!

            
            if (this.gameGrid.canPlaceShip(col, row, this.ship)) {
                const verticalFactor: number = this.ship.direction === "vertical" ?
                                               this.gameGrid.xAxisLength :
                                               1;
                 

                for (let i = 0; i < this.ship.length; i++) {
                    gameSpacesArr[index + i * verticalFactor].setAttribute("data-cell-available", "available");
                    this.lastElements.push(gameSpacesArr[index + i * verticalFactor] as HTMLElement);

                }

            } else {

                let i = 0;
                let currentIndex = index;
                if (this.ship.direction === "vertical") {
                    while (currentIndex < gameSpacesArr.length) {

                        gameSpacesArr[currentIndex].setAttribute("data-cell-available", "unavailable");
                        this.lastElements.push(gameSpacesArr[currentIndex] as HTMLElement);
                        currentIndex = index + i++ * this.gameGrid.xAxisLength;
                    }

                } else {
                    const startRow = Math.floor(index / this.gameGrid.xAxisLength);
                    while (currentIndex < gameSpacesArr.length &&
                        Math.floor(currentIndex / this.gameGrid.xAxisLength) === startRow) {
                        
                        gameSpacesArr[currentIndex].setAttribute("data-cell-available", "unavailable");
                        this.lastElements.push(gameSpacesArr[currentIndex] as HTMLElement);
                        currentIndex = index + i++;
                    }

                }

            }

            //SO WE NEED TO:
            //(1) CHECK IF gameSpace is a .game-space and if so check if the current ship fits
            //(2) IF SO MAKE THE DIVS WITHIN THE LENGTH GREEN

            // this.lastElement = gameSpace as HTMLElement;


        }
    }


}