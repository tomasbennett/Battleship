export interface IFindCoordinate {
    findCoordinate(currPos: number): [number, number] | null;
}