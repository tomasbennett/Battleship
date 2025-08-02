import { IRegistryCoords } from "../models/IRegistry";

export class ShotAtCoordsRegistry implements IRegistryCoords {
    private shotAtCoords: [number, number][];

    constructor() {
        this.shotAtCoords = [];
    }

    getAll(): [number, number][] {
        return this.shotAtCoords;
    }
    addNew(elem: [number, number]): void {
        this.shotAtCoords.push(elem);
    }
    refresh(): void {
        this.shotAtCoords = [];
    }
}