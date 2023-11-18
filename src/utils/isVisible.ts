export function isVisible(element: HTMLElement) {
    return !!( element.offsetWidth || element.offsetHeight || element.getClientRects().length );
}