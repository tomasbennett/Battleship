import { IDirectionDetermination } from "../models/ICoordinateDirDetermine";

export class CoordinateDirections implements IDirectionDetermination {
    constructor() {}

    determineDir(from: [number, number], to: [number, number]): [number, number] | null {
        const dx: number = to[0] - from[0];
        const dy: number = to[1] - from[1];

        if (dx !== 0 && dy === 0) return [Math.sign(dx), 0];
        if (dy !== 0 && dx === 0) return [0, Math.sign(dy)];

        return null;
    }
}