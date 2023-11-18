<script lang="ts">
    import { fly } from "svelte/transition";
    import LoaderRing from "../unit/loaders/LoaderRing.svelte";
    import GlobalTextResults from "../global-results/GlobalTextResults.svelte";
    import type { TextResultInterface } from "../../utils/interfaces";

    export let open = false;
    export let results: Promise<TextResultInterface[]>;

    let icon = chrome.runtime.getURL('src/assets/icons/icon-32.png');

    function onCloseClick() {
        open = false;
    }

    function onSettingsClick() {

    }
</script>

{#if open}
    <div class="global-button-window-wrapper" transition:fly={{y: 10, duration: 200}}>
        <div class="global-button-window-header">
            <div class="global-button-window-header-icon" style="background-image: url({icon});">&nbsp;</div>
            <div class="global-button-window-header-tabs">
                <button class="global-button-window-header-tab global-button-window-header-settings" on:click={onSettingsClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <path fill="#6D758D" d="M11.143 6v-.5a.5.5 0 0 0-.5.5h.5Zm1.714 0h.5a.5.5 0 0 0-.5-.5V6Zm2.857 1.143.354-.354a.5.5 0 0 0-.707 0l.353.354Zm1.143 1.143.354.353a.5.5 0 0 0 0-.707l-.354.354ZM18 11.143h.5a.5.5 0 0 0-.5-.5v.5Zm0 1.714v.5a.5.5 0 0 0 .5-.5H18Zm-1.143 2.857.354.354a.5.5 0 0 0 0-.707l-.354.353Zm-1.143 1.143-.353.354a.5.5 0 0 0 .707 0l-.354-.354ZM12.857 18v.5a.5.5 0 0 0 .5-.5h-.5Zm-1.714 0h-.5a.5.5 0 0 0 .5.5V18Zm-2.857-1.143-.354.354a.5.5 0 0 0 .707 0l-.353-.354Zm-1.143-1.143-.354-.353a.5.5 0 0 0 0 .707l.354-.354ZM6 12.857h-.5a.5.5 0 0 0 .5.5v-.5Zm0-1.714v-.5a.5.5 0 0 0-.5.5H6Zm1.143-2.857-.354-.354a.5.5 0 0 0 0 .707l.354-.353Zm1.143-1.143.353-.354a.5.5 0 0 0-.707 0l.354.354Zm.296 9.418-.353-.354.353.354ZM11.142 6.5h1.715v-1h-1.714v1Zm1.215-.5v.379h1V6h-1Zm3.414 1.793.297-.297-.707-.707-.297.297.707.707Zm-.41-.297 1.143 1.143.707-.707-1.143-1.143-.707.707Zm1.143.436-.297.297.707.707.297-.297-.707-.707Zm1.117 3.71H18v-1h-.379v1Zm-.121-.5v1.715h1v-1.714h-1Zm.5 1.215h-.379v1H18v-1Zm-1.793 3.414.297.297.707-.707-.297-.297-.707.707Zm.297-.41-1.143 1.143.707.707 1.143-1.143-.707-.707Zm-.436 1.143-.297-.297-.707.707.297.297.707-.707Zm-3.71 1.117V18h1v-.379h-1Zm.5-.121h-1.715v1h1.714v-1Zm-1.215.5v-.379h-1V18h1Zm-3.414-1.793-.297.297.707.707.297-.297-.707-.707Zm.41.297L7.496 15.36l-.707.707 1.143 1.143.707-.707Zm-1.143-.436.297-.297-.707-.707-.297.297.707.707Zm-1.117-3.71H6v1h.379v-1Zm.121.5v-1.715h-1v1.714h1ZM6 11.642h.379v-1H6v1Zm1.793-3.414-.297-.297-.707.707.297.297.707-.707Zm-.297.41L8.64 7.496l-.707-.707L6.79 7.932l.707.707Zm.436-1.143.297.297.707-.707-.297-.297-.707.707Zm3.71-1.117V6h-1v.379h1ZM14.787 12A2.786 2.786 0 0 0 12 9.214v1c.986 0 1.786.8 1.786 1.786h1ZM12 14.786A2.786 2.786 0 0 0 14.786 12h-1c0 .986-.8 1.786-1.786 1.786v1ZM8.229 7.793c1.26 1.26 3.414.367 3.414-1.414h-1c0 .89-1.077 1.337-1.707.707l-.707.707Zm-1.85 3.85c1.781 0 2.674-2.154 1.414-3.414l-.707.707c.63.63.184 1.707-.707 1.707v1Zm1.414 4.128c1.26-1.26.367-3.414-1.414-3.414v1c.89 0 1.337 1.077.707 1.707l.707.707Zm4.564-9.392c0 1.781 2.154 2.674 3.414 1.414l-.707-.707c-.63.63-1.707.184-1.707-.707h-1ZM9.214 12A2.786 2.786 0 0 0 12 14.786v-1c-.986 0-1.786-.8-1.786-1.786h-1Zm2.429 5.621c0-1.781-2.154-2.674-3.414-1.414l.707.707c.63-.63 1.707-.184 1.707.707h1Zm4.128-1.414c-1.26-1.26-3.414-.368-3.414 1.414h1c0-.89 1.077-1.337 1.707-.707l.707-.707Zm1.85-3.85c-1.781 0-2.674 2.154-1.414 3.414l.707-.707c-.63-.63-.184-1.707.707-1.707v-1ZM16.207 8.23c-1.26 1.26-.368 3.414 1.414 3.414v-1c-.89 0-1.337-1.077-.707-1.707l-.707-.707ZM10.214 12c0-.986.8-1.786 1.786-1.786v-1A2.786 2.786 0 0 0 9.214 12h1Z"/>
                    </svg>
                </button>
                <button class="global-button-window-header-tab global-button-window-header-close" on:click={onCloseClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
                        <path stroke="#6D758D" stroke-linecap="round" d="m12 12 4 4m4 4-4-4m0 0 4-4m-4 4-4 4"/>
                    </svg>
                </button>
            </div>
        </div>
        {#await results}
            <div class="global-button-window-loading">
                <LoaderRing />
            </div>
        {:then results}

            <div class="global-button-window-content">
                <div class="global-button-window-content-results">
                    {#each results as result}
                        <GlobalTextResults element={result.element} score={result.score} />
                    {/each}
                </div>
            </div>
                
        {:catch error}
                
            <p>{error.message}</p>
                
        {/await}
    </div>
{/if}

<style>
    .global-button-window-wrapper {
        position: fixed;
        right: 32px;
        bottom: 32px;
        z-index: 10000;
        width: 480px;
        min-width: 480px;
        max-width: calc(100vw - 34px);
        background: #fff;
        box-shadow: 0 0 0.5px rgb(0 0 0 / 70%), 0 2px 8px rgb(26 33 52 / 20%);
        border-radius: 8px;
    }
    .global-button-window-header {
        position: relative;
        width: 100%;
        height: 40px;
        background: #f9faff;
        border-bottom: 1px solid #f0f2fc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #6d758d;
        border-radius: 8px 8px 0 0;
    }
    .global-button-window-header-icon {
        margin-left: 14px;
        width: 32px;
        height: 32px;
        background-position: 50%;
        background-size: 24px 24px;
        background-repeat: no-repeat;
    }
    .global-button-window-header-tabs {
        display: flex;
        align-items: center;
        margin-right: 4px;
    }
    .global-button-window-header-tab:active {
        background: #c6cbde;
    }
    .global-button-window-header-tab:hover {
        background-color: #e7e9f5;
    }
    .global-button-window-header-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        margin: 0;
        background-color: transparent;
        transition: background-color .15s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
        box-shadow: none;
        user-select: none;
        border: none;
        border-radius: 4px;
    }
    .global-button-window-loading {
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .global-button-window-content-results {
        display: grid;
        padding: 12px;
        gap: 12px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        flex-direction: column;
    }
    .global-button-window-content {
        height: 320px;
        display: flex;
        flex-direction: row;
    }
</style>