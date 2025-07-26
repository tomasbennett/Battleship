import { ICommandEvent } from "../models/ICommand";

export class MouseFollow implements ICommandEvent {
    execute(e: Event | undefined): void {
        if (e instanceof MouseEvent) {
            const xCoordinate: number = e.clientX;
            const yCoordinate: number = e.clientY;

            console.log("Following mouse at:", xCoordinate, yCoordinate);

        }
    }

}

export class MouseFinal implements ICommandEvent {
    execute(e: Event | undefined): void {
        if (e instanceof MouseEvent) {
            const xCoordinate: number = e.clientX;
            const yCoordinate: number = e.clientY;

            console.log(`Final location is going to be x: ${xCoordinate} y: ${yCoordinate}`);

            return;
        }

        console.log("Blur Window shown mouse reset");
    }
}