<script lang="ts">
    import GlobalButton from "./GlobalButton.svelte";
    import GlobalSettings from "./GlobalSettings.svelte";
    import GlobalButtonWindow from "./GlobalButtonWindow.svelte";
    import GlobalSettingsWindow from "./GlobalSettingsWindow.svelte";
    import GlobalHide from "./GlobalHide.svelte";

    let hide = false;

    let active = false;
    let hoverTimer: number | undefined;
    const SETTINGS_SHOW_DELAY = 700;
    const SETTINGS_CLOSE_DELAY = 1000;
    function onGlobalButtonHover() {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            active = true;
        }, SETTINGS_SHOW_DELAY);
    }

    function onGlobalButtonLeave() {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            active = false;
        }, SETTINGS_CLOSE_DELAY);
    }

    let global_button_window_open = false;
    function toggleWindow() {
        global_button_window_open = !global_button_window_open;
        active = false;
    }

</script>

{#if !hide}
    <GlobalButtonWindow bind:open={global_button_window_open} />
    <GlobalSettingsWindow />
    <div class="global-button-wrapper" role="presentation" 
        on:mouseenter={onGlobalButtonHover} 
        on:mouseleave={onGlobalButtonLeave}
    >
        <GlobalSettings {active} />
        <!--<GlobalHide {active} bind:hide/>-->
        <GlobalButton on:click={toggleWindow} />
    </div>
{/if}

<style>
    @font-face {
        font-family: 'Inter';
        src: url("../../assets/fonts/inter/Inter-VariableFont_slnt\,wght.ttf") format("truetype");
        font-weight: 1 1000;
        font-stretch: 1 1000;
        font-style: normal;
    }  
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica Neue,sans-serif,Arial;
    }
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