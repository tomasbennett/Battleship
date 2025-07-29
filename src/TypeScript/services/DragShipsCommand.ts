import { ICommandEvent } from "../models/ICommand";

export class DragShip implements ICommandEvent {
    constructor(
        private ship: HTMLElement
    ) {}

    public execute: (e: Event | undefined) => void = (e: Event | undefined) => {
        if (e instanceof MouseEvent) {

            const xCoordinate: number = e.clientX;
            const yCoordinate: number = e.clientY;

            // const rect = this.ship.getBoundingClientRect();
            this.ship.style.left = `${xCoordinate}px`;
            this.ship.style.top = `${yCoordinate}px`; // - rect.height
        }

        
    }
}