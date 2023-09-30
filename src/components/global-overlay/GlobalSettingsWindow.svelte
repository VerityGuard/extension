<script lang="ts">
    export let open = false;
</script>

{#if open}
    <div class="global-settings-window-wrapper">
        <small class="global-settings-window-header">
            Hide Scan page button for www.youtube.com
        </small>
        <button class="global-settings-windoow-options">
            Yes, for now
        </button>
        <button class="global-settings-windoow-options">
            Yes, always
        </button>
    </div>
{/if}

<style>
    .global-settings-window-wrapper {
        background: #FFFFFF;
        border-radius: 8px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .05), 0 2px 12px rgba(0, 0, 0, .15);
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        opacity: 1;
        padding: 8px 0;
        position: absolute;
        transition: opacity .2s;
        z-index: 9999;
        right: 0px;
        top: 0;
        margin-bottom: -1px;
        max-width: 200px;
    }
    .global-settings-window-header {
        margin: 0 0 2px 16px;
        color: #6d758d;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
    }
    .global-settings-windoow-options {
        margin: 0;
        padding: 0 16px 0 16px;
        align-items: center;
        background-color: transparent;
        border: 0;
        color: #0E101A;
        cursor: pointer;
        display: inline-flex;
        font-size: 14px;
        font-weight: normal;
        line-height: 32px;
        min-height: 32px;
        outline: none;
        overflow: hidden;
        position: relative;
        text-align: left;
        user-select: none;
        vertical-align: middle;
        white-space: nowrap;
    }
    .global-settings-windoow-options:hover {
        background-color: #F0F2FC;
        color: #2551da;
    }
</style>