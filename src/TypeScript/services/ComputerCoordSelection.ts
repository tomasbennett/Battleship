import { IGameBoard } from "../models/IGameBoard";
import { IRegistryCoords } from "../models/IRegistry";
import { ISelection } from "../models/ISelection";

export class RandomSelection implements ISelection {
    constructor(
        private allCoords: [number, number][],
        private prevSelectedCoords: IRegistryCoords
    ) {

    }

    selectCoords(): [number, number] | null {
        const prevCoords: [number, number][] = this.prevSelectedCoords.getAll();
    
        const availableCoords = this.allCoords.filter(([x, y]) =>
            !prevCoords.some(([px, py]) => px === x && py === y)
        );
    
        if (availableCoords.length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * availableCoords.length);
        return availableCoords[randomIndex];
    }
}

export class HitSelection implements ISelection {
    constructor() {}

    selectCoords(): [number, number] | null {
        throw new Error("Method not implemented.");
    }
}