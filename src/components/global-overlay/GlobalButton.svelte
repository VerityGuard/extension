<script lang="ts">
    let icon = chrome.runtime.getURL('src/assets/icons/icon-32.png');
</script>

<button class="global-button" on:click>
    <div class="global-button-icon" style="background-image: url({icon});">&nbsp;</div>
    <span class="global-button-text">Scan page</span>
</button>

<style>
    .global-button {
        border-style: none;
        background-color: #1f243c;
        font-size: 15px;
        color: #fff;
        width: 150px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 24px;
        line-height: 100%;
        font-weight: 700;
        padding-left: 10px;
        padding-right: 20px;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
    }
    .global-button-icon {
        width: 28px;
        height: 28px;
        background-size: 100%;
        border-radius: 100%;
        background-clip: content-box;
        background-repeat: no-repeat;
    }
</style>