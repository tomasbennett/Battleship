import { ICommandHTML } from "../../../models/ICommand";
import { IFindIndex } from "../../../models/IFindCoordinate";

abstract class ShotHTML implements ICommandHTML {
    protected abstract classValue: string;

    constructor() {}

    execute(e: HTMLElement): void {
        const SVG_NS: string = "http://www.w3.org/2000/svg";
        const svg: SVGSVGElement = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;

        svg.setAttribute("viewBox", "0 0 100 100");

        const circle: SVGCircleElement = document.createElementNS(SVG_NS, "circle") as SVGCircleElement;

        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "40");
        circle.classList.add(this.classValue);

        svg.appendChild(circle);

        e.appendChild(svg);
    }
}

export class MissedShotHTML extends ShotHTML {
    protected classValue: string;

    constructor() {
        super();
        this.classValue = "miss";
    }
}

export class HitShotHTML extends ShotHTML {
    protected classValue: string;

    constructor() {
        super();
        this.classValue = "hit";
    }
}
