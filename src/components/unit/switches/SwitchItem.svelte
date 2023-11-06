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
        display: grid;
        grid-template-columns: auto 48px;
        grid-column-gap: 36px;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .switch-item-checkbox {
        display: none;
    }
</style>