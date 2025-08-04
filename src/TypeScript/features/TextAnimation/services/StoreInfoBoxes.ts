import { IRegistryHTML } from "../../../models/IRegistry";

export class InfoBoxRegistry implements IRegistryHTML {
    private infoBoxes: HTMLElement[];

    constructor() {
        this.infoBoxes = [];
    }

    getAll(): HTMLElement[] {
        return this.infoBoxes;
    }
    addNew(elem: HTMLElement): void {
        this.infoBoxes.push(elem);
    }
    refresh(): void {
        this.infoBoxes.forEach((infoBox) => infoBox.remove());
        this.infoBoxes = [];
    }
}