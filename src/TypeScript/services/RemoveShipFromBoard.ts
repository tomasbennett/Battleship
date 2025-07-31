import { ICommandHTML } from "../models/ICommand";

export class RemoveHTMLShip implements ICommandHTML {
    constructor() {}

    execute(e: HTMLElement): void {
        e.classList.remove("dialog-ship-cell");
        e.setAttribute("data-cell-available", "no-interaction");
    }
}