import getManifest from "./getManifest";

export default function createCustomElement(tag_extension: string, element: CustomElementConstructor, target = document.documentElement) {
    const tag = `${getManifest().name}-${tag_extension}`;
    customElements.define(tag, element);
    const newElement = document.createElement(tag);
    target.appendChild(newElement);
}