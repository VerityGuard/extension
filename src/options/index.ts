import { Options } from "../components/unit/template";
import { storage } from "../storage";

// Options
// https://developer.chrome.com/docs/extensions/mv3/options/

function render() {
    const target = document.getElementById("app");

    if (target) {
        storage.get().then(({ count }) => {
            new Options({
                target,
                props: { count },
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", render);
