import { IShip, IShipCoordinates } from "./IShip";

export interface IRegistry<T> {
    getAll(): T[];

    addNew(elem: T): void;

    refresh(): void;
}

export type IRegistryCoords = IRegistry<[number, number]>;

export type IRegistryShips = IRegistry<IShip>;

export type IRegistryShipCoords = IRegistry<IShipCoordinates>;

export type IRegistryHTML = IRegistry<HTMLElement>;