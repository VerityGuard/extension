export default function cssVariables(node: HTMLSpanElement, variables: { [x: string]: any; }) {
    setCssVariables(node, variables);
    
    return {
        update(variables: any) {
            setCssVariables(node, variables);
        }
    }
}
function setCssVariables(node: HTMLSpanElement, variables: { [x: string]: any; }) {
    for (const name in variables) {
        node.style.setProperty(`--${name}`, variables[name]);
    }
}