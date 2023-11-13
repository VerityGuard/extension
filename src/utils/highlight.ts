import { createElement } from "./customElements";
import { adaptableIntersectionObserver, adaptableResizeObserver } from "./detectChanges";
import type { HighlightRectInterface } from "./interfaces";
import validOffsetParent from "./validOffsetParent";

const highlightElementMap = new Map<HTMLElement, HTMLElement>();
const observedElements = new WeakSet();

const resizeObserver = adaptableResizeObserver(handleResize, 0);
const intersectionObserver = adaptableIntersectionObserver({root: null, threshold: 0}, handleIntersection, 0);

function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
            observeResize(element);
        } else {
            removeHighlight(element);
            unobserveResize(element);
        }
    });
}

function handleResize(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        updateHighlight(element);
    });
}

function observeResize(element: HTMLElement) {
    if (!observedElements.has(element)) {
        resizeObserver.observe(element);
        observedElements.add(element);
    }
}

function removeHighlight(element: HTMLElement) {
    const associatedHighlight = highlightElementMap.get(element);
    if (associatedHighlight) {
        associatedHighlight.remove();
        highlightElementMap.delete(element);
    }
}

function unobserveResize(element: HTMLElement) {
    if (observedElements.has(element)) {
        resizeObserver.unobserve(element);
        observedElements.delete(element);
    }
}

export function observeIntersection() {
    for (const element of highlightElementMap.keys()) {
        intersectionObserver.observe(element);
    }
}

/* HIGHLIGHT FUNCTIONS */

export function updateHighlight(element: HTMLElement) {
    const associatedHighlight = highlightElementMap.get(element);
    const rects = highlightRectangles(element);

    if (rects.length === 0) {
        if (associatedHighlight) {
            associatedHighlight.remove();
            highlightElementMap.delete(element);
        }
        return;
    }

    const offsetParent = validOffsetParent(element) as HTMLElement | null;
    const containerRect = {
        top: element.offsetTop,
        left: element.offsetLeft,
        width: element.offsetWidth,
        height: element.offsetHeight
    } as HighlightRectInterface;

    const mergedRects = mergeRectangles(rects, element);

    if (associatedHighlight) {
        associatedHighlight.setContainerRect(containerRect);
        associatedHighlight.setRects(mergedRects);
    } else {
        const highlightElement = createElement('highlight', true);
        highlightElement.setContainerRect(containerRect);
        highlightElement.setRects(mergedRects);
        (offsetParent || document.body).appendChild(highlightElement);
        highlightElementMap.set(element, highlightElement);
    }
    intersectionObserver.observe(element);
}

export async function updateHighlightsAsync(elements: HTMLElement[]) {
    for (const element of elements) {
        await updateHighlightAsync(element);
    }
}

async function updateHighlightAsync(element: HTMLElement) {
    return new Promise<void>((resolve) => {
        updateHighlight(element);
        requestAnimationFrame(() => {
            resolve();
        });
    });
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