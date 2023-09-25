<script lang="ts">
    import Switch from "./Switch.svelte";

    export let text = "";

    let active = false;

</script>

<div class="switch-item">
    <label class="switch-item-label">
        <div class="switch-item-text">
            {text}
        </div>
        <input class="switch-item-checkbox" type="checkbox" bind:checked={active}>
        <Switch bind:active={active} />
    </label>
</div>

<style>
    .switch-item {
        user-select: none;
        position: relative;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        margin: 16px 0;
        color: #0e101a;
    }
    .switch-item-label {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .switch-item-text {
        width: 200px;
    }
    .switch-item-checkbox {
        display: none;
    }
</style>