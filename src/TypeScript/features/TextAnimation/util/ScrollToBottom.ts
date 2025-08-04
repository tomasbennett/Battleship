import { ICommand, ICommandHTML } from "../../../models/ICommand";

export class ScrollToBottom implements ICommand {
    constructor(
        private container: HTMLElement
    ) {}

    execute(): void {
        this.container.scrollTo({
            top: this.container.scrollHeight,
            behavior: "smooth"
        });
    }
}