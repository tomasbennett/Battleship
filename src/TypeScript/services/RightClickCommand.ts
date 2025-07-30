import { ICommandEvent, ICommandEventLastRun } from "../models/ICommand";
import { IShipRotate } from "../models/IShipRotate";

export class RightClickRotateShip implements ICommandEvent {
    constructor(
        private shipRotate: IShipRotate
    ) {

    }

    public execute: (e: Event) => void = (e: Event): void => {
        e.preventDefault();
        this.shipRotate.rotateShip();
    }


}


export class RefreshGrid implements ICommandEvent {
    constructor(
        private gridCellsCommand: ICommandEventLastRun
    ) {

    }

    public execute: (e: Event) => void = (e: Event): void => {
        e.preventDefault();

        this.gridCellsCommand.lastElements.forEach((elem) => {
            elem.setAttribute("data-cell-available", "no-interaction");
        });

        this.gridCellsCommand.lastElements = [];
        this.gridCellsCommand.execute(e);
    }
}