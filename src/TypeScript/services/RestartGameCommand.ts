import { IAvailableSpacesShip } from "../features/AITargeting/models/IAvailableSpaces";
import { IRegistryRemoveSpaces } from "../features/AITargeting/models/IRegistryRemoval";
import { ITargetingState } from "../features/AITargeting/models/IStateManager";
import { ICommand, ICommandEvent, ICommandShipCoords } from "../models/ICommand";
import { IFindIndex } from "../models/IFindCoordinate";
import { IGameBoard } from "../models/IGameBoard";
import { IRegistryCoords, IRegistryShips } from "../models/IRegistry";

abstract class GameOverCommand implements ICommand {
    protected abstract userWon: boolean;

    constructor(
        private gameOverDialog: HTMLDialogElement,
        private dialogHeader: HTMLElement,
        private dialogDesc: HTMLElement
        // private restartAllCommand RESTRART COMMAND CAN FOREVER EXIST
    ) {}

    execute(): void {
        this.gameOverDialog.showModal();

        if (this.userWon) {
            this.dialogHeader.textContent = "VICTORY";
            this.dialogDesc.textContent = "Congratulations!!! You have beaten the computer, press the restart button below to play again";
        } else {
            this.dialogHeader.textContent = "DEFEAT";
            this.dialogDesc.textContent = "The computer has won, press the restart button below to play again"
        }

    }
}

export class UserWonCommand extends GameOverCommand {
    protected userWon: boolean;

    constructor(
        gameOverDialog: HTMLDialogElement,
        dialogHeader: HTMLElement,
        dialogDesc: HTMLElement
    ) {
        super(gameOverDialog, dialogHeader, dialogDesc);
        this.userWon = true;
    }

}

export class ComputerWonCommand extends GameOverCommand {
    protected userWon: boolean;

    constructor(
        gameOverDialog: HTMLDialogElement,
        dialogHeader: HTMLElement,
        dialogDesc: HTMLElement
    ) {
        super(gameOverDialog, dialogHeader, dialogDesc);
        this.userWon = false;
    }

}

export class RestartAllCommand implements ICommandEvent {
    constructor(
        private gameOverDialog: HTMLDialogElement,

        private resetDialogShipsSelect: ICommandEvent,

        private computerTargetingState: ITargetingState,

        private removeUsersShipsHTML: ICommandShipCoords,

        private userFindIndx: IFindIndex,
        private userGameSpaces: HTMLDivElement[],
        private userShotAtCoords: IRegistryCoords,
        private computerFindIndx: IFindIndex,
        private computerGameSpaces: HTMLDivElement[],
        private computerShotAtCoords: IRegistryRemoveSpaces,

        private shipSunkRegistryComputers: IRegistryShips,
        private shipSpacesRegistryComputers: IAvailableSpacesShip,
        

        private userGameBoard: IGameBoard,
        private computerGameBoard: IGameBoard
    ) {}

    public execute: (e: Event | undefined) => void = (e: Event | undefined): void => {
        this.gameOverDialog.close();

        this.userGameBoard.ships.forEach((ship) => {
            this.removeUsersShipsHTML.execute(ship);

        });

        this.userShotAtCoords.getAll().forEach(([x, y]) => {
            const index: number | null = this.userFindIndx.returnIndx(x, y);
            if (index === null) return;

            const gameSpace: HTMLDivElement = this.userGameSpaces[index];
            const svg: HTMLOrSVGElement | null = gameSpace.querySelector("svg");
            if (svg === null) return;
            (svg as HTMLElement).remove();



        });

        this.computerShotAtCoords.getAll().forEach(([x, y]) => {
            const index: number | null = this.computerFindIndx.returnIndx(x, y);
            if (index === null) return;

            const gameSpace: HTMLDivElement = this.computerGameSpaces[index];
            const svg: HTMLOrSVGElement | null = gameSpace.querySelector("svg");
            if (svg === null) return;
            (svg as HTMLElement).remove();
        });

        this.userShotAtCoords.refresh(); //TICK
        this.computerShotAtCoords.refresh(); //
        this.shipSunkRegistryComputers.refresh();
        this.shipSpacesRegistryComputers.shipSpaces = [];


        this.resetDialogShipsSelect.execute(undefined);


        this.computerTargetingState.originalShot = null;
        this.computerTargetingState.priorityDirectionsStack = [];


        this.userGameBoard.removeShips();
        this.computerGameBoard.removeShips();


    }
}