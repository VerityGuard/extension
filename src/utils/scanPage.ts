import { observeIntersection, updateHighlightsAsync } from "./highlight";
import type { TextResultInterface } from "./interfaces";

const RELEVANT_TAGS = new Set(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const MIN_TEXT_LENGTH = 100;

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

function findRelevantElements(root: HTMLElement) {
    const relevantElements: HTMLElement[] = [];
  
    if (!root) return relevantElements;
  
    const queue: HTMLElement[] = [root];
  
    while (queue.length > 0) {
      const currentElement = queue.shift() as HTMLElement;
  
      if (RELEVANT_TAGS.has(currentElement.tagName.toLowerCase()) && currentElement.textContent && currentElement.textContent.length >= MIN_TEXT_LENGTH) {
        relevantElements.push(currentElement);
        continue;
      }
  
      for (const child of currentElement.children) {
        queue.push(child as HTMLElement);
      }
    }
  
    return relevantElements;
}

function findRelevantElements2(root: HTMLElement) {
    const elements = root.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    return Array.from(elements).filter((element: Element) => {
        const textContent = element.textContent?.trim();
        if (!textContent || textContent.length < MIN_TEXT_LENGTH) {
            return false;
        }
    
        let parent = element.parentElement;
        while (parent) {
            if (RELEVANT_TAGS.has(parent.tagName.toLowerCase())) {
                return false;
            }
            parent = parent.parentElement;
        }
    
        return true;
    });
}

export default async function scanPage() {
    let startTime = new Date();
    const elements = findRelevantElements2(document.body) as HTMLElement[];
    let endTime = new Date();
    let timeElapsed = endTime - startTime;
    console.log(`Time elapsed: ${timeElapsed}ms`);
    console.log(elements);

    await updateHighlightsAsync(elements);

    let results: TextResultInterface[] = [];
    for (const element of elements) {
        results.push(
            { 
                element: element, 
                score: Math.random() 
            }
        );
    }

    return results;
}