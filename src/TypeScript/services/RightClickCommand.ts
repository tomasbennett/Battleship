import { ICommandEvent } from "../models/ICommand";
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