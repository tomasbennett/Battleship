import { ICommandEvent } from "../models/ICommand";
import { IMouseDown } from "../models/IMouseDown";

export class MouseDown implements IMouseDown {
    private isMouseDown: boolean;

    constructor(
        private mouseDownCommand: ICommandEvent,
        private mouseMoveCommand: ICommandEvent,
        private mouseUpCommand: ICommandEvent
    ) {
        this.isMouseDown = false;
    }

    public mouseDown: (e: Event) => void = (e: Event) => {
        if (!(e instanceof MouseEvent)) return;
        if (e.button === 0) {
            this.isMouseDown = true;
    
            this.mouseDownCommand.execute(e);
    
            window.addEventListener("pointermove", this.mouseMoveCommand.execute);

        }

    }

    public mouseUp: (e?: Event) => void = (e?: Event) => {
        if (this.isMouseDown) {
            this.mouseUpCommand.execute(e);

            this.isMouseDown = false;

            window.removeEventListener("pointermove", this.mouseMoveCommand.execute);
        }
    }


}