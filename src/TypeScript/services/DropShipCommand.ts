import { ICommandEvent } from "../models/ICommand";

export class DropShip implements ICommandEvent {
    constructor(

    ) {}

    execute(e: Event | undefined): void {
        throw new Error("Method not implemented.");
    }

}