function throttle<T extends (...args: any[]) => void>(f: T, delay: number) {
    let timer: number = 0;
    return function(this: any, ...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => f.apply(this, args), delay);
    };
}

export function adaptableResizeObserver(callback: ResizeObserverCallback, delay: number = 0) {
    // const delay = observedElementsCount > MIN_ELEMENTS_UNTIL_DELAY ? Math.round(Math.sqrt(observedElementsCount) * 4) : 0;
    return new ResizeObserver(throttle(callback, delay));
}

export function adaptableIntersectionObserver(options: IntersectionObserverInit | undefined, callback: IntersectionObserverCallback, delay: number = 0) {
    return new IntersectionObserver(throttle(callback, delay), options);
}