import { ISelection } from "../../../models/ISelection";
import { ICommandCoords } from "../models/ICommandCoordinates";
import { IRegistryRemoveSpaces } from "../models/IRegistryRemoval";
import { ITargetingState } from "../models/IStateManager";

export class ChooseAICoordinates implements ITargetingState {
    private _originalShot: [number, number] | null;

    public get originalShot(): [number, number] | null {
        return this._originalShot;
    }

    public set originalShot(value: [number, number] | null) {
        this._originalShot = value;
    }

    private _priorityDirectionsStack: [number, number][];

    public get priorityDirectionsStack(): [number, number][] {
        return this._priorityDirectionsStack;
    }

    public set priorityDirectionsStack(value: [number, number][]) {
        this._priorityDirectionsStack = value;
    }

    constructor(
        private availableSpaces: IRegistryRemoveSpaces,

        private randomShot: ISelection,
    ) {
        this._originalShot = null;

        this._priorityDirectionsStack = [];
    }

    chooseFiringCoords(): [number, number] | null {
        // if (this._priorityDirectionsStack.length <= 0) {
        //     const randomShotCoords: [number, number] | null = this.randomShot.selectCoords();
        //     if (randomShotCoords === null) return;
        //     this.firedShotCommand.execute(randomShotCoords);

        //     return;

        // }

        // const [xNextDirection, yNextDirection]: [number, number] = this._priorityDirectionsStack.shift()!;
        // if (this.availableSpaces.some(([xCoord, yCoord]) => { return xNextDirection === xCoord && yNextDirection === yCoord; })) {
        //     const confirmedNextShotCoords: [number, number] = [xNextDirection, yNextDirection];
        //     this.firedShotCommand.execute(confirmedNextShotCoords);
        //     this._latestShot = confirmedNextShotCoords;
        //     return;

        // }

        // return this.fire();
        const availableCoords: [number, number][] = this.availableSpaces.getAll();

        while (this._priorityDirectionsStack.length > 0) {
            const [xNext, yNext]: [number, number] = this._priorityDirectionsStack.shift()!;
            if (availableCoords.some(([x, y]) => x === xNext && y === yNext)) {
                return [xNext, yNext];
            }
        }

        const randomShot: [number, number] | null = this.randomShot.selectCoords();
        return randomShot;
    }
}