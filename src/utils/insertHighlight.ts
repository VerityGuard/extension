import { createElement } from "./customElements";
import type { HighlightRectInterface } from "./interfaces";
import validOffsetParent from "./validOffsetParent";

function adjustedRectangle(rect: DOMRect, offsetParentRect: DOMRect | null) {
    const top = offsetParentRect ? rect.top - offsetParentRect.top : rect.top;
    const right = offsetParentRect ? rect.right - offsetParentRect.left : rect.right;
    const bottom = offsetParentRect ? rect.bottom - offsetParentRect.top : rect.bottom;
    const left = offsetParentRect ? rect.left - offsetParentRect.left : rect.left;
    
    return {
        top,
        right,
        bottom,
        left,
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
    };
}

function mergeRectangles(rectangles: DOMRectList, offsetParent: HTMLElement | null) {
    const offsetParentRect = offsetParent? offsetParent.getBoundingClientRect() : null;
    const mergedRectangles: HighlightRectInterface[] = [];
    
    let currentRect = adjustedRectangle(rectangles[0], offsetParentRect);

    for (let i = 1; i < rectangles.length; i++) {
        const rect = adjustedRectangle(rectangles[i], offsetParentRect);

        if (rect === currentRect) continue;

        if (
            rect.top <= currentRect.bottom &&
            rect.bottom >= currentRect.top
        ) {
            currentRect.top = Math.min(currentRect.top, rect.top);
            currentRect.right = Math.max(currentRect.right, rect.right);
            currentRect.bottom = Math.max(currentRect.bottom, rect.bottom);
            currentRect.left = Math.min(currentRect.left, rect.left);
            currentRect.x = currentRect.left;
            currentRect.y = currentRect.top;
            currentRect.width = currentRect.right - currentRect.left;
            currentRect.height = currentRect.bottom - currentRect.top;
            continue;
        }
        else {
            mergedRectangles.push(currentRect);
            currentRect = rect;
        }
    }

    mergedRectangles.push(currentRect);

    return mergedRectangles;
}

export default function insertHighlight(element: HTMLElement) {
    const offsetParent = validOffsetParent(element) as HTMLElement | null;
    const containerRect = element.getBoundingClientRect() as HighlightRectInterface;

    const highlightElement = createElement('highlight', true);

    const rects = highlightRectangles(element);

    const mergedRects = mergeRectangles(rects, offsetParent);

    highlightElement.setContainerRect(containerRect);
    highlightElement.setRects(rects);

    (offsetParent || document.body).appendChild(highlightElement);
}

export function insertHighlights(elements: HTMLElement[]) {
    elements.forEach(insertHighlight);
}

function highlightRectangles(element: HTMLElement) {

    const range = document.createRange();
    range.setStart(element, 0);
    range.setEnd(element, 1);
    const rects = Array.from(range.getClientRects());
    
    for (let child of element.children) {
      rects.push(...highlightRectangles(child as HTMLElement))
    }

    console.log(rects);
  
    return rects;
  }
  