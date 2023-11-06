import { insertHighlights } from "./insertHighlight";

const RELEVANT_TAGS = new Set(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const MIN_TEXT_LENGTH = 25;

function createTreeWalker() {
    return document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node: HTMLElement) => {
                if (!RELEVANT_TAGS.has(node.tagName.toLowerCase())) {
                    return NodeFilter.FILTER_SKIP; // Skip non-relevant elements
                }
                const textContent = node.textContent?.trim();
                if (!textContent || textContent.length < MIN_TEXT_LENGTH) {
                    return NodeFilter.FILTER_REJECT;
                }
            
                // Check if the element has a parent with one of the relevant tags
                let parent = node.parentElement;
                while (parent) {
                    if (RELEVANT_TAGS.has(parent.tagName.toLowerCase())) {
                        return NodeFilter.FILTER_REJECT; // Exclude this element
                    }
                    parent = parent.parentElement;
                }
            
                return NodeFilter.FILTER_ACCEPT; // Include this element
            }
        }
    );
}

export default function scanPage() {
    const walker = createTreeWalker();
    const elements = [];

    while (walker.nextNode()) {
        elements.push(walker.currentNode);
    }

    console.log(elements);

    insertHighlights(elements as Array<HTMLElement>);

    return elements;
}