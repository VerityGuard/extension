<script lang="ts">
    export let active = false;
</script>

<div class:active={active} class="switch" role="button">
    <div class="switch-text">{active? 'ON': 'OFF'}</div>
    <div class="switch-slider"></div>
</div>

<style>
    .switch {
        user-select: none;
        cursor: pointer;
        transition: background-color .3s;
        border-radius: 10px;
        display: flex;
        flex-direction: row-reverse;
        vertical-align: baseline;
        margin-top: 2px;
        position: absolute;
        right: 0;
        width: 48px;
        height: 20px;
    }
    .switch.active {
        flex-direction: row;
        background: #11a683;
    }
    .switch.active:hover {
        background: #15c39a;
    }
    .switch {
        background: #6d758d;
    }
    .switch:hover {
        background: #9fa6bf;
    }
    .switch-text {
        width: 24px;
        height: 100%;
        margin: 0 5px;
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: .4px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .switch-slider {
        left: 2px;
        top: 2px;
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: #fff;
        display: inline-block;
        transition: left .2s, background-color .2s;
    }
    .switch.active .switch-slider {
        left: 30px;
    }
</style>