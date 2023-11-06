import getManifest from "./getManifest";

export default function createCustomElement(tag: string, element: CustomElementConstructor) {
    tag = customName(tag);
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, element);
        return tag;
    }
}

interface Attributes {
    [key: string]: any;
}

function setAttributes(element: HTMLElement, attributes: Attributes) {
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}

export function insertElement(tag: string, target: HTMLElement = document.documentElement, custom: boolean = false, attributes: Attributes = {}) { 
    const element = createElement(tag, custom, attributes);
    target.appendChild(element);
    return element;
}

export function insertCreatedElement(element: HTMLElement, target: HTMLElement = document.documentElement) {
    target.appendChild(element);
    return element;
}

export function createElement(tag: string, custom: boolean = false, attributes: Attributes = {}) {
    const element = custom ? document.createElement(customName(tag)) : document.createElement(tag);
    setAttributes(element, attributes);
    return element;
}

export function customName(tag: string) {
    return `${getManifest().name}-${tag}`;
}