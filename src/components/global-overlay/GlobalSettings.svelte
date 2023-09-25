<script lang="ts">
    export let active = false;
</script>

<button class:active={active} class="global-settings">
    <svg class="global-settings-icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.431 4h1.138c.16 0 .288.13.288.288 0 1.37 1.68 2.031 2.65 1.063a.294.294 0 0 1 .413-.002l.731.73c.114.115.112.3-.002.415-.968.968-.307 2.649 1.063 2.649.159 0 .288.129.288.288v1.138c0 .16-.13.288-.288.288-1.37 0-2.031 1.68-1.063 2.65.114.113.116.3.002.413l-.73.731a.294.294 0 0 1-.415-.002c-.968-.968-2.649-.307-2.649 1.063 0 .159-.129.288-.288.288H9.43a.288.288 0 0 1-.288-.288c0-1.37-1.68-2.031-2.65-1.063a.293.293 0 0 1-.413.002l-.731-.73a.294.294 0 0 1 .002-.415c.968-.968.307-2.649-1.063-2.649A.288.288 0 0 1 4 10.57V9.43c0-.16.13-.288.288-.288 1.37 0 2.031-1.68 1.063-2.65a.294.294 0 0 1-.002-.413l.73-.731a.294.294 0 0 1 .415.002c.968.968 2.649.307 2.649-1.063 0-.159.129-.288.288-.288ZM10 12.308a2.308 2.308 0 1 0 0-4.616 2.308 2.308 0 0 0 0 4.616Z" fill="#FFFFFF"></path>
    </svg>
</button>

<style>
    .global-settings {
        position: absolute;
        top: auto;
        left: 5px;
        opacity: 0;
        user-select: none;
        cursor: pointer;
        height: 20px;
        width: 20px;
        background-color: #1f243c;
        border: 0.5px solid rgba(0,0,0,.1);
        border-radius: 50%;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
        display: flex;
        justify-content: center;
        align-items: center;
        transition-property: opacity, left;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
    }
    .global-settings.active {
        opacity: 1;
        left: -32px;
    }
    .global-settings-icon {
        position: absolute;
    }
</style>