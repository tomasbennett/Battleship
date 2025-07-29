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