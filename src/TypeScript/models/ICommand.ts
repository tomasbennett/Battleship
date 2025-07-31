import { IShipCoordinates } from "./IShip";

export interface ICommand<T = void> {
    execute(e: T): void;
}

export type ICommandEvent = ICommand<Event | undefined>;

export type ICommandHTML = ICommand<HTMLElement>;

export type ICommandShipCoords = ICommand<IShipCoordinates>

export type ICommandEventLastRun = ICommandEvent & {
    lastElements: HTMLElement[]
}