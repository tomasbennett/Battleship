import { IGameBoard } from "../../../models/IGameBoard";
import { IRegistry, IRegistryCoords } from "../../../models/IRegistry";
import { IRegistryRemoveSpaces } from "../models/IRegistryRemoval";

export class GridAvailableShots implements IRegistryRemoveSpaces {
    private availableSpaces: [number, number][];

    constructor(
        private enemyGameBoard: IGameBoard
    ) {
        this.availableSpaces = [];

        this.fillAvailableSpaces();

    }

    remove(elem: [number, number]): void {
        const [removeX, removeY]: [number, number] = elem;

        this.availableSpaces = this.availableSpaces.filter(([x, y]) => {
            return !(removeX === x && removeY === y);
        });
    }

    getAll(): [number, number][] {
        return this.availableSpaces;
    }

    refresh(): void {
        this.availableSpaces = [];

        this.fillAvailableSpaces();
    }

    private fillAvailableSpaces(): void {
        for (let y = 0; y < this.enemyGameBoard.yAxisLength; y++) {
            for (let x = 0; x < this.enemyGameBoard.xAxisLength; x++) {
                this.availableSpaces.push([x, y]);
            }

        }
    }
}