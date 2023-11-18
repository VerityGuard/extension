<script lang="ts">
    import GlobalButton from "./GlobalButton.svelte";
    import GlobalSettings from "./GlobalSettings.svelte";
    import GlobalButtonWindow from "./GlobalButtonWindow.svelte";
    import GlobalSettingsWindow from "./GlobalSettingsWindow.svelte";
    import GlobalHide from "./GlobalHide.svelte";
    import scanPage from "../../utils/scanPage";
    import type { TextResultInterface } from "../../utils/interfaces";

    let hide = false;

    let active = false;
    let hoverTimer: number | undefined;

    const SETTINGS_SHOW_DELAY = 700;
    const SETTINGS_CLOSE_DELAY = 1000;
    
    function onGlobalButtonHover() {
        if (!defaultState) {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                active = true;
            }, SETTINGS_SHOW_DELAY);
        }
    }

    function onGlobalButtonLeave() {
        if (!defaultState) {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                active = false;
            }, SETTINGS_CLOSE_DELAY);
        }
    }

    let results: Promise<TextResultInterface[]>;

    let globalButtonWindowOpen = false;
    
    async function toggleGlobalButtonWindow() {
        globalButtonWindowOpen = !globalButtonWindowOpen;
        active = false;

        if (!results) {
            results = scanPage();
            console.log("Page scanned");
        }
    }

    let GlobalSettingsWindowOpen = false;
    function toggleGlobalSettingsWindow() {
        GlobalSettingsWindowOpen = !GlobalSettingsWindowOpen;
        active = false;
    }

    let defaultState = globalButtonWindowOpen || GlobalSettingsWindowOpen;
</script>

{#if !hide}
    <GlobalButtonWindow bind:open={globalButtonWindowOpen} {results} />
    <GlobalSettingsWindow bind:open={GlobalSettingsWindowOpen} />
    <div class="global-button-wrapper" role="presentation" 
        on:mouseenter={onGlobalButtonHover} 
        on:mouseleave={onGlobalButtonLeave}
    >
        <!--<GlobalSettings {active} on:click={toggleGlobalSettingsWindow} />-->
        <GlobalHide {active} bind:hide/>
        <GlobalButton on:click={toggleGlobalButtonWindow} />
    </div>
{/if}

<style>
    .global-button-wrapper {
        position: fixed;
        right: 32px;
        bottom: 32px;
        z-index: 9999;
        display: inline-flex;
        user-select: none;
        align-items: center;
    }
</style>