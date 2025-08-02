import { Ship } from "../../../Ship";
import { ICommand } from "../../../models/ICommand";
import { IDirection } from "../../../models/IDirection";
import { IGameBoard } from "../../../models/IGameBoard";
import { IShip } from "../../../models/IShip";
import { IRegistryRemoveSpaces } from "../models/IRegistryRemoval";

export class ChooseShipCoords implements ICommand {
    constructor(
        private computerGameBoardContainer: HTMLElement,
        private enemyGameBoard: IGameBoard,

        private computerGameBoard: IGameBoard,
        private computerAvailablePlacableSpaces: IRegistryRemoveSpaces
    ) {}

    execute(): void {
        this.enemyGameBoard.ships.forEach(({ship}) => {
            const computerShip: IShip = new Ship(ship.length);

            const computerDirections: IDirection[] = ["horizontal", "vertical"];
            const compShipDir: IDirection = computerDirections[Math.floor(Math.random() * computerDirections.length)];

            



        });
    }
}