// import { IFindCoordinate } from "../models/IFindCoordinate";

// export class FindNodeCoordinate implements IFindCoordinate {
//     constructor(
//         private noCols: number
//     ) {}

//     findCoordinate(currPos: number): [number, number] | null {
//         //BASE ZERO
//         if (currPos < 0 || this.noCols <= 0) {
//             return null;
//         }

//         const col: number = currPos % this.noCols;
//         const row: number = Math.floor(currPos / this.noCols);

//         return [col, row];
//     }
// }