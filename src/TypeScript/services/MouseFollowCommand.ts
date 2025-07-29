import { ICommandEvent } from "../models/ICommand";

export class MouseFollow implements ICommandEvent {
    execute(e: Event | undefined): void {
        if (e instanceof MouseEvent) {
            const xCoordinate: number = e.clientX;
            const yCoordinate: number = e.clientY;

            console.log("Following mouse at:", xCoordinate, yCoordinate);

            const elem: Element | null = document.elementFromPoint(xCoordinate, yCoordinate);

            if (elem !== null) {
                console.dir(elem);

            }


        }
    }

}

export class MouseFinal implements ICommandEvent {
    execute(e: Event | undefined): void {
        if (e instanceof MouseEvent) {
            const xCoordinate: number = e.clientX;
            const yCoordinate: number = e.clientY;

            console.log(`Final location is going to be x: ${xCoordinate} y: ${yCoordinate}`);

            const elem: Element | null = document.elementFromPoint(xCoordinate, yCoordinate);

            if (elem !== null) {
                console.dir(elem);
                
            }


            return;
        }

        console.log("Blur Window shown mouse reset");
    }
}


export class MouseMove implements ICommandEvent {
    public execute: (e: Event | undefined) => void = (e: Event | undefined) => {
        // if (e instanceof MouseEvent) {
        //     const xCoordinate: number = e.clientX;
        //     const yCoordinate: number = e.clientY;

        //     console.log(`x: ${xCoordinate} y: ${yCoordinate}`);


        //     return;
        // }
    }

}