import { GlobalOverlay, Highlight } from "../components";
import createCustomElement from "./customElements";
import type { HighlightRectInterface } from "./interfaces";

export class HighlightElement extends Highlight.element {
    constructor() {
        super();
    }

    setRects(rects: HighlightRectInterface[]) {
        super.rects = rects;
    }

    setContainerRect(rect: HighlightRectInterface) {
        super.containerRect = rect;
    }
}

export default function loadCustomElements() {
    createCustomElement("global-overlay", GlobalOverlay.element);
    createCustomElement("highlight", HighlightElement);
}