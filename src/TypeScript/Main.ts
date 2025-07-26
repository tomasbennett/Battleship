import { dialogSelectShips } from "./components/DialogSelectShips";
import { carrierDialogContainer } from "./components/Ships";
import { ICommandEvent } from "./models/ICommand";
import { IMouseDown } from "./models/IMouseDown";
import { MouseFinal, MouseFollow } from "./services/MouseFollowCommand";
import { MouseDown } from "./util/MouseDown";

dialogSelectShips.showModal();
dialogSelectShips.style.display = "flex";


const mouseDownCommand: ICommandEvent = new MouseFollow();
const mouseUpCommand: ICommandEvent = new MouseFinal();

const mouseDownClosure: IMouseDown = new MouseDown(
    mouseDownCommand,
    mouseUpCommand
);

carrierDialogContainer.addEventListener("mousedown", mouseDownClosure.mouseDown);
document.addEventListener("mouseup", mouseDownClosure.mouseUp);


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

