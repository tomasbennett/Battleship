import { ICommand } from "../models/ICommand";
import { ITraverseHTML } from "../models/ITraverse";

export class FindClosestElem implements ITraverseHTML {
    constructor() {}

    search(startNode: HTMLElement, value: string): HTMLElement | null {
        if (startNode.matches(value)) {
            return startNode;
        }
    
        const descendantMatch = startNode.querySelector(value);
        if (descendantMatch !== null) {
            return descendantMatch as HTMLElement;
        }
    
        const ancestorMatch = startNode.closest(value);
        if (ancestorMatch !== null) {
            return ancestorMatch as HTMLElement;
        }

        return null;
    }

}