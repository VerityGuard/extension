interface Alert {
    readonly startOffset: number;
    readonly endOffset: number;
    readonly id: string;
}

interface Highlight {
    readonly top: number;
    readonly left: number;
    readonly width: number;
    readonly height: number;
    readonly id: number;
}

class Highlighter {
    constructor(
      ) {}

      private _ranges: { [k: string]: Range } = {};

      public updateHighlights() {

      }
}

const relevantTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'];
const allowedChildTags = ['strong', 'b', 'i', 's', 'u', 'sup', 'sub'];

function hasOnlyAllowedChildren(element: HTMLElement) {
    return Array.from(element.children).every(child => allowedChildTags.includes(child.tagName.toLowerCase()));
}

function queryElements(relevantTags: string[]) {
    const relevantElements = Array<HTMLElement>();

    relevantTags.forEach((tag: string) => {
        const elements = document.getElementsByTagName(tag) as HTMLCollectionOf<HTMLElement>;
        Array.from(elements).forEach((element: HTMLElement) => {
            if (element.children.length === 0 || hasOnlyAllowedChildren(element)) {
                relevantElements.push(element);
            }
        });
    });

    return relevantElements;
}

function scanPage() {
    const relevantTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']

    // query elements above that do not have an ancestor in the list



    document.querySelectorAll(relevantTags.join(',')).forEach((element) => {
        const highlighter = new Highlighter()

        const range = document.createRange();
        range.selectNodeContents(element);
        
        Highlighter._nodes.push(element);
    })

}