<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../../../storage";
    import Options from "./Options.svelte";

    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<div class="box-overlay">
    <Options {count} />
</div>
<slot />

<style>
    .box-overlay {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif;
        position: fixed;
        z-index: 2147483647;
        width: 300px;
        bottom: 16px;
        right: 16px;
        color: black;
        font-size: 14px;
        background-color: white;
        border: 1px solid black;
        padding: 16px;
    }
</style>