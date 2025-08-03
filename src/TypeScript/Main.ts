import { GameBoard } from "./GameBoard";
import { dialogSelectShips, refreshBtn, submitBtn } from "./components/Dialog";
import { endGameDesc, endGameDialog, endGameHeader, endGameResetBtn } from "./components/EndGame";
import { computerGameSpaces, userGameSpaces } from "./components/GameBoardMain";
import { gameSpacesDialog } from "./components/GameSpacesDialog";
import { rotateInstructions } from "./components/RotateInstructions";
import { allShipsDialog, allShipsSelectContainer, carrierDialogContainer } from "./components/ShipsDialog";
import { IAvailableSpacesShip } from "./features/AITargeting/models/IAvailableSpaces";
import { IDirectionDetermination } from "./features/AITargeting/models/ICoordinateDirDetermine";
import { IRegistryRemoveSpaces } from "./features/AITargeting/models/IRegistryRemoval";
import { ITargetingState } from "./features/AITargeting/models/IStateManager";
import { FindAvailableSpaces } from "./features/AITargeting/services/AvailableSpaces";
import { ChooseAICoordinates } from "./features/AITargeting/services/ChooseAICoords";
import { FireShotAI } from "./features/AITargeting/services/FireShotAI";
import { GridAvailableShots } from "./features/AITargeting/services/GridAvailableSpaces";
import { HitShotHTML, MissedShotHTML } from "./features/AITargeting/services/HTMLShot";
import { ShipsSunkRegistry } from "./features/AITargeting/services/ShipsSunkRegistry";
import { CoordinateDirections } from "./features/AITargeting/util/CoordinatesDirection";
import { ICommand, ICommandEvent, ICommandHTML, ICommandShipCoords } from "./models/ICommand";
import { IFindCoordinate, IFindIndex, IFindShipsFullCoords } from "./models/IFindCoordinate";
import { IGameBoard } from "./models/IGameBoard";
import { IMouseDown } from "./models/IMouseDown";
import { IRegistryCoords, IRegistryHTML, IRegistryShips } from "./models/IRegistry";
import { ISelection } from "./models/ISelection";
import { ITraverseHTML } from "./models/ITraverse";
import { ResetDialogCommand, SubmitDialogBtnCommand } from "./services/BoardBtnCommands";
import { RandomSelection } from "./services/ComputerCoordSelection";
import { MouseFinal, MouseMove } from "./services/MouseFollowCommand";
import { AddHTMLShip, RemoveHTMLShip } from "./services/RemoveShipFromBoard";
import { ComputerWonCommand, RestartAllCommand, UserWonCommand } from "./services/RestartGameCommand";
import { SelectShip } from "./services/SelectShipCommand";
import { ShipHTMLRegistry } from "./services/ShipHTMLRegistry";
import { ShotAtCoordsRegistry } from "./services/ShotAtRegistry";
import { ShootCommand } from "./services/StartGameCommand";
import { FindClosestElem } from "./util/FindClosestElem";
import { FindNodeCoordinate } from "./util/FindNodeCoordinate";
import { FindShipCoordinates, FindShipGameSpaces, GridToOneD } from "./util/GridToOneD";
import { MouseDown } from "./util/MouseDown";

dialogSelectShips.showModal();
dialogSelectShips.style.display = "flex";

// endGameDialog.showModal();


const userGameBoard: IGameBoard = new GameBoard(10, 10);

const htmlRemoveShipCommand: ICommandHTML = new RemoveHTMLShip();
const htmlAddShipCommand: ICommandHTML = new AddHTMLShip();

const findCoord: IFindCoordinate = new FindNodeCoordinate(userGameBoard.xAxisLength);
const findElem: ITraverseHTML = new FindClosestElem();
const findIndx: IFindIndex = new GridToOneD(userGameBoard);

const findHTMLDialog: ICommandShipCoords = new FindShipGameSpaces(
    userGameBoard,
    gameSpacesDialog as HTMLDivElement[],
    findIndx,
    htmlRemoveShipCommand
);

const findHTMLUser: ICommandShipCoords = new FindShipGameSpaces(
    userGameBoard,
    userGameSpaces as HTMLDivElement[],
    findIndx,
    htmlAddShipCommand
);

const gameOverUser: ICommand = new UserWonCommand(
    endGameDialog,
    endGameHeader,
    endGameDesc
);
const gameOverComputer: ICommand = new ComputerWonCommand(
    endGameDialog,
    endGameHeader,
    endGameDesc
);



const computerGameBoard: IGameBoard = new GameBoard(userGameBoard.xAxisLength, userGameBoard.yAxisLength);
const computerFindCoords: IFindCoordinate = new FindNodeCoordinate(computerGameBoard.xAxisLength);
const computerShotAtSpaces: IRegistryCoords = new ShotAtCoordsRegistry();

const missCommand: ICommandHTML = new MissedShotHTML();
const hitCommand: ICommandHTML = new HitShotHTML();

const usersAvailableSpaces: IRegistryRemoveSpaces = new GridAvailableShots(userGameBoard);

const randomSelection: ISelection = new RandomSelection(usersAvailableSpaces);

const targetSelector: ITargetingState = new ChooseAICoordinates(
    usersAvailableSpaces,
    randomSelection
);

const shipSunkRegistry: IRegistryShips = new ShipsSunkRegistry();

const dirDetermination: IDirectionDetermination = new CoordinateDirections();
const findUsersFullShipsCoords: IFindShipsFullCoords = new FindShipCoordinates();

const userShotAtCoords: IRegistryCoords = new ShotAtCoordsRegistry();

const fireShotAI: ICommand = new FireShotAI(
    targetSelector,
    userGameBoard,
    usersAvailableSpaces,
    findIndx,
    userGameSpaces,
    hitCommand,
    missCommand,
    shipSunkRegistry,
    gameOverComputer,
    dirDetermination,
    findUsersFullShipsCoords,
    userShotAtCoords

);

const shootCommand: ICommandEvent = new ShootCommand(
    computerGameBoard,
    computerGameSpaces,
    computerFindCoords,
    computerShotAtSpaces,
    missCommand,
    hitCommand,
    fireShotAI,
    gameOverUser

);


const availableShipsComputer: IAvailableSpacesShip = new FindAvailableSpaces(computerGameBoard);

const submitCommand: ICommandEvent = new SubmitDialogBtnCommand(
    dialogSelectShips,
    userGameBoard,
    findHTMLUser,
    shootCommand,
    availableShipsComputer

)

const shipsUsedHTML: IRegistryHTML = new ShipHTMLRegistry();

const noShips: number = allShipsSelectContainer.children.length;

const refreshCommand: ICommandEvent = new ResetDialogCommand(
    refreshBtn,
    submitBtn,
    submitCommand,
    noShips,
    userGameBoard,
    shipsUsedHTML,
    findHTMLDialog

); 

const mouseDownCommand: ICommandEvent = new SelectShip(
    dialogSelectShips,
    findElem,
    rotateInstructions,

    userGameBoard,
    findCoord,

    refreshBtn,
    submitBtn,
    submitCommand,
    refreshCommand,

    shipsUsedHTML,
    noShips
);

const mouseUpCommand: ICommandEvent = new MouseFinal();
const mouseMoveCommand: ICommandEvent = new MouseMove();

const mouseDownClosure: IMouseDown = new MouseDown(
    mouseDownCommand,
    mouseMoveCommand,
    mouseUpCommand
);

allShipsDialog.forEach((shipContainer) => {
    shipContainer.addEventListener("pointerdown", mouseDownClosure.mouseDown);
});

document.addEventListener("pointerup", mouseDownClosure.mouseUp);

const findHTMLUserDelete: ICommandShipCoords = new FindShipGameSpaces(
    userGameBoard,
    userGameSpaces,
    findIndx,
    htmlRemoveShipCommand
);

const resetAll: ICommandEvent = new RestartAllCommand(
    endGameDialog,
    refreshCommand,
    targetSelector,
    findHTMLUserDelete,
    findIndx,
    userGameSpaces,
    computerShotAtSpaces,
    findIndx,
    computerGameSpaces,
    userShotAtCoords,
    shipSunkRegistry,
    availableShipsComputer,
    userGameBoard,
    computerGameBoard,
    dialogSelectShips,
    usersAvailableSpaces


);

endGameResetBtn.addEventListener("click", resetAll.execute)


// rotateInstructions.classList.add("fade-in-out");

// setTimeout(() => {
//     rotateInstructions.classList.remove("fade-in-out");
// }, 5000);







/*So you need to:
    (1) Make it so that clicking and grabbing a ship does:
        (a) Note when it is being held down so that it can fire a command
            when it stops
        (b) TURN THE OPACITY OFF FOR THE CONTAINER
        (c) ADD THE AVAILABILITY OPTIONS TO THE GRID-SPACES
        (d) IF RIGHTCLICKED THEN SPIN THE SHIP AXIS HAVING TO CHANGE
            THE AVAILABLE SPACES AGAIN
        (e) ADD A FLASHING P ELEMENT TO THE TOP SAYING TO CLICK RIGHT 
            CLICK TO ROTATE THE SHIP
        (f) ADD A COPY OF THE SHIP IMAGE TO THE END OF YOUR MOUSE
            CONTROLLING ITS MOVEMENT WITH THE MOUSE ON A LOWER OPACITY
        
        (g) ON RELEASE IF ITS ON A DATA-AVAILABLE-CELL="AVAILABLE"

*/

