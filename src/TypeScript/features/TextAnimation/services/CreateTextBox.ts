import { ICommand, ICommandMessage } from "../../../models/ICommand";
import { IRegistryHTML } from "../../../models/IRegistry";
import { IPlayerType } from "../models/IPlayerType";

abstract class CreateInfoBox implements ICommandMessage {
    protected abstract player: IPlayerType;

    constructor(
        private asideContainer: HTMLElement,
        private infoBoxRegistry: IRegistryHTML,
        private scrollBehaviour: ICommand
    ) {}
    
    
    execute(message: string): void {
        const infoContainer: HTMLDivElement = document.createElement("div");
        infoContainer.classList.add("info-container");
        
        const playerHTMLID: HTMLParagraphElement = document.createElement("p");
        playerHTMLID.classList.add("command-player");
        playerHTMLID.setAttribute("data-animate-entry", "invisible");
        playerHTMLID.textContent = this.player + ":";

        const commandDesc: HTMLParagraphElement = document.createElement("p");
        commandDesc.classList.add("command-desc");
        commandDesc.setAttribute("data-animate-entry", "invisible");
        commandDesc.textContent = message;

        this.infoBoxRegistry.addNew(infoContainer);

        infoContainer.appendChild(playerHTMLID);
        infoContainer.appendChild(commandDesc);
        this.asideContainer.appendChild(infoContainer);

        this.scrollBehaviour.execute();

        infoContainer.addEventListener("animationend", (e: Event) => {
            infoContainer.classList.add(this.player === "User" ? "user-info" : "computer-info");
            playerHTMLID.setAttribute("data-animate-entry", "fully-visible");
            commandDesc.setAttribute("data-animate-entry", "visible");
        }, { once: true });
        //May need to move this to a single text given at a time and have the text box grow in height little by little
    }
}


export class CreateUserInfoBox extends CreateInfoBox {
    protected player: IPlayerType;

    constructor(
        asideContainer: HTMLElement,
        infoBoxRegistry: IRegistryHTML,
        scrollCommand: ICommand
    ) {
        super(asideContainer, infoBoxRegistry, scrollCommand);
        this.player = "User";
    }
}


export class CreateComputerInfoBox extends CreateInfoBox {
    protected player: IPlayerType;

    constructor(
        asideContainer: HTMLElement, 
        infoBoxRegistry: IRegistryHTML,
        scrollCommand: ICommand
    ) {
        super(asideContainer, infoBoxRegistry, scrollCommand);
        this.player = "Computer";
    }
}