import { storage } from "../storage";
import { insertElement } from "../utils/customElements";
import loadCustomElements from "../utils/loadCustomElements";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then(console.log);

loadCustomElements();

insertElement("global-overlay", document.documentElement, true);

// Some svelte component on the page
// new Overlay({ target: document.body });