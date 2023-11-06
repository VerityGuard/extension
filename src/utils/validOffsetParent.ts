export default function validOffsetParent(element: HTMLElement) {
    const offsetParent = element.offsetParent;

    if (!offsetParent || (offsetParent === document.body && getComputedStyle(offsetParent).position === 'static')) {
      return null;
    }
  
    return offsetParent;
}