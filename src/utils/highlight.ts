import { createElement } from "./customElements";
import type { HighlightRectInterface } from "./interfaces";
import validOffsetParent from "./validOffsetParent";

'use strict';

const MIN_ELEMENTS_UNTIL_DELAY = 100;
const highlightElementMap = new Map<HTMLElement, HTMLElement>();

function throttle<T extends (...args: any[]) => void>(f: T, delay: number) {
    let timer: number = 0;
    return function(this: any, ...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => f.apply(this, args), delay);
    };
}
  
export function adaptableResizeObserver() {
    const observedElementsCount = highlightElementMap.size;
    const delay = observedElementsCount > MIN_ELEMENTS_UNTIL_DELAY ? Math.round(Math.sqrt(observedElementsCount) * 4) : 0;
    return new ResizeObserver(throttle((entries) => {
        entries.forEach((entry: Event) => {
            const element = entry.target as HTMLElement;
            updateHighlight(element);
        });
    }, delay));
}

export function observeResize() {
    const resizeObserver = adaptableResizeObserver();
    for (const element of highlightElementMap.keys()) {
        resizeObserver.observe(element);
    }
}

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
    } as HighlightRectInterface;
}

function mergeRectangles(rectangles: DOMRectList | DOMRect[], offsetParent: HTMLElement | null) {
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

export function updateHighlight(element: HTMLElement) {
    const associatedHighlight = highlightElementMap.get(element);
    const rects = highlightRectangles(element);

    if (rects.length === 0) {
        if (associatedHighlight) {
            associatedHighlight.remove();
            highlightElementMap.delete(element);
        }
        return; // No need to proceed if there are no rectangles to highlight.
    }

    const offsetParent = validOffsetParent(element) as HTMLElement | null;
    const containerRect = adjustedRectangle(element.getBoundingClientRect(), offsetParent?.getBoundingClientRect() || null);
    const mergedRects = mergeRectangles(rects, element);

    if (associatedHighlight) {
        // Update existing highlight
        associatedHighlight.setContainerRect(containerRect);
        associatedHighlight.setRects(mergedRects);
    } else {
        // Create and insert a new highlight
        const highlightElement = createElement('highlight', true);
        highlightElement.setContainerRect(containerRect);
        highlightElement.setRects(mergedRects);
        (offsetParent || document.body).appendChild(highlightElement);
        highlightElementMap.set(element, highlightElement);
    }
}

export async function updateHighlightsAsync(elements: HTMLElement[]) {
    for (const element of elements) {
        await updateHighlightAsync(element);
    }
}

export function exportHighlights(elements: HTMLElement[]) {
    elements.forEach((element) => {
        updateHighlight(element);
    });
}

function highlightRectangles(element: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const rects = range.getClientRects();
    return rects;
}

async function updateHighlightAsync(element: HTMLElement) {
    return new Promise<void>((resolve) => {
        updateHighlight(element);
        requestAnimationFrame(() => {
            // Code to run after rendering is complete
            console.log("Rendering is complete, and highlight element is visible now.");
            resolve();
        });
    });
}