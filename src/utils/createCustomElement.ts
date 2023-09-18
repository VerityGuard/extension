export default function createCustomElement(tag: string, element: CustomElementConstructor, target = document.documentElement) {
    customElements.define(tag, element);
    const newElement = document.createElement(tag);
    target.appendChild(newElement);
}