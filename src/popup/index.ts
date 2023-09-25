import { Popup } from "../components/";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
    const target = document.getElementsByClassName("popup")[0];

    if (target) {
        new Popup({ target });
    }
}

document.addEventListener("DOMContentLoaded", render);
