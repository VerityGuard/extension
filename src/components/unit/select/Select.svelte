<script>
    import { fade } from "svelte/transition";

    const options = [
        'hello',
        'something-there',
        'somet2here',
        'cool-model',
        'cool-model1',
    ]

    let selected = options[0];
    let focused = false;

    /** @type {HTMLSpanElement} */
    let selectedEl;

    function onSelectedBlur(/** @type {FocusEvent} */ event) {
        if (event.relatedTarget && event.relatedTarget.classList.contains('select-item-option')) {
            event.preventDefault();
        }
        else {
            const value = selectedEl.textContent;
            if (!value || !options.includes(value)) {
                selectedEl.textContent = selected;
            }
            else {
                selected = value;
            }
            focused = false;
        }
    }

    function onSelectedFocus() {
        selectedEl.textContent = '';
        focused = true;
    }

    function onOptionClick(/** @type {string} */ option) {
        focused = false;
        if (!option || !options.includes(option)) {
            return;
        }
        selected = option;
        selectedEl.textContent = option;
    }
</script>

<div class="select-container">
    <button class="select">
        <span bind:this={selectedEl} on:blur={onSelectedBlur} on:focus|preventDefault|stopPropagation={onSelectedFocus} class="title" contenteditable="true">{selected}</span>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9207 15L15.5 17.2562L17.0793 15H13.9207Z" stroke="#6D758D" stroke-width="2"></path>
        </svg>
    </button>
    {#if focused}
        <div class="select-item-option-container" transition:fade={{ duration: 100 }}>
            {#each options as option}
                <button on:click={() => onOptionClick(option)} class="select-item-option">
                    <span>{option}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .select-container {
        position: relative;
    }
    .select {
        background: #F0F2FC;
        border-radius: 4px;
        border: 0;
        outline: none;
        user-select: none;
        display: inline-flex;
        justify-content: space-between;
        overflow: hidden;
        padding: 0 0 0 8px;
        font-size: 14px;
        line-height: 32px;
        width: 192px;
        cursor: pointer;
    }
    .select:focus, .select:active {
        background: #dbebff;
    }
    .title {
        color: #0e101a;
        font-weight: 700;
        flex: 1;
        text-align: start;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .title[contenteditable="true"]:focus {
        outline: none;
        border: none;
    }
    .select-item-option-container {
        position: absolute;
        bottom: 100%;
        left: 0;
        max-height: 144px;
        max-width: 100%;
        overflow: auto;
        min-width: 100%;
        background: #FFF;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        margin: 6px 0;
        padding: 8px 0;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 12px rgb(0 0 0 / 15%);
    }
    .select-item-option {
        text-align: start;
        padding: 0 8px;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        overflow-x: clip;
        text-overflow: ellipsis;
        white-space: nowrap;
        outline: none;
        border: none;
        background: none;
    }
    .select-item-option:hover {
        background: #f0f2fc;
    }
</style>   