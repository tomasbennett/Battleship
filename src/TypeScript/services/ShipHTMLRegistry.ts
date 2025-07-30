import { IRegistryHTML } from "../models/IRegistry";

export class ShipHTMLRegistry implements IRegistryHTML {
    private shipsHTML: HTMLElement[];

    constructor() {
        this.shipsHTML = [];
    }

    getAll(): HTMLElement[] {
        return this.shipsHTML;
    }
    addNew(elem: HTMLElement): void {
        this.shipsHTML.push(elem);
    }
    refresh(): void {
        this.shipsHTML.forEach((ship) => {
            ship.style.display = "flex";
            ship.style.opacity = "1";
        })
        this.shipsHTML = [];
    }
}