import { IRegistryRemoveSpaces } from "../features/AITargeting/models/IRegistryRemoval";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryCoords } from "../models/IRegistry";
import { ISelection } from "../models/ISelection";

export class RandomSelection implements ISelection {
    constructor(
        private availableCoords: IRegistryRemoveSpaces
    ) {

    }

    selectCoords(): [number, number] | null {
        // const prevCoords: [number, number][] = this.prevSelectedCoords.getAll();
    
        // const availableCoords = this.allCoords.filter(([x, y]) =>
        //     !prevCoords.some(([px, py]) => px === x && py === y)
        // );
    
        if (this.availableCoords.getAll().length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * this.availableCoords.getAll().length);
        return this.availableCoords.getAll()[randomIndex];
    }
}

export class HitSelection implements ISelection {
    constructor() {}

    selectCoords(): [number, number] | null {
        throw new Error("Method not implemented.");
    }
}