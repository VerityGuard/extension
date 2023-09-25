<script lang="ts">
    export let active = false;
    export let hide = false;

    function onHideClick() {
        hide = true;
    }
</script>

<button class:active={active} class="global-hide" on:click|stopPropagation|preventDefault={onHideClick}>
    <svg class="global-hide-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <rect width="10" height="1.5" x="3" y="7.25" fill="#FFF" rx=".75"></rect>
    </svg>
</button>

<style>
    .global-hide {
        position: absolute;
        top: -1px;
        right: -1px;
        opacity: 0;
        user-select: none;
        cursor: pointer;
        height: 18px;
        width: 18px;
        background-color: #8d0d0d;
        border: 0.5px solid rgba(0,0,0,.1);
        border-radius: 50%;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
        display: flex;
        justify-content: center;
        align-items: center;
        transition-property: opacity;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        z-index: 9999;
    }
    .global-hide.active {
        opacity: 1;
    }
    .global-hide-icon {
        position: absolute;
    }
</style>