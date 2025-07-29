import { dialogSelectShips } from "./components/Dialog";
import { rotateInstructions } from "./components/RotateInstructions";
import { allShipsDialog, carrierDialogContainer } from "./components/ShipsDialog";
import { ICommandEvent } from "./models/ICommand";
import { IMouseDown } from "./models/IMouseDown";
import { ITraverseHTML } from "./models/ITraverse";
import { MouseFinal, MouseMove } from "./services/MouseFollowCommand";
import { SelectShip } from "./services/SelectShipCommand";
import { FindClosestElem } from "./util/FindClosestElem";
import { MouseDown } from "./util/MouseDown";

dialogSelectShips.showModal();
dialogSelectShips.style.display = "flex";

const findElem: ITraverseHTML = new FindClosestElem();

const mouseDownCommand: ICommandEvent = new SelectShip(
    dialogSelectShips,
    findElem,
    rotateInstructions
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

