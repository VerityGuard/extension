<script lang="ts">
    import Select from "./Select.svelte";
    export let text = "";
</script>

<div class="select-item">
    <div class="select-item-text">{text}</div>
    <Select />
</div>

<style>
    .select-item {
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
        display: flex;
        justify-content: space-between;
    }
</style>