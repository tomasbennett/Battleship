import { GameBoard } from "./GameBoard";
import { dialogSelectShips, refreshBtn, submitBtn } from "./components/Dialog";
import { userGameSpaces } from "./components/GameBoardMain";
import { gameSpacesDialog } from "./components/GameSpacesDialog";
import { rotateInstructions } from "./components/RotateInstructions";
import { allShipsDialog, allShipsSelectContainer, carrierDialogContainer } from "./components/ShipsDialog";
import { ICommandEvent, ICommandHTML, ICommandShipCoords } from "./models/ICommand";
import { IFindCoordinate, IFindIndex } from "./models/IFindCoordinate";
import { IGameBoard } from "./models/IGameBoard";
import { IMouseDown } from "./models/IMouseDown";
import { IRegistryHTML } from "./models/IRegistry";
import { ITraverseHTML } from "./models/ITraverse";
import { ResetDialogBtnCommand, SubmitDialogBtnCommand } from "./services/BoardBtnCommands";
import { MouseFinal, MouseMove } from "./services/MouseFollowCommand";
import { AddHTMLShip, RemoveHTMLShip } from "./services/RemoveShipFromBoard";
import { SelectShip } from "./services/SelectShipCommand";
import { ShipHTMLRegistry } from "./services/ShipHTMLRegistry";
import { FindClosestElem } from "./util/FindClosestElem";
import { FindNodeCoordinate } from "./util/FindNodeCoordinate";
import { FindShipGameSpaces, GridToOneD } from "./util/GridToOneD";
import { MouseDown } from "./util/MouseDown";

dialogSelectShips.showModal();
dialogSelectShips.style.display = "flex";


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






const submitCommand: ICommandEvent = new SubmitDialogBtnCommand(
    dialogSelectShips,
    userGameBoard,
    findHTMLUser
);

const shipsUsedHTML: IRegistryHTML = new ShipHTMLRegistry();

const noShips: number = allShipsSelectContainer.children.length;

const refreshCommand: ICommandEvent = new ResetDialogBtnCommand(
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

