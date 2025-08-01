export interface IDirectionDetermination {
    determineDir(from: [number, number], to: [number, number]): [number, number] | null;
}