import Overlay from "../components/Overlay.svelte";
import { storage } from "../storage";
import createCustomElement from "../utils/createCustomElement";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then(console.log);

createCustomElement("app-overlay", Overlay.element);

// Some svelte component on the page
// new Overlay({ target: document.body });